import mne
import numpy as np
import matplotlib.pyplot as plt
import sys
from mne.minimum_norm import (apply_inverse, apply_inverse_epochs,
                              read_inverse_operator)
from mne_connectivity import seed_target_indices, spectral_connectivity_epochs


sys.path.insert(0,'OneDrive/Desktop/ioannis/university/erasmus-2023-2024/university/internet-of-things-iot/project/test/S001R11.edf')

# Load EEG data from .edf file
raw = mne.io.read_raw_edf('OneDrive/Desktop/ioannis/university/erasmus-2023-2024/university/internet-of-things-iot/project/test/S001R11.edf', preload=True)

# Apply filtering to the raw data
raw.filter(1, 40)  # Example: filtering data between 1 Hz and 40 Hz

# Select a subset of channels (modify as needed)
# For coherence, it's crucial to select relevant brain regions or channels of interest
picks = ['Fp1', 'Fp2', 'F3', 'F4']  # Example: select frontal channels

# Calculate coherence between selected channels
coh, freqs, times, n_epochs, n_tapers = spectral_connectivity_epochs(
    raw, method='coh', indices=picks, sfreq=raw.info['sfreq'],
    fmin=1, fmax=40, faverage=True)



# Plot coherence values
plt.figure(figsize=(8, 4))
plt.imshow(coh[:, :, 0], aspect='auto', cmap='viridis', origin='lower')
plt.xlabel('Channels')
plt.ylabel('Channels')
plt.title('Coherence between selected channels')
plt.colorbar(label='Coherence')
plt.xticks(ticks=np.arange(len(picks)), labels=picks)
plt.yticks(ticks=np.arange(len(picks)), labels=picks)
plt.tight_layout()
plt.show()
