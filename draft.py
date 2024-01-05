import mne

file_path = 'eps01.edf'
raw = mne.io.read_raw_edf(file_path, preload=True)
data = raw.get_data()

# display channel information
print(raw.info)
# Print the shape of the data array
print("Data shape:", data.shape)

fs = raw.info['sfreq']


# Check number of channels and samples
num_channels = data.shape[0]
num_samples = data.shape[1]
print("Number of channels:", num_channels)
print("Number of samples per channel:", num_samples)
channel_index = 0  # Replace with the desired channel index
samples_from_channel = data[channel_index, :10]  # Print the first 10 samples
print(f"Samples from channel {channel_index + 1}:", samples_from_channel)
print(fs)

for i in range(len(data)):
    print(i)