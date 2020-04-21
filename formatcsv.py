import csv

with open("citylight.csv", 'rt') as input, open('citylightdb.csv', 'wt') as output:
    reader = csv.reader(input, delimiter = ',')
    writer = csv.writer(output, delimiter = ',')

    all = []
    for i, row in enumerate(reader):
        all.append([i+1] + row)
    writer.writerows(all)