$ErrorActionPreference = 'Stop'

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Content
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

$backendRoot = 'C:\Users\baoba\develop\Web\website_back_end'

$controllerPath = Join-Path $backendRoot 'src\main\java\com\lanf\content\controller\ContentTutorialUploadController.java'
$controllerContent = [System.IO.File]::ReadAllText($controllerPath)
$controllerContent = $controllerContent.Replace(
  '@Value("${content.tutorial.markdown.upload-dir:/root/workspace/ai/website/portal_website/uploads/tutorial-markdown}")',
  '@Value("${content.tutorial.markdown.upload-dir:${CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR:./uploads/tutorial-markdown}}")'
)
Write-Utf8NoBom -Path $controllerPath -Content $controllerContent

$servicePath = Join-Path $backendRoot 'src\main\java\com\lanf\content\service\impl\ContentDataServiceImpl.java'
$serviceContent = [System.IO.File]::ReadAllText($servicePath)
$serviceContent = $serviceContent.Replace(
  '@Value("${content.tutorial.markdown.upload-dir:/root/workspace/ai/website/portal_website/uploads/tutorial-markdown}")',
  '@Value("${content.tutorial.markdown.upload-dir:${CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR:./uploads/tutorial-markdown}}")'
)
Write-Utf8NoBom -Path $servicePath -Content $serviceContent

$propertiesPath = Join-Path $backendRoot 'src\main\resources\application-dev.properties'
$propertiesContent = [System.IO.File]::ReadAllText($propertiesPath)
if ($propertiesContent -notmatch 'content\.tutorial\.markdown\.upload-dir=') {
  $propertiesContent += "`r`ncontent.tutorial.markdown.upload-dir=`${CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR:./uploads/tutorial-markdown}`r`n"
  Write-Utf8NoBom -Path $propertiesPath -Content $propertiesContent
}
