import mne
from scipy import signal
import numpy as np

def calculate_spectral_entropy(file_path):
    # Load the .edf file
    raw = mne.io.read_raw_edf(file_path, preload=True)

    all_channels = raw.info['ch_names']

    # Apply filtering if needed
    raw.filter(1, 40)  # Example: filtering data between 1 Hz and 40 Hz

    # Get the data and sampling frequency
    data = raw.get_data()
    sfreq = raw.info['sfreq']  # Sampling frequency
    spectral_entropy_per_channel = {}
    
    for channel_name in all_channels:
        # Apply spectral analysis (e.g., using Welch's method)
        f, Pxx = signal.welch(data[raw.ch_names.index(channel_name)], sfreq, nperseg=256)

        # Normalize the power spectral density
        norm_Pxx = Pxx / np.sum(Pxx)

        # Calculate spectral entropy
        spectral_entropy = -np.sum(norm_Pxx * np.log2(norm_Pxx))

        spectral_entropy_per_channel[channel_name] = spectral_entropy

    return spectral_entropy_per_channel

# Example usage
file_path = 'OneDrive/Desktop/ioannis/university/erasmus-2023-2024/university/internet-of-things-iot/project/test/S001R11.edf'
channel_name = 'Cz'  # Replace with your channel of interest

result = calculate_spectral_entropy(file_path)
print("Spectral Entropy:", result)


#nothing here