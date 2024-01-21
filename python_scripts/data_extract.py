import mne
import numpy as np
import matplotlib as plt
import matplotlib.pyplot as plt

# EDF (European Data Format) is a simple and flexible format for exchange and storage of multichannel biological and physical signals
# they contain raw electrical measuremnets captured from electrodes placed on a person's sclap.
# they represent voltage fluctuations over time corresponding to neural activity in the brain.

# load the EEG data
raw = mne.io.read_raw_edf('S001R01.edf', preload=True)

# filter the data in the desired frequency range
raw.filter(1, 40)  # filtering data between 1 Hz and 40 Hz

# extract data as numpy array and compute PSD using Welch's method
data = raw.get_data()
sfreq = raw.info['sfreq']  # Sampling frequency
psd, freqs = np.abs(np.fft.fft(data)) ** 2, np.fft.fftfreq(data.shape[1], 1 / sfreq) # two arrays with psd and frequencies

# define frequency bands of interest (in Hz)
delta_band = [0.5, 4]   # delta band (0.5 - 4 Hz)
theta_band = [4, 8]     # theta band (4 - 8 Hz)
alpha_band = [8, 13]    # alpha band (8 - 13 Hz)
beta_band = [13, 30]    # beta band (13 - 30 Hz)
gamma_band = [30, 100]   # gamma band (30 - 40 Hz)

# calculate indices corresponding to the frequency bands
freq_indices = np.where((freqs >= delta_band[0]) & (freqs <= delta_band[1]))[0] # each part of the condition is a boolean array and are compared through logical AND
delta_power = np.sum(psd[:, freq_indices]) # total power within the band

freq_indices = np.where((freqs >= theta_band[0]) & (freqs <= theta_band[1]))[0]
theta_power = np.sum(psd[:, freq_indices])

freq_indices = np.where((freqs >= alpha_band[0]) & (freqs <= alpha_band[1]))[0]
alpha_power = np.sum(psd[:, freq_indices])

freq_indices = np.where((freqs >= beta_band[0]) & (freqs <= beta_band[1]))[0]
beta_power = np.sum(psd[:, freq_indices])

freq_indices = np.where((freqs >= gamma_band[0]) & (freqs <= gamma_band[1]))[0]
gamma_power = np.sum(psd[:, freq_indices])

# print the extracted power within each frequency band
print(f"Delta power: {delta_power}")
print(f"Theta power: {theta_power}")
print(f"Alpha power: {alpha_power}")
print(f"Beta power: {beta_power}")
print(f"Gamma power: {gamma_power}")

# frequnecy bands dictionary
bands_power = {
    "Delta": delta_power,
    "Theta": theta_power,
    "Alpha": alpha_power,
    "Beta": beta_power,
    "Gamma": gamma_power
}

# determine the band with the highest power
dominant_band = max(bands_power, key=bands_power.get)
print("")
print(f"The signal predominantly belongs to the {dominant_band} band.")

# plot the EEG data
plt.figure(figsize=(10, 6))
plt.plot(raw.times, data.T)  # plotting the EEG signals
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title('EEG Signals')
plt.legend(raw.ch_names)  # add legend for channel names if available
plt.show()
