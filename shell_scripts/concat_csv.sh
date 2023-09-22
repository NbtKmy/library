#!/bin/bash

#Parameters
$SourceFolder = "C:\Users\nkamiy\desktop\csv"
$Output = "C:\Users\nkamiy\desktop\csv\concatlated.csv"

# Get a list of the CSV files in a directory
$CSVFiles = Get-ChildItem -Path $SourceFolder  -Filter "*.csv" 

# Loop over each CSV file
ForEach ($CSVFile in $CSVFiles) {
   Import-Csv $CSVFile.FullName -Encoding utf8NoBOM | Export-Csv -Path $Output -Append -NoTypeInformation
}

