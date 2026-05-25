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

$controllerContent = @'
package com.lanf.content.controller;

import com.lanf.common.result.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
public class ContentTutorialUploadController {

    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(
            Arrays.asList("md", "markdown"));

    @Value("${content.tutorial.markdown.upload-dir:${CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR:./uploads/tutorial-markdown}}")
    private String uploadDir;

    @PostMapping("/admin/content/tutorial/upload/markdown")
    public Result<Map<String, Object>> uploadMarkdown(@RequestParam("file") MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return Result.<Map<String, Object>>fail().message("Please choose a markdown file");
        }

        String originalName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
        String extension = getExtension(originalName);
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            return Result.<Map<String, Object>>fail().message("Only .md or .markdown files are supported");
        }

        Path targetDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(targetDir);

        String filename = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        Path target = targetDir.resolve(filename).normalize();
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/tutorial-markdown/" + filename;
        Map<String, Object> data = new HashMap<>();
        data.put("url", url);
        data.put("filename", filename);
        return Result.ok(data);
    }

    @GetMapping("/uploads/tutorial-markdown/{filename:.+}")
    public ResponseEntity<FileSystemResource> readMarkdown(@PathVariable String filename) {
        if (!StringUtils.hasText(filename) || filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            return ResponseEntity.notFound().build();
        }

        File file = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(filename).toFile();
        if (!file.exists() || !file.isFile()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.TEXT_PLAIN)
                .body(new FileSystemResource(file));
    }

    private String getExtension(String filename) {
        int index = filename.lastIndexOf('.');
        return index >= 0 ? filename.substring(index + 1).toLowerCase() : "";
    }
}
'@

Write-Utf8NoBom -Path $controllerPath -Content $controllerContent
