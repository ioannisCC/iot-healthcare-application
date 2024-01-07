from datetime import datetime
import os
import glob
import shutil
from flask import Flask, request, send_file
from flask_cors import CORS
from firebase import download_patient_files

app = Flask(__name__)
CORS(app)


@app.route('/patient', methods=['POST'])
def handle_patient():
    data = request.json
    patient_name = data['patientName']
    print(f"Received patient name: {patient_name}")
    # Call the function to download files from Firebase Storage
    download_patient_files(patient_name)

    return patient_name

# Members API route


@app.route("/members")
def members():
    patient_name = request.args.get('patientName')
    probabilityOfSchizophrenia = predict(patient_name)
    print(type(probabilityOfSchizophrenia))
    return probabilityOfSchizophrenia


@app.route("/brainwavegraph")
def brainwaveGraph():
    brainwavegraphPNG = brainwaves()
    print(type(brainwavegraphPNG))
    return brainwavegraphPNG


@app.route("/schizophreniahistory")
def schizophreniaHistory():
    patient_name = request.args.get('patientName')
    from mongoDB import pullData
    from bson import json_util
    import json

    patient_documents = pullData(patient_name)

    # Convert the documents to a JSON serializable format
    patient_documents_json = json.loads(json_util.dumps(patient_documents))

    return json.dumps(patient_documents_json)


def predict(patient_name):
    import mne
    import numpy as np
    import matplotlib.pyplot as plt
    from joblib import load
    import sys
    from scipy import stats
    from mongoDB import pushData

    saved_model_path = '../model.joblib'

    # load the trained model
    trained_model = load(saved_model_path)

    # # Retrieve file name from POST data
    # data = request.json
    # file_name = data['fileName']
    # # Path to the folder where the EDF files are stored
    # edf_folder_path = '../'  # Update this path to the folder where your EDF files are stored
    # # Full path to the EDF file
    # new_file_path = os.path.join(edf_folder_path, file_name)

    # new_file_path = '../s14.edf'

    downloads_dir = './downloads'
    # # Find the .edf file in the downloads directory
    # edf_file_path = next(glob.iglob(
    #     os.path.join(downloads_dir, '*.edf')), None)

    edf_files = glob.glob(os.path.join(downloads_dir, '*.edf'))

    # Process each file to extract the date and compare
    latest_file = None
    latest_date = None
    for file in edf_files:
        # Extract date from file name
        date_str = os.path.basename(file).split('.')[0]
        file_date = datetime.strptime(date_str, '%d_%m_%Y')

        if latest_file is None or file_date > latest_date:
            latest_file = file
            latest_date = file_date

    print(f"The latest EDF file is: {latest_file}")

    # # Check if an EDF file was found
    # if edf_file_path is None:
    #     raise FileNotFoundError("No EDF file found in downloads directory.")

    # new_file_path = 'downloads/h05.edf'

    def read_new_data(file_path):
        data = mne.io.read_raw_edf(file_path, preload=True)  # read the data
        data.set_eeg_reference()  # average of all channels
        # filter to keep only the data l_freq < freq < h_freq (this steps generates continuous data)
        data.filter(l_freq=0.5, h_freq=45)
        epochs = mne.make_fixed_length_epochs(
            data, duration=5, overlap=1)  # split data into segments
        array = epochs.get_data()  # data into a numpy array
        return array

    # read the new .edf file
    new_data = read_new_data(latest_file)

    def mean(data):
        return np.mean(data, axis=-1)

    def std(data):
        return np.std(data, axis=-1)

    def ptp(data):
        return np.ptp(data, axis=-1)

    def var(data):
        return np.var(data, axis=-1)

    def minim(data):
        return np.min(data, axis=-1)

    def maxim(data):
        return np.max(data, axis=-1)

    def argminim(data):
        return np.argmin(data, axis=-1)

    def argmaxim(data):
        return np.argmax(data, axis=-1)

    def mean_square(data):
        return np.mean(data**2, axis=-1)

    def rms(data):  # root mean square
        return np.sqrt(np.mean(data**2, axis=-1))

    def abs_diffs_signal(data):
        return np.sum(np.abs(np.diff(data, axis=-1)), axis=-1)

    def skewness(data):
        return stats.skew(data, axis=-1)

    def kurtosis(data):
        return stats.kurtosis(data, axis=-1)

    def concatenate_features(data):
        return np.concatenate((mean(data), std(data), ptp(data), var(data), minim(data), maxim(data), argminim(data), argmaxim(data),
                               mean_square(data), rms(
                                   data), abs_diffs_signal(data),
                               skewness(data), kurtosis(data)), axis=-1)

    # extract features from the new data
    new_features = []
    for d in new_data:
        new_features.append(concatenate_features(d))

    new_features_array = np.array(new_features)

    # make predictions using the loaded model
    predictions = trained_model.predict(new_features_array)
    probability_scores = trained_model.predict_proba(new_features_array)

    # interpret the predictions (0 for healthy, 1 for schizophrenia)
    if predictions[0] == 0:
        print("The patient is classified as healthy.")
    else:
        print("The patient is classified as having schizophrenia.")

    # optional: Print probability scores for each class
    print("Probability of being healthy:", probability_scores[0][0])
    print("Probability of having schizophrenia:", probability_scores[0][1])

    probability_scores_int = probability_scores[0][1] * 100

    probability_scores_int = round(probability_scores_int, 3)

    probability_scores_str = str(probability_scores_int)

    # After processing the file, delete it
    # os.remove(edf_file_path)
    # print(f"Deleted file: {edf_file_path}")

    for file in os.listdir(downloads_dir):
        file_path = os.path.join(downloads_dir, file)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                # Use shutil.rmtree to delete directories
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

    pushData(patient_name, probability_scores_str)

    return probability_scores_str


