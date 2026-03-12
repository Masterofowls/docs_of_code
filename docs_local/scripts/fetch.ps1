# Comprehensive Documentation Downloader (PowerShell 7 safe)
# Downloads topic pages from official documentation sources and stores local HTML copies.

param(
  [string]$BasePath = 'D:\docs_of_code\docs_local',
  [int]$DelaySeconds = 2,
  [switch]$IncludeAssets = $false,
  [switch]$CreateIndex = $true,
  [int]$MaxPagesPerSection = 200,
  [switch]$OpenIndex
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
$RequestHeaders = @{ 'User-Agent' = $UserAgent }

$documentationSources = @{
  'w3schools' = @{
    name = 'W3Schools'
    baseUrl = 'https://www.w3schools.com'
    sections = @{
      html = @{ url = 'https://www.w3schools.com/html/default.asp'; pattern = '/html/'; outputDir = 'html' }
      css = @{ url = 'https://www.w3schools.com/css/default.asp'; pattern = '/css/'; outputDir = 'css' }
      javascript = @{ url = 'https://www.w3schools.com/js/default.asp'; pattern = '/js/'; outputDir = 'javascript' }
      sql = @{ url = 'https://www.w3schools.com/sql/default.asp'; pattern = '/sql/'; outputDir = 'sql' }
      python = @{ url = 'https://www.w3schools.com/python/default.asp'; pattern = '/python/'; outputDir = 'python' }
      typescript = @{ url = 'https://www.w3schools.com/typescript/index.php'; pattern = '/typescript/'; outputDir = 'typescript' }
      react = @{ url = 'https://www.w3schools.com/react/default.asp'; pattern = '/react/'; outputDir = 'react' }
      vue = @{ url = 'https://www.w3schools.com/vue/index.php'; pattern = '/vue/'; outputDir = 'vue' }
      angular = @{ url = 'https://www.w3schools.com/angular/default.asp'; pattern = '/angular/'; outputDir = 'angular' }
      jquery = @{ url = 'https://www.w3schools.com/jquery/default.asp'; pattern = '/jquery/'; outputDir = 'jquery' }
      nodejs = @{ url = 'https://www.w3schools.com/nodejs/default.asp'; pattern = '/nodejs/'; outputDir = 'nodejs' }
      php = @{ url = 'https://www.w3schools.com/php/default.asp'; pattern = '/php/'; outputDir = 'php' }
      java = @{ url = 'https://www.w3schools.com/java/default.asp'; pattern = '/java/'; outputDir = 'java' }
      c = @{ url = 'https://www.w3schools.com/c/index.php'; pattern = '/c/'; outputDir = 'c' }
      cpp = @{ url = 'https://www.w3schools.com/cpp/default.asp'; pattern = '/cpp/'; outputDir = 'cpp' }
      csharp = @{ url = 'https://www.w3schools.com/cs/index.php'; pattern = '/cs/'; outputDir = 'csharp' }
      r = @{ url = 'https://www.w3schools.com/r/default.asp'; pattern = '/r/'; outputDir = 'r' }
      go = @{ url = 'https://www.w3schools.com/go/index.php'; pattern = '/go/'; outputDir = 'go' }
      rust = @{ url = 'https://www.w3schools.com/rust/index.php'; pattern = '/rust/'; outputDir = 'rust' }
      kotlin = @{ url = 'https://www.w3schools.com/kotlin/index.php'; pattern = '/kotlin/'; outputDir = 'kotlin' }
      django = @{ url = 'https://www.w3schools.com/django/index.php'; pattern = '/django/'; outputDir = 'django_w3' }
      mysql = @{ url = 'https://www.w3schools.com/mysql/default.asp'; pattern = '/mysql/'; outputDir = 'mysql' }
      postgresql = @{ url = 'https://www.w3schools.com/postgresql/index.php'; pattern = '/postgresql/'; outputDir = 'postgresql_w3' }
      mongodb = @{ url = 'https://www.w3schools.com/mongodb/index.php'; pattern = '/mongodb/'; outputDir = 'mongodb' }
      git = @{ url = 'https://www.w3schools.com/git/default.asp'; pattern = '/git/'; outputDir = 'git' }
      bash = @{ url = 'https://www.w3schools.com/bash/index.php'; pattern = '/bash/'; outputDir = 'bash_w3' }
      bootstrap = @{ url = 'https://www.w3schools.com/bootstrap/bootstrap_ver.asp'; pattern = '/bootstrap/'; outputDir = 'bootstrap' }
      w3css = @{ url = 'https://www.w3schools.com/w3css/default.asp'; pattern = '/w3css/'; outputDir = 'w3css' }
      sass = @{ url = 'https://www.w3schools.com/sass/default.php'; pattern = '/sass/'; outputDir = 'sass' }
      xml = @{ url = 'https://www.w3schools.com/xml/default.asp'; pattern = '/xml/'; outputDir = 'xml' }
      json = @{ url = 'https://www.w3schools.com/js/js_json_intro.asp'; pattern = '/json/'; outputDir = 'json' }
    }
  }
  'python-docs' = @{
    name = 'Python Official'
    baseUrl = 'https://docs.python.org'
    sections = @{
      'python-official' = @{ url = 'https://docs.python.org/3/'; pattern = '/3/'; outputDir = 'python_official' }
    }
  }
  'django-docs' = @{
    name = 'Django'
    baseUrl = 'https://docs.djangoproject.com'
    sections = @{
      django = @{ url = 'https://docs.djangoproject.com/en/stable/'; pattern = '/en/stable/'; outputDir = 'django' }
    }
  }
  'numpy-docs' = @{
    name = 'NumPy'
    baseUrl = 'https://numpy.org'
    sections = @{
      numpy = @{ url = 'https://numpy.org/doc/stable/'; pattern = '/doc/'; outputDir = 'numpy' }
    }
  }
  'pandas-docs' = @{
    name = 'Pandas'
    baseUrl = 'https://pandas.pydata.org'
    sections = @{
      pandas = @{ url = 'https://pandas.pydata.org/docs/'; pattern = '/docs/'; outputDir = 'pandas' }
    }
  }
  'postgresql-docs' = @{
    name = 'PostgreSQL'
    baseUrl = 'https://www.postgresql.org'
    sections = @{
      postgresql = @{ url = 'https://www.postgresql.org/docs/current/'; pattern = '/docs/current/'; outputDir = 'postgresql' }
    }
  }
  'bash-docs' = @{
    name = 'Bash'
    baseUrl = 'https://www.gnu.org'
    sections = @{
      bash = @{ url = 'https://www.gnu.org/software/bash/manual/'; pattern = '/software/bash/manual/'; outputDir = 'bash' }
    }
  }
  'nodejs-docs' = @{
    name = 'Node.js Official'
    baseUrl = 'https://nodejs.org'
    sections = @{
      'nodejs-official' = @{ url = 'https://nodejs.org/docs/latest/api/'; pattern = '/docs/'; outputDir = 'nodejs_official' }
    }
  }
  'git-docs' = @{
    name = 'Git Official'
    baseUrl = 'https://git-scm.com'
    sections = @{
      'git-official' = @{ url = 'https://git-scm.com/doc'; pattern = '/doc'; outputDir = 'git_official' }
    }
  }
}

function Ensure-Directory {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function New-DownloaderWebClient {
  $client = [System.Net.WebClient]::new()
  $client.Headers['User-Agent'] = $UserAgent
  return $client
}

function Resolve-AbsoluteUrl {
  param(
    [Parameter(Mandatory = $true)][string]$BaseUrl,
    [Parameter(Mandatory = $true)][string]$Href
  )

  if ([string]::IsNullOrWhiteSpace($Href)) {
    return $null
  }

  $trimmed = $Href.Trim()
  if ($trimmed.StartsWith('#') -or $trimmed.StartsWith('javascript:', 'InvariantCultureIgnoreCase') -or $trimmed.StartsWith('mailto:', 'InvariantCultureIgnoreCase')) {
    return $null
  }

  try {
    return [Uri]::new([Uri]$BaseUrl, $trimmed).AbsoluteUri
  } catch {
    return $null
  }
}

function Get-AllHrefValues {
  param([Parameter(Mandatory = $true)][string]$Html)

  $regex = [regex]::new('<a\b[^>]*?\bhref\s*=\s*["''](?<url>[^"'']+)["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $matches = $regex.Matches($Html)
  $values = @()

  foreach ($m in $matches) {
    $values += $m.Groups['url'].Value
  }

  return $values
}

function Get-AssetReferences {
  param([Parameter(Mandatory = $true)][string]$Html)

  $refs = @()

  $linkRegex = [regex]::new('<link\b[^>]*?\bhref\s*=\s*["''](?<url>[^"'']+)["''][^>]*?>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  foreach ($m in $linkRegex.Matches($Html)) {
    $tag = $m.Value
    if ($tag -match 'rel\s*=\s*["'']stylesheet["'']' -or $m.Groups['url'].Value -match '\.css(\?|$)') {
      $refs += [pscustomobject]@{ type = 'css'; original = $m.Groups['url'].Value }
    }
  }

  $imgRegex = [regex]::new('<img\b[^>]*?\bsrc\s*=\s*["''](?<url>[^"'']+)["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  foreach ($m in $imgRegex.Matches($Html)) {
    $refs += [pscustomobject]@{ type = 'images'; original = $m.Groups['url'].Value }
  }

  $scriptRegex = [regex]::new('<script\b[^>]*?\bsrc\s*=\s*["''](?<url>[^"'']+)["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  foreach ($m in $scriptRegex.Matches($Html)) {
    $refs += [pscustomobject]@{ type = 'js'; original = $m.Groups['url'].Value }
  }

  return $refs
}

function Get-SafeFileNameFromUrl {
  param([Parameter(Mandatory = $true)][string]$Url)

  $uri = [Uri]$Url
  $path = $uri.AbsolutePath

  if ([string]::IsNullOrWhiteSpace($path) -or $path -eq '/') {
    return 'index'
  }

  $safe = ($path.TrimStart('/') -replace '/', '_')
  $safe = $safe -replace '[^a-zA-Z0-9._-]', '_'

  $safe = $safe -replace '\.(html|htm|asp|php)$', ''
  if ([string]::IsNullOrWhiteSpace($safe)) {
    $safe = 'index'
  }

  return $safe
}

function Get-FirstRegexValue {
  param(
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$Pattern
  )

  $m = [regex]::Match($Text, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if ($m.Success) {
    return $m.Groups[1].Value
  }

  return ''
}

function Convert-HtmlFragmentToText {
  param([string]$Html)

  if ([string]::IsNullOrWhiteSpace($Html)) {
    return ''
  }

  $content = $Html
  $content = [regex]::Replace($content, '<script\b[^>]*>.*?</script>', ' ', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $content = [regex]::Replace($content, '<style\b[^>]*>.*?</style>', ' ', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $content = [regex]::Replace($content, '<noscript\b[^>]*>.*?</noscript>', ' ', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $content = [regex]::Replace($content, '<(br|/p|/li|/h[1-6])\b[^>]*>', "`n", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $content = [regex]::Replace($content, '<[^>]+>', ' ')
  $content = [System.Net.WebUtility]::HtmlDecode($content)
  $content = $content -replace "\r", ''
  $content = $content -replace "[\t ]+", ' '
  $content = $content -replace "\n{3,}", "`n`n"
  $content = $content.Trim()

  return $content
}

function Save-DocumentationContent {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$OutputDir
  )

  try {
    Write-Host "Downloading: $Url" -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri $Url -Headers $RequestHeaders -TimeoutSec 60
    $htmlContent = [string]$response.Content

    if ([string]::IsNullOrWhiteSpace($htmlContent)) {
      Write-Warning "No content returned for $Url"
      return $false
    }

    $titleHtml = Get-FirstRegexValue -Text $htmlContent -Pattern '<title\b[^>]*>(.*?)</title>'
    $title = Convert-HtmlFragmentToText -Html $titleHtml
    if ([string]::IsNullOrWhiteSpace($title)) {
      $title = $Url
    }

    $h1Raw = Get-FirstRegexValue -Text $htmlContent -Pattern '<h1\b[^>]*>(.*?)</h1>'
    $h1 = Convert-HtmlFragmentToText -Html $h1Raw

    $headingRegex = [regex]::new('<h[1-3]\b[^>]*>(.*?)</h[1-3]>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $headings = @()
    foreach ($m in $headingRegex.Matches($htmlContent)) {
      $value = Convert-HtmlFragmentToText -Html $m.Groups[1].Value
      if (-not [string]::IsNullOrWhiteSpace($value)) {
        $headings += $value
      }
    }
    $headings = @($headings | Select-Object -Unique)

    $mainHtml = Get-FirstRegexValue -Text $htmlContent -Pattern '<main\b[^>]*>(.*?)</main>'
    if ([string]::IsNullOrWhiteSpace($mainHtml)) {
      $mainHtml = Get-FirstRegexValue -Text $htmlContent -Pattern '<article\b[^>]*>(.*?)</article>'
    }
    if ([string]::IsNullOrWhiteSpace($mainHtml)) {
      $mainHtml = Get-FirstRegexValue -Text $htmlContent -Pattern '<body\b[^>]*>(.*?)</body>'
    }
    if ([string]::IsNullOrWhiteSpace($mainHtml)) {
      $mainHtml = $htmlContent
    }

    $text = Convert-HtmlFragmentToText -Html $mainHtml
    if ([string]::IsNullOrWhiteSpace($text)) {
      Write-Warning "No extractable text content for $Url"
      return $false
    }

    $stem = Get-SafeFileNameFromUrl -Url $Url
    $jsonPath = Join-Path $OutputDir "$stem.json"
    $mdPath = Join-Path $OutputDir "$stem.md"

    $textLines = @($text -split "`n")
    $summary = ($textLines[0..([Math]::Min(2, ($textLines.Count - 1)))]) -join ' '
    $item = [ordered]@{
      url = $Url
      title = $title
      h1 = $h1
      summary = $summary
      headings = $headings
      content = $text
      fetchedAt = (Get-Date).ToString('o')
    }

    $item | ConvertTo-Json -Depth 6 | Out-File -FilePath $jsonPath -Encoding UTF8

    $md = @()
    $md += "# $title"
    $md += ''
    $md += "Source: $Url"
    $md += ''
    if (-not [string]::IsNullOrWhiteSpace($h1)) {
      $md += "## Page Heading"
      $md += $h1
      $md += ''
    }
    if ($headings.Count -gt 0) {
      $md += '## Sections'
      foreach ($heading in $headings) {
        $md += "- $heading"
      }
      $md += ''
    }
    $md += '## Content'
    $md += $text

    $md -join "`n" | Out-File -FilePath $mdPath -Encoding UTF8

    Write-Host "  Saved JSON: $jsonPath" -ForegroundColor Green
    Write-Host "  Saved MD:   $mdPath" -ForegroundColor Green
    return $true
  } catch {
    Write-Warning "Failed to download $Url : $($_.Exception.Message)"
    return $false
  }
}

function Get-PageLinks {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$BaseUrl,
    [Parameter(Mandatory = $true)][int]$MaxCount
  )

  try {
    Write-Host "Fetching links from: $Url" -ForegroundColor Cyan
    $response = Invoke-WebRequest -Uri $Url -Headers $RequestHeaders -TimeoutSec 45
    $content = [string]$response.Content

    if ([string]::IsNullOrWhiteSpace($content)) {
      return @($Url)
    }

    $rawHrefs = Get-AllHrefValues -Html $content
    $links = New-Object System.Collections.Generic.HashSet[string]

    foreach ($href in $rawHrefs) {
      $absolute = Resolve-AbsoluteUrl -BaseUrl $Url -Href $href
      if (-not $absolute) {
        continue
      }

      if ($absolute -notlike "*$Pattern*") {
        continue
      }

      if ($absolute -notlike "$BaseUrl*") {
        continue
      }

      [void]$links.Add($absolute)
      if ($links.Count -ge $MaxCount) {
        break
      }
    }

    if (-not $links.Contains($Url)) {
      [void]$links.Add($Url)
    }

    return @($links | Sort-Object)
  } catch {
    Write-Warning "Failed to get links from $Url : $($_.Exception.Message)"
    return @($Url)
  }
}

function Create-IndexFile {
  param(
    [Parameter(Mandatory = $true)][string]$IndexPath,
    [Parameter(Mandatory = $true)][hashtable]$DownloadedSections,
    [Parameter(Mandatory = $true)][hashtable]$Sources,
    [Parameter(Mandatory = $true)][string]$RootPath
  )

  $total = ($DownloadedSections.Values | Measure-Object -Sum).Sum

    $indexObj = [ordered]@{
      generatedAt = (Get-Date).ToString('o')
      rootPath = $RootPath
      totalSections = $DownloadedSections.Count
      totalDownloaded = $total
      sources = @()
    }

    $indexMd = @()
    $indexMd += '# Local Documentation Index'
    $indexMd += ''
    $indexMd += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    $indexMd += ''
    $indexMd += "Total sections: $($DownloadedSections.Count)"
    $indexMd += "Total downloaded pages: $total"
    $indexMd += ''

  foreach ($source in $Sources.GetEnumerator()) {
      $sourceEntry = [ordered]@{
        name = $source.Value.name
        sections = @()
      }

      $indexMd += "## $($source.Value.name)"
      $indexMd += ''

    foreach ($section in $source.Value.sections.GetEnumerator()) {
      $key = [string]$section.Key
      $dir = [string]$section.Value.outputDir
      $candidate = Join-Path $RootPath $dir
      $count = if ($DownloadedSections.ContainsKey($key)) { $DownloadedSections[$key] } else { 0 }

        $sourceEntry.sections += [ordered]@{
          name = $key
          outputDir = $dir
          downloaded = $count
        }

        $indexMd += "- ${key}: $count pages (dir: $dir)"

        if (Test-Path -LiteralPath $candidate) { }
    }

      $indexObj.sources += $sourceEntry
      $indexMd += ''
  }

    $indexJsonPath = [System.IO.Path]::ChangeExtension($IndexPath, '.json')
    $indexMdPath = [System.IO.Path]::ChangeExtension($IndexPath, '.md')

    $indexObj | ConvertTo-Json -Depth 8 | Out-File -FilePath $indexJsonPath -Encoding UTF8
    ($indexMd -join "`n") | Out-File -FilePath $indexMdPath -Encoding UTF8
    Write-Host "Created index files: $indexJsonPath and $indexMdPath" -ForegroundColor Green
}

Ensure-Directory -Path $BasePath

Write-Host 'Starting comprehensive documentation download...' -ForegroundColor Magenta
Write-Host "Target directory: $BasePath" -ForegroundColor Magenta

$downloadedSections = @{}
$totalSections = 0
$totalFiles = 0
foreach ($source in $documentationSources.GetEnumerator()) {
    $sourceName = [string]$source.Value.name
    $baseUrl = [string]$source.Value.baseUrl

    Write-Host "`n=== Processing $sourceName ===" -ForegroundColor Cyan

    foreach ($section in $source.Value.sections.GetEnumerator()) {
      $sectionName = [string]$section.Key
      $sectionInfo = $section.Value
      $sectionUrl = [string]$sectionInfo.url
      $sectionPattern = [string]$sectionInfo.pattern
      $sectionDir = Join-Path $BasePath ([string]$sectionInfo.outputDir)

      $totalSections += 1
      Ensure-Directory -Path $sectionDir

      Write-Host "Processing section: $sectionName" -ForegroundColor Yellow
      $links = @(Get-PageLinks -Url $sectionUrl -Pattern $sectionPattern -BaseUrl $baseUrl -MaxCount $MaxPagesPerSection)
      Write-Host "Found $($links.Count) pages to download" -ForegroundColor White

      $sectionDownloaded = 0
      foreach ($link in $links) {
        $ok = Save-DocumentationContent -Url $link -OutputDir $sectionDir
        if ($ok) {
          $sectionDownloaded += 1
          $totalFiles += 1
        }
        Start-Sleep -Seconds $DelaySeconds
      }

      $downloadedSections[$sectionName] = $sectionDownloaded
      Write-Host "Completed $sectionName - Downloaded $sectionDownloaded files" -ForegroundColor Green
    }
}

if ($CreateIndex) {
  $indexPath = Join-Path $BasePath 'index.md'
  Create-IndexFile -IndexPath $indexPath -DownloadedSections $downloadedSections -Sources $documentationSources -RootPath $BasePath
}

Write-Host "`n$('=' * 60)" -ForegroundColor Magenta
Write-Host 'DOWNLOAD COMPLETE' -ForegroundColor Green
Write-Host "Total sections processed: $totalSections" -ForegroundColor White
Write-Host "Total files downloaded: $totalFiles" -ForegroundColor White
Write-Host "Documentation saved to: $BasePath" -ForegroundColor White
Write-Host "Index files: $(Join-Path $BasePath 'index.md') and $(Join-Path $BasePath 'index.json')" -ForegroundColor Yellow
Write-Host "$('=' * 60)" -ForegroundColor Magenta

if ($OpenIndex) {
  $idx = Join-Path $BasePath 'index.md'
  if (Test-Path -LiteralPath $idx) {
    Start-Process $idx
  }
}
