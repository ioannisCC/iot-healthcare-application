import mne
import numpy as np
import matplotlib.pyplot as plt

# Load EEG data from .edf file
raw = mne.io.read_raw_edf('OneDrive/Desktop/ioannis/university/erasmus-2023-2024/university/internet-of-things-iot/project/test/S001R11.edf', preload=True)

# Apply filtering to the raw data
raw.filter(1, 40)  # Example: filtering data between 1 Hz and 40 Hz

# Extract data as numpy array
eeg_data = raw.get_data()

# Function for feature extraction
def extract_features(data):
    # Calculate statistical features (mean, variance, median) for each channel
    mean_per_channel = np.mean(data, axis=1)
    variance_per_channel = np.var(data, axis=1)
    median_per_channel = np.median(data, axis=1)

    # Combine all features into a single feature vector per sample
    features = np.concatenate((mean_per_channel, variance_per_channel, median_per_channel), axis=0)
    return features

# Extract features from EEG data
X = extract_features(eeg_data)

print("Extracted Features (first sample):")
print(X)  # Display extracted features for the first sample
