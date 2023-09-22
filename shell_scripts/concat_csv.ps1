#Parameters
$SourceFolder = "C:\Users\nkamiy\Desktop\csv"
$Output = "C:\Users\nkamiy\Desktop\csv\concatlated.csv"

# Get a list of the CSV files in a directory
$CSVFiles = Get-ChildItem -Path $SourceFolder  -Filter "*.csv" 

# Loop over each CSV file
ForEach ($CSVFile in $CSVFiles) {
   Import-Csv $CSVFile.FullName | Export-Csv -Path $Output -Append -NoTypeInformation -Encoding UTF8
}

