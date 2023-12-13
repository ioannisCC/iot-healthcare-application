import os
import matplotlib.pyplot as plt

directory_path = 'OneDrive/Desktop/ioannis/university/erasmus-2023-2024/university/internet-of-things-iot/project/test/pattern-analysis'

# Initialize lists to store extracted values from all files
all_values = []

# Loop through all files in the directory
for filename in os.listdir(directory_path):
    if filename.endswith('.dat'):
        file_path = os.path.join(directory_path, filename)
        
        # Open each file and read its contents
        with open(file_path, 'r') as file:
            data = file.read()
        
        # Split the data into a list of values (adjust if values are separated differently)
        values = data.split()  # Change this if values are separated by commas or other characters
        
        # Convert the values from strings to integers or floats, depending on the data
        numeric_values = [float(value) for value in values]  # Use int() if the data is integers
        
        # Store extracted values in the list
        all_values.append(numeric_values)

# Create a plot using Matplotlib
plt.figure(figsize=(8, 6))

for values in all_values:
    plt.plot(values)  # Plot each set of values

plt.xlabel('Time')
plt.ylabel('Pulse Data')
plt.title('Pulse Data Visualization')
plt.grid(True)
plt.legend(['File 1', 'File 2', 'File 3'])  # Add legends based on file names or indices
plt.show()
