import csv

with open("citylight.csv", 'rb') as input, open('citylightdb.csv', 'wb') as output:
    reader = csv.reader(input, delimiter = ',')
    writer = csv.writer(output, delimiter = ',')

    all = []
    for k, row in enumerate(reader):
        all.append([k+1] + row)
    writer.writerows(all)