$passwords = @("postgres", "admin", "root", "password", "1234", "12345", "")
foreach ($p in $passwords) {
    $env:PGPASSWORD = $p
    # Run psql and discard output, we only care about exit code
    $output = & "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -w=false -c "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS_PASSWORD_IS:$p"
        exit 0
    }
}
Write-Host "ALL_FAILED"
