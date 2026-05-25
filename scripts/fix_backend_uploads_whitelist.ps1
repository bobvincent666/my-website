$path = "C:\Users\baoba\develop\Web\website_back_end\src\main\java\com\lanf\system\filter\TokenAuthenticationFilter.java"
$content = Get-Content -Path $path -Raw
$old = @'
        if ("/admin/system/index/login".equals(request.getRequestURI())
                || request.getRequestURI().startsWith("/api/content/")
                || request.getRequestURI().startsWith("/api/app-auth/")
                || request.getRequestURI().startsWith("/api/app-credits/")
                || request.getRequestURI().startsWith("/api/app-feedback/")
                || request.getRequestURI().startsWith("/api/gpt-image-canvas/config/")) {
'@
$new = @'
        if ("/admin/system/index/login".equals(request.getRequestURI())
                || request.getRequestURI().startsWith("/api/content/")
                || request.getRequestURI().startsWith("/api/app-auth/")
                || request.getRequestURI().startsWith("/api/app-credits/")
                || request.getRequestURI().startsWith("/api/app-feedback/")
                || request.getRequestURI().startsWith("/api/gpt-image-canvas/config/")
                || request.getRequestURI().startsWith("/api/gpt-image-canvas/prompts/")
                || request.getRequestURI().startsWith("/uploads/")) {
'@
if (-not $content.Contains($old)) {
    throw "Expected whitelist block not found in TokenAuthenticationFilter.java"
}
$content = $content.Replace($old, $new)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