def brainwaves():
    import mne
    import numpy as np
    import matplotlib as plt
    from io import BytesIO

    downloads_dir = './downloads'
    # Find the .edf file in the downloads directory
    edf_file_path = next(glob.iglob(
        os.path.join(downloads_dir, '*.edf')), None)

    # Check if an EDF file was found
    if edf_file_path is None:
        raise FileNotFoundError("No EDF file found in downloads directory.")

    # load the EEG data
    raw = mne.io.read_raw_edf(edf_file_path, preload=True)

    raw.filter(1, 40)  # filtering data between 1 Hz and 40 Hz

    # Extract data as numpy array and compute PSD using Welch's method
    data = raw.get_data()
    sfreq = raw.info['sfreq']  # Sampling frequency
    psd, freqs = np.abs(np.fft.fft(
        data)) ** 2, np.fft.fftfreq(data.shape[1], 1 / sfreq)

    # Define frequency bands of interest (in Hz)
    delta_band = [0.5, 4]   # Delta band (0.5 - 4 Hz)
    theta_band = [4, 8]     # Theta band (4 - 8 Hz)
    alpha_band = [8, 13]    # Alpha band (8 - 13 Hz)
    beta_band = [13, 30]    # Beta band (13 - 30 Hz)
    gamma_band = [30, 100]   # Gamma band (30 - 40 Hz)

    # Calculate indices corresponding to the frequency bands
    freq_indices = np.where(
        (freqs >= delta_band[0]) & (freqs <= delta_band[1]))[0]
    delta_power = np.sum(psd[:, freq_indices])

    freq_indices = np.where(
        (freqs >= theta_band[0]) & (freqs <= theta_band[1]))[0]
    theta_power = np.sum(psd[:, freq_indices])

    freq_indices = np.where(
        (freqs >= alpha_band[0]) & (freqs <= alpha_band[1]))[0]
    alpha_power = np.sum(psd[:, freq_indices])

    freq_indices = np.where(
        (freqs >= beta_band[0]) & (freqs <= beta_band[1]))[0]
    beta_power = np.sum(psd[:, freq_indices])

    freq_indices = np.where(
        (freqs >= gamma_band[0]) & (freqs <= gamma_band[1]))[0]
    gamma_power = np.sum(psd[:, freq_indices])

    # Print the extracted power within each frequency band
    print(f"Delta power: {delta_power}")
    print(f"Theta power: {theta_power}")
    print(f"Alpha power: {alpha_power}")
    print(f"Beta power: {beta_power}")
    print(f"Gamma power: {gamma_power}")

    # Find the band with the maximum power
    bands_power = {
        "Delta": delta_power,
        "Theta": theta_power,
        "Alpha": alpha_power,
        "Beta": beta_power,
        "Gamma": gamma_power
    }

    # Determine the band with the highest power
    dominant_band = max(bands_power, key=bands_power.get)
    print("")
    print(f"The signal predominantly belongs to the {dominant_band} band.")

    import matplotlib.pyplot as plt

    # Plot the EEG data
    plt.figure(figsize=(10, 6))
    plt.plot(raw.times, data.T)  # Plotting the EEG signals
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.title('EEG Signals')
    plt.legend(raw.ch_names)  # Add legend for channel names if available

    image_stream = BytesIO()
    plt.savefig(image_stream, format='png')
    image_stream.seek(0)

    # After processing the file, delete it
    os.remove(edf_file_path)
    print(f"Deleted file: {edf_file_path}")

    return send_file(image_stream, mimetype='image/png')


if __name__ == "__main__":
    app.run(host='192.168.56.1', port=3000, debug=True)
