from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route


@app.route("/members")
def members():
    probabilityOfSchizophrenia = predict()
    print(type(probabilityOfSchizophrenia))
    return probabilityOfSchizophrenia


def predict():
    import mne
    import numpy as np
    import matplotlib.pyplot as plt
    from joblib import load
    import sys
    from scipy import stats

    saved_model_path = '../model.joblib'

    # load the trained model
    trained_model = load(saved_model_path)

    new_file_path = '../s14.edf'

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
    new_data = read_new_data(new_file_path)

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

    return probability_scores_str


if __name__ == "__main__":
    app.run(host='192.168.56.1', port=3000, debug=True)
