from glob import glob
import os
import mne
import numpy as np
import pandas
import matplotlib.pyplot as plt
from scipy import stats
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GroupKFold, GridSearchCV

glob('dataverse_files/*.edf')

all_file_path = glob('dataverse_files/*.edf')

healthy_file_path = [i for i in all_file_path if 'h' in i.split('/')[1]] # if h is detected then it means it is a healthy file
patient_file_path = [i for i in all_file_path if 's' in i.split('/')[1]] # if s is detected then it means it is a schizophrenic file

def read_data(file_path):
    data = mne.io.read_raw_edf(file_path, preload=True) # read the data
    data.set_eeg_reference() # average of all channels
    data.filter(l_freq=0.5, h_freq=45) # filter to keep only the data l_freq < freq < h_freq (this steps generates continuous data)
    epochs = mne.make_fixed_length_epochs(data, duration=5, overlap=1) # split data into segments
    array = epochs.get_data() # data into a numpy array
    return array

sample_data = read_data(healthy_file_path[1])

control_epochs_array = [read_data(i) for i in healthy_file_path] # healthy 
patient_epochs_array = [read_data(i) for i in patient_file_path] # schizophrenic

# label the data 0 -> healthy, 1 -> shizophrenia
control_epochs_labels = [len(i)*[0] for i in control_epochs_array] 
patient_epochs_labels = [len(i)*[1] for i in patient_epochs_array]

data_list = control_epochs_array + patient_epochs_array # concatenate all data in one list
label_list = control_epochs_labels + patient_epochs_labels

group_list = [[i]*len(j) for i,j in enumerate(data_list)]

data_array = np.vstack(data_list)
label_array = np.hstack(label_list)
group_array = np.hstack(group_list)

#print(data_array.shape, label_array.shape, group_array.shape)
# each one of the printed values in parenthesis represent a dimension (an axis x, y, z)

# feature extraction
# np.mean(data_array, axis=-1).shape
# will extract the last value of the tuple (7201, 19)

def mean(data):
    return np.mean(data,axis=-1)
    
def std(data):
    return np.std(data,axis=-1)

def ptp(data):
    return np.ptp(data,axis=-1)

def var(data):
        return np.var(data,axis=-1)

def minim(data):
      return np.min(data,axis=-1)


def maxim(data):
      return np.max(data,axis=-1)

def argminim(data):
      return np.argmin(data,axis=-1)


def argmaxim(data):
      return np.argmax(data,axis=-1)

def mean_square(data):
      return np.mean(data**2,axis=-1)

def rms(data): #root mean square
      return  np.sqrt(np.mean(data**2,axis=-1))  

def abs_diffs_signal(data):
    return np.sum(np.abs(np.diff(data,axis=-1)),axis=-1)


def skewness(data):
    return stats.skew(data,axis=-1)

def kurtosis(data):
    return stats.kurtosis(data,axis=-1)

def concatenate_features(data):
    return np.concatenate((mean(data),std(data),ptp(data),var(data),minim(data),maxim(data),argminim(data),argmaxim(data),
                          mean_square(data),rms(data),abs_diffs_signal(data),
                          skewness(data),kurtosis(data)),axis=-1)


features = []
for d in data_array:
    features.append(concatenate_features(d))

features_array = np.array(features)
features_array.shape

clf = LogisticRegression()
gkf = GroupKFold(5)
pipe = Pipeline([('scaler',StandardScaler()),('clf',clf)])
param_grid = {'clf__C':[0.1,0.5,0.7,1,3,5,7]}
gscv = GridSearchCV(pipe, param_grid, cv=gkf, n_jobs=12)
gscv.fit(features_array, label_array, groups=group_array)

gscv.best_score_