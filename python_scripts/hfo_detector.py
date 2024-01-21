import mne
import numpy as np
from scipy.signal import butter, filtfilt, hilbert

# Butterworth bandpass filter
# pass signals within a specific frequency range and exclude frequencies outside that range
def butter_bandpass(lowcut, highcut, fs, order=5):
    nyquist = 0.5 * fs
    low = 0.7 #lowcut / nyquist
    high = 0.9 #highcut / nyquist
    b, a = butter(order, [low, high], btype='band')
    return b, a

def detect_hfo(signal, fs):
    # filter data
    b, a = butter_bandpass(80, 500, fs)
    filtered = filtfilt(b, a, signal)
    
    # Hilbert Transform to get the amplitude envelope
    analytic_signal = hilbert(filtered)
    amplitude_envelope = np.abs(analytic_signal)
    
    # thresholding for event detection
    threshold = 3 * np.median(amplitude_envelope)
    hfo_events = []
    hfo_count = 0
    oscillation_count = 0
    min_oscillation_count = 4  # minimum required oscillations for HFO
    
    for i, amp in enumerate(amplitude_envelope):
        if amp > threshold:
            oscillation_count += 1
        else:
            if oscillation_count >= min_oscillation_count:
                hfo_events.append(i - oscillation_count)
                hfo_count += 1
            oscillation_count = 0
    
    return hfo_events, hfo_count

data_path = 'S001R01.edf'
raw = mne.io.read_raw_edf(data_path, preload=True)
data = raw.get_data()

fs = int(raw.info['sfreq']) # sampling rate

'''
channel_index = 0
eeg_data = data[channel_index]
hfo_indices, hfo_count = detect_hfo(eeg_data, fs)
print(f"Detected HFO indices in channel: {hfo_indices}")
print(f"Total HFO count in channel: {hfo_count}")
'''

# iterate through each channel for HFO detection
for i in range(data.shape[0]):
    eeg_data = data[i]  # EEG data from the current channel
    # call the HFO detection function with your data
    hfo_indices, hfo_count = detect_hfo(eeg_data, fs)
    print(f"Detected HFO indices in channel {i + 1}: {hfo_indices}")
    print(f"Total HFO count in channel {i + 1}: {hfo_count}")
