time_values = []
heart_rate_values = []

file_path = 'heart_rate/46343_heartrate.txt' 

with open(file_path, 'r') as file:
    for line in file:
        data = line.strip().split(',')  # data comma-separated
        time_values.append(float(data[0].lstrip('-')))  # time to float and strip the '-'
        heart_rate_values.append(int(data[1]))  # heart rate to int if needed

time_values.reverse()
heart_rate_values.reverse()
print("Heart rate values:", heart_rate_values)

