# Get name
$name = whoami
$name_arr = $name.Split("\")
$name_part = $name_arr[1]
#Parameters
$SourceFolder = "C:\Users\${name_part}\[name]\[of]\[your]\[folder]"
$Output = $SourceFolder + "\concatlated.csv"

# Get a list of the CSV files in a directory
$CSVFiles = Get-ChildItem -Path $SourceFolder  -Filter "*.csv" 

# Loop over each CSV file
ForEach ($CSVFile in $CSVFiles) {
   Import-Csv $CSVFile.FullName | Export-Csv -Path $Output -Append -NoTypeInformation -Encoding UTF8
}

