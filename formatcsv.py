import csv

with open("citylight.csv", 'rb') as input, open('citylightdb.csv', 'wb') as output:
    reader = csv.reader(input, delimiter = ',')
    writer = csv.writer(output, delimiter = ',')

    all = []
    for i, row in enumerate(reader):
        all.append([i+1] + row)
    writer.writerows(all)