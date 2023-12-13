import mne
from mne_connectivity import spectral_connectivity_epochs, find_ch_connectivity

def calculate_coherence(file_path, sfreq):
    # Load the .edf file
    raw = mne.io.read_raw_edf(file_path, preload=True)

    # Calculate coherence using spectral_connectivity
    epochs = mne.make_fixed_length_epochs(raw, duration=1)  # Create epochs (adjust duration as needed)
    
    # Define pairs of channels for computing coherence
    pairs = mne.connectivity.find_ch_connectivity(epochs.info, ch_type='eeg')[0]

    # Compute coherence
    fmin, fmax = 1, 40  # Frequency range of interest (adjust as needed)
    con, freqs, times, n_epochs, n_tapers = spectral_connectivity_epochs(
        epochs, method='pli', mode='multitaper', indices=pairs,
        sfreq=sfreq, fmin=fmin, fmax=fmax, faverage=True)
    
    return con, freqs, times

# Example usage
file_path = 'path/to/your/file.edf'
sfreq = 256  # Replace with the sampling frequency of your data

coherence_values, frequencies, timepoints = calculate_coherence(file_path, sfreq)
print("Coherence values:", coherence_values)
