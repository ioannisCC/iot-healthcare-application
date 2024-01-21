time_values = []
heart_rate_values = []

file_path = 'heart_rate/46343_heartrate.txt'

with open(file_path, 'r') as file:
    for line in file:
        data = line.strip().split(',')  # data comma-separated
        # time to float and strip the '-'
        time_values.append(float(data[0].lstrip('-')))
        heart_rate_values.append(int(data[1]))  # heart rate to int if needed

time_values.reverse()
heart_rate_values.reverse()

scale_factor = 10000
scaled_time_values = [t / scale_factor for t in time_values]

print("time values:", scaled_time_values)
