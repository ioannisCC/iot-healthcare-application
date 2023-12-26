# moving

'''
import matplotlib.pyplot as plt

file_path = 'heart_rate/46343_heartrate.txt'
timestamps = []
heart_rates = []

with open(file_path, 'r') as file:
    for line in file:
        data = line.strip().split(',')
        timestamps.append(float(data[0]))
        heart_rates.append(float(data[1]))

plt.figure(figsize=(10, 6))
plt.plot(timestamps, heart_rates, marker='o', linestyle='-')
plt.title('Heart Rate over Time')
plt.xlabel('Time (seconds since PSG start)')
plt.ylabel('Heart Rate (bpm)')
plt.grid(True)
plt.show()
'''

# real-time
import matplotlib.pyplot as plt
import pandas as pd
import time

# Read the data from the text file
file_path = 'heart_rate/46343_heartrate.txt'  # Replace with your file path
data = pd.read_csv(file_path, header=None, names=['Time', 'HeartRate'])

# Initialize plot
plt.figure(figsize=(8, 4))
plt.xlabel('Time (seconds)')
plt.ylabel('Heart Rate (bpm)')
plt.title('Real-time Heart Rate Monitoring')
plt.grid(True)

# Variables for data update
x_vals = []
y_vals = []

# Function to update the plot continuously
def update_plot():
    start_time = time.time()
    while True:
        current_time = time.time() - start_time
        new_data = data[data['Time'] <= current_time][-100:]  # Show last 100 data points
        
        # Update data
        x_vals = new_data['Time']
        y_vals = new_data['HeartRate']
        
        # Update the plot
        plt.clf()
        plt.xlabel('Time (seconds)')
        plt.ylabel('Heart Rate (bpm)')
        plt.title('Real-time Heart Rate Monitoring')
        plt.grid(True)
        plt.plot(x_vals, y_vals, marker='o', linestyle='-')
        plt.xlim(max(0, current_time - 10), current_time)  # Show last 10 seconds
        
        plt.pause(0.1)  # Adjust the pause duration for refresh rate

# Call the function to update the plot
update_plot()



