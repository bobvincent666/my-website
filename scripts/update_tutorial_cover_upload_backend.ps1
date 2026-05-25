$backendRoot = "C:\Users\baoba\develop\Web\website_back_end"
$controllerPath = Join-Path $backendRoot "src\main\java\com\lanf\content\controller\ContentTutorialUploadController.java"
$appDevPath = Join-Path $backendRoot "src\main\resources\application-dev.properties"

$controller = @'
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

    private static final Set<String> ALLOWED_MARKDOWN_EXTENSIONS = new HashSet<>(
            Arrays.asList("md", "markdown"));

    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = new HashSet<>(
            Arrays.asList("jpg", "jpeg", "png", "webp", "gif", "svg"));

    @Value("${content.tutorial.markdown.upload-dir:${CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR:./uploads/tutorial-markdown}}")
    private String markdownUploadDir;

    @Value("${content.tutorial.image.upload-dir:${CONTENT_TUTORIAL_IMAGE_UPLOAD_DIR:./uploads/tutorial-images}}")
    private String imageUploadDir;

    @PostMapping("/admin/content/tutorial/upload/markdown")
    public Result<Map<String, Object>> uploadMarkdown(@RequestParam("file") MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return Result.<Map<String, Object>>fail().message("Please choose a markdown file");
        }

        String originalName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
        String extension = getExtension(originalName);
        if (!ALLOWED_MARKDOWN_EXTENSIONS.contains(extension)) {
            return Result.<Map<String, Object>>fail().message("Only .md or .markdown files are supported");
        }

        String filename = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        Path target = prepareTarget(markdownUploadDir, filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/tutorial-markdown/" + filename;
        Map<String, Object> data = new HashMap<>();
        data.put("url", url);
        data.put("filename", filename);
        return Result.ok(data);
    }

    @PostMapping("/admin/content/tutorial/upload/image")
    public Result<Map<String, Object>> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return Result.<Map<String, Object>>fail().message("Please choose an image");
        }

        String originalName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
        String extension = getExtension(originalName);
        if (!ALLOWED_IMAGE_EXTENSIONS.contains(extension)) {
            return Result.<Map<String, Object>>fail().message("Only jpg, jpeg, png, webp, gif, svg images are supported");
        }

        String filename = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        Path target = prepareTarget(imageUploadDir, filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/tutorial-images/" + filename;
        Map<String, Object> data = new HashMap<>();
        data.put("url", url);
        data.put("filename", filename);
        return Result.ok(data);
    }

    @GetMapping("/uploads/tutorial-markdown/{filename:.+}")
    public ResponseEntity<FileSystemResource> readMarkdown(@PathVariable String filename) {
        if (isUnsafeFilename(filename)) {
            return ResponseEntity.notFound().build();
        }

        File file = Paths.get(markdownUploadDir).toAbsolutePath().normalize().resolve(filename).toFile();
        if (!file.exists() || !file.isFile()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.TEXT_PLAIN)
                .body(new FileSystemResource(file));
    }

    @GetMapping("/uploads/tutorial-images/{filename:.+}")
    public ResponseEntity<FileSystemResource> readImage(@PathVariable String filename) {
        if (isUnsafeFilename(filename)) {
            return ResponseEntity.notFound().build();
        }

        File file = Paths.get(imageUploadDir).toAbsolutePath().normalize().resolve(filename).toFile();
        if (!file.exists() || !file.isFile()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(resolveMediaType(filename))
                .body(new FileSystemResource(file));
    }

    private Path prepareTarget(String baseDir, String filename) throws IOException {
        Path targetDir = Paths.get(baseDir).toAbsolutePath().normalize();
        Files.createDirectories(targetDir);
        return targetDir.resolve(filename).normalize();
    }

    private boolean isUnsafeFilename(String filename) {
        return !StringUtils.hasText(filename) || filename.contains("..") || filename.contains("/") || filename.contains("\\");
    }

    private String getExtension(String filename) {
        int index = filename.lastIndexOf('.');
        return index >= 0 ? filename.substring(index + 1).toLowerCase() : "";
    }

    private MediaType resolveMediaType(String filename) {
        String extension = getExtension(filename);
        if ("png".equals(extension)) {
            return MediaType.IMAGE_PNG;
        }
        if ("jpg".equals(extension) || "jpeg".equals(extension)) {
            return MediaType.IMAGE_JPEG;
        }
        if ("gif".equals(extension)) {
            return MediaType.IMAGE_GIF;
        }
        if ("svg".equals(extension)) {
            return MediaType.valueOf("image/svg+xml");
        }
        if ("webp".equals(extension)) {
            return MediaType.valueOf("image/webp");
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
'@

Set-Content -Path $controllerPath -Value $controller -Encoding UTF8

$appDev = Get-Content -Path $appDevPath -Raw
if ($appDev -notmatch '(?m)^content\.tutorial\.image\.upload-dir=') {
    if (-not $appDev.EndsWith("`r`n")) {
        $appDev += "`r`n"
    }
    $appDev += "content.tutorial.image.upload-dir=${CONTENT_TUTORIAL_IMAGE_UPLOAD_DIR:./uploads/tutorial-images}`r`n"
    Set-Content -Path $appDevPath -Value $appDev -Encoding UTF8
}
