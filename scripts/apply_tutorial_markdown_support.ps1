$ErrorActionPreference = 'Stop'

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Content
  )

  $directory = Split-Path -Parent $Path
  if ($directory -and -not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

$backendRoot = 'C:\Users\baoba\develop\Web\website_back_end'
$frontendRoot = 'C:\Users\baoba\develop\Web\website_front_end'

$contentTutorialJava = @'
package com.lanf.content.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.lanf.model.base.BaseEntity;
import lombok.Data;

@Data
@TableName("cms_tutorial")
public class ContentTutorial extends BaseEntity {

    @TableField("path")
    private String path;

    @TableField("title")
    private String title;

    @TableField("summary")
    private String summary;

    @TableField("published_label")
    private String publishedLabel;

    @TableField("categories_json")
    private String categoriesJson;

    @TableField("cover_image")
    private String coverImage;

    @TableField("tone")
    private String tone;

    @TableField("featured")
    private Integer featured;

    @TableField("overview")
    private String overview;

    @TableField("sections_json")
    private String sectionsJson;

    @TableField("references_json")
    private String referencesJson;

    @TableField("markdown_path")
    private String markdownPath;

    @TableField("sort_value")
    private Integer sortValue;

    @TableField("status")
    private Integer status;
}
'@

$contentTutorialMapperXml = @'
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lanf.content.mapper.ContentTutorialMapper">
    <resultMap id="contentTutorialMap" type="com.lanf.content.model.ContentTutorial" autoMapping="true"/>

    <sql id="columns">
        x1.id,
        x1.path,
        x1.title,
        x1.summary,
        x1.published_label,
        x1.categories_json,
        x1.cover_image,
        x1.tone,
        x1.featured,
        x1.overview,
        x1.sections_json,
        x1.references_json,
        x1.markdown_path,
        x1.sort_value,
        x1.status,
        x1.create_time,
        x1.update_time,
        x1.is_deleted
    </sql>

    <select id="selectFeaturedTutorial" resultMap="contentTutorialMap">
        select <include refid="columns"/>
        from cms_tutorial x1
        where x1.is_deleted = 0
          and x1.status = 1
          and x1.featured = 1
        order by x1.sort_value asc, x1.update_time desc, x1.create_time desc
        limit 1
    </select>

    <select id="selectPublishedList" resultMap="contentTutorialMap">
        select <include refid="columns"/>
        from cms_tutorial x1
        where x1.is_deleted = 0
          and x1.status = 1
        order by x1.sort_value asc, x1.update_time desc, x1.create_time desc
    </select>

    <select id="selectByPath" resultMap="contentTutorialMap">
        select <include refid="columns"/>
        from cms_tutorial x1
        where x1.path = #{path}
          and x1.is_deleted = 0
          and x1.status = 1
        limit 1
    </select>
</mapper>
'@

$contentTutorialUploadController = @'
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

    @Value("${content.tutorial.markdown.upload-dir:/root/workspace/ai/website/portal_website/uploads/tutorial-markdown}")
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

        File targetDir = new File(uploadDir);
        if (!targetDir.exists() && !targetDir.mkdirs()) {
            return Result.<Map<String, Object>>fail().message("Failed to create markdown directory");
        }

        String filename = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        File target = new File(targetDir, filename);
        file.transferTo(target);

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

        File file = new File(uploadDir, filename);
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

$contentDataServiceImpl = @'
package com.lanf.content.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lanf.content.mapper.ContentHomeMapper;
import com.lanf.content.mapper.ContentNewsMapper;
import com.lanf.content.mapper.ContentPortfolioConfigMapper;
import com.lanf.content.mapper.ContentToolCategoryMapper;
import com.lanf.content.mapper.ContentToolMapper;
import com.lanf.content.mapper.ContentTutorialMapper;
import com.lanf.content.model.ContentHome;
import com.lanf.content.model.ContentNews;
import com.lanf.content.model.ContentPortfolioConfig;
import com.lanf.content.model.ContentTool;
import com.lanf.content.model.ContentToolCategory;
import com.lanf.content.model.ContentTutorial;
import com.lanf.content.service.ContentDataService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContentDataServiceImpl implements ContentDataService {

    private final ObjectMapper objectMapper;
    private final ContentHomeMapper contentHomeMapper;
    private final ContentNewsMapper contentNewsMapper;
    private final ContentTutorialMapper contentTutorialMapper;
    private final ContentPortfolioConfigMapper contentPortfolioConfigMapper;
    private final ContentToolCategoryMapper contentToolCategoryMapper;
    private final ContentToolMapper contentToolMapper;

    @Value("${content.tutorial.markdown.upload-dir:/root/workspace/ai/website/portal_website/uploads/tutorial-markdown}")
    private String tutorialMarkdownUploadDir;

    public ContentDataServiceImpl(ObjectMapper objectMapper,
                                  ContentHomeMapper contentHomeMapper,
                                  ContentNewsMapper contentNewsMapper,
                                  ContentTutorialMapper contentTutorialMapper,
                                  ContentPortfolioConfigMapper contentPortfolioConfigMapper,
                                  ContentToolCategoryMapper contentToolCategoryMapper,
                                  ContentToolMapper contentToolMapper) {
        this.objectMapper = objectMapper;
        this.contentHomeMapper = contentHomeMapper;
        this.contentNewsMapper = contentNewsMapper;
        this.contentTutorialMapper = contentTutorialMapper;
        this.contentPortfolioConfigMapper = contentPortfolioConfigMapper;
        this.contentToolCategoryMapper = contentToolCategoryMapper;
        this.contentToolMapper = contentToolMapper;
    }

    @Override
    public Map<String, Object> getHomeData() {
        ContentHome contentHome = contentHomeMapper.selectActiveHome();
        if (contentHome == null) {
            return null;
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("hero", parseMap(contentHome.getHeroJson()));

        Map<String, Object> sections = new LinkedHashMap<>();
        sections.put("news", buildHomeNewsSection(contentHome.getNewsSectionJson()));
        sections.put("tutorials", parseMap(contentHome.getTutorialsSectionJson()));
        sections.put("tools", parseMap(contentHome.getToolsSectionJson()));
        result.put("sections", sections);
        return result;
    }

    @Override
    public Map<String, Object> getNewsListData() {
        List<ContentNews> newsList = contentNewsMapper.selectPublishedList();
        List<Map<String, Object>> items = new ArrayList<>();
        for (ContentNews item : newsList) {
            items.add(adaptNewsListItem(item));
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("items", items);
        result.put("total", items.size());
        return result;
    }

    @Override
    public Map<String, Object> getNewsDetailData(String id) {
        ContentNews item = contentNewsMapper.selectByContentId(id);
        return item == null ? null : adaptNewsDetailItem(item);
    }

    @Override
    public Map<String, Object> getTutorialListData() {
        Map<String, Object> result = new LinkedHashMap<>();

        ContentTutorial featuredItem = contentTutorialMapper.selectFeaturedTutorial();
        result.put("featuredItem", featuredItem == null ? null : adaptTutorialListItem(featuredItem));

        List<ContentTutorial> tutorials = contentTutorialMapper.selectPublishedList();
        List<Map<String, Object>> items = new ArrayList<>();
        for (ContentTutorial tutorial : tutorials) {
            items.add(adaptTutorialListItem(tutorial));
        }
        result.put("items", items);
        result.put("total", items.size());
        return result;
    }

    @Override
    public Map<String, Object> getTutorialDetailData(String path) {
        ContentTutorial item = contentTutorialMapper.selectByPath(path);
        return item == null ? null : adaptTutorialDetailItem(item);
    }

    @Override
    public Map<String, Object> getToolListData() {
        List<ContentToolCategory> categories = contentToolCategoryMapper.selectPublishedList();
        List<ContentTool> tools = contentToolMapper.selectPublishedList();

        List<Map<String, Object>> sections = new ArrayList<>();
        for (ContentToolCategory category : categories) {
            Map<String, Object> section = new LinkedHashMap<>();
            section.put("id", category.getId());
            section.put("name", category.getName());
            section.put("shortTabs", parseList(category.getShortTabsJson()));

            List<Map<String, Object>> sectionItems = new ArrayList<>();
            for (ContentTool tool : tools) {
                if (category.getId().equals(tool.getCategoryId())) {
                    sectionItems.add(adaptToolListItem(tool));
                }
            }
            section.put("items", sectionItems);
            sections.add(section);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sections", sections);
        result.put("total", tools.size());
        return result;
    }

    @Override
    public Map<String, Object> getToolDetailData(String id) {
        ContentTool item = contentToolMapper.selectByContentId(id);
        return item == null ? null : adaptToolDetailItem(item);
    }

    @Override
    public Map<String, Object> getDeveloperPortfolioData() {
        List<ContentPortfolioConfig> configs = contentPortfolioConfigMapper.selectPublishedList();
        Map<String, Object> result = new LinkedHashMap<>();
        for (ContentPortfolioConfig config : configs) {
            result.put(config.getConfigKey(), parseJsonValue(config.getConfigJson()));
        }
        return result;
    }

    private Map<String, Object> adaptNewsListItem(ContentNews item) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", item.getId());
        result.put("kind", "news");
        result.put("title", item.getTitle());
        result.put("summary", item.getSummary());
        result.put("categories", parseList(item.getCategoriesJson()));
        result.put("path", item.getPath());
        result.put("coverImage", item.getCoverImage());
        result.put("publishedLabel", item.getPublishedLabel());
        result.put("sourceName", item.getSourceName());
        return result;
    }

    private Map<String, Object> adaptNewsDetailItem(ContentNews item) {
        Map<String, Object> result = adaptNewsListItem(item);
        result.put("body", parseList(item.getBodyJson()));
        result.put("keyFacts", parseList(item.getKeyFactsJson()));
        result.put("timeline", parseList(item.getTimelineJson()));
        result.put("sourceLinks", parseList(item.getSourceLinksJson()));
        result.put("relatedLinks", parseList(item.getRelatedLinksJson()));
        return result;
    }

    private Map<String, Object> buildHomeNewsSection(String newsSectionJson) {
        Map<String, Object> section = new LinkedHashMap<>(parseMap(newsSectionJson));
        List<ContentNews> newsList = contentNewsMapper.selectPublishedList();
        List<Map<String, Object>> items = new ArrayList<>();
        int limit = Math.min(newsList.size(), 8);
        for (int i = 0; i < limit; i++) {
            ContentNews item = newsList.get(i);
            Map<String, Object> listItem = adaptNewsListItem(item);
            listItem.put("tone", "blue");
            items.add(listItem);
        }
        section.put("items", items);
        return section;
    }

    private Map<String, Object> adaptTutorialListItem(ContentTutorial item) {
        Map<String, Object> result = new LinkedHashMap<>();
        String contentType = StringUtils.hasText(item.getMarkdownPath()) ? "markdown" : "structured";
        result.put("id", item.getId());
        result.put("kind", "tutorial");
        result.put("title", item.getTitle());
        result.put("summary", item.getSummary());
        result.put("categories", parseList(item.getCategoriesJson()));
        result.put("path", item.getPath());
        result.put("routePath", buildTutorialRoutePath(item, contentType));
        result.put("contentType", contentType);
        result.put("publishedLabel", item.getPublishedLabel());
        result.put("coverImage", item.getCoverImage());
        result.put("tone", item.getTone());
        return result;
    }

    private Map<String, Object> adaptTutorialDetailItem(ContentTutorial item) {
        Map<String, Object> result = adaptTutorialListItem(item);
        result.put("path", item.getPath());
        result.put("overview", item.getOverview());
        result.put("references", parseList(item.getReferencesJson()));
        result.put("markdownPath", item.getMarkdownPath());

        if (StringUtils.hasText(item.getMarkdownPath())) {
            result.put("contentType", "markdown");
            result.put("markdownContent", readTutorialMarkdown(item.getMarkdownPath()));
            result.put("sections", Collections.emptyList());
        } else {
            result.put("contentType", "structured");
            result.put("sections", parseList(item.getSectionsJson()));
        }
        return result;
    }

    private String buildTutorialRoutePath(ContentTutorial item, String contentType) {
        if ("markdown".equals(contentType)) {
            return "/tutorials/article?path=" + URLEncoder.encode(item.getPath(), StandardCharsets.UTF_8);
        }
        return item.getPath();
    }

    private String readTutorialMarkdown(String markdownPath) {
        try {
            String filename = extractUploadFileName(markdownPath);
            if (!StringUtils.hasText(filename)) {
                return "";
            }

            File file = new File(tutorialMarkdownUploadDir, filename);
            if (!file.exists() || !file.isFile()) {
                return "";
            }
            return new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to read tutorial markdown file", e);
        }
    }

    private String extractUploadFileName(String markdownPath) {
        if (!StringUtils.hasText(markdownPath)) {
            return "";
        }
        String normalized = markdownPath.trim().replace("\\", "/");
        int index = normalized.lastIndexOf('/');
        String filename = index >= 0 ? normalized.substring(index + 1) : normalized;
        if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            return "";
        }
        return filename;
    }

    private Map<String, Object> adaptToolListItem(ContentTool item) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", item.getId());
        result.put("kind", "tool");
        result.put("title", item.getName());
        result.put("summary", item.getSubtitle());
        result.put("path", "/tools/detail?id=" + item.getId());
        result.put("categories", Collections.singletonList(item.getCategoryName()));
        result.put("logoText", item.getLogoText());
        result.put("tone", item.getTone());
        return result;
    }

    private Map<String, Object> adaptToolDetailItem(ContentTool item) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", item.getId());
        result.put("kind", "tool");
        result.put("title", item.getName());
        result.put("summary", item.getSummary());
        result.put("path", "/tools/detail?id=" + item.getId());
        result.put("categories", Collections.singletonList(item.getCategoryName()));
        result.put("categoryId", item.getCategoryId());
        result.put("categoryName", item.getCategoryName());
        result.put("subtitle", item.getSubtitle());
        result.put("description", item.getDescription());
        result.put("highlights", parseList(item.getHighlightsJson()));
        result.put("website", item.getWebsite());
        result.put("likes", item.getLikes());
        result.put("logoText", item.getLogoText());
        result.put("tone", item.getTone());
        return result;
    }

    private Map<String, Object> parseMap(String json) {
        if (!StringUtils.hasText(json)) {
            return Collections.emptyMap();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Failed to parse JSON object", e);
        }
    }

    private List<Object> parseList(String json) {
        if (!StringUtils.hasText(json)) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<List<Object>>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Failed to parse JSON array", e);
        }
    }

    private Object parseJsonValue(String json) {
        if (!StringUtils.hasText(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to parse JSON value", e);
        }
    }
}
'@

$tutorialUploadJs = @'
import request from '@/utils/request'

export function uploadTutorialMarkdown(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/admin/content/tutorial/upload/markdown',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
'@

$tutorialListVue = @'
<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="90px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="Title">
              <el-input v-model="searchObj.title" placeholder="Tutorial title" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Path">
              <el-input v-model="searchObj.path" placeholder="Tutorial path" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status">
              <el-select v-model="searchObj.status" clearable placeholder="All" style="width: 100%">
                <el-option :value="1" label="Enabled" />
                <el-option :value="0" label="Disabled" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">Search</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">Reset</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" :disabled="$hasBP('bnt.contentTutorial.add') === false" @click="add">Add</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%; margin-top: 10px;">
      <el-table-column label="No." width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" min-width="220" show-overflow-tooltip />
      <el-table-column prop="path" label="Path" width="220" show-overflow-tooltip />
      <el-table-column prop="tone" label="Tone" width="110" />
      <el-table-column label="Markdown" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.markdownPath ? 'success' : 'info'">
            {{ scope.row.markdownPath ? 'Yes' : 'No' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Featured" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="Number(scope.row.featured) === 1 ? 'warning' : 'info'">
            {{ Number(scope.row.featured) === 1 ? 'Yes' : 'No' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="statusTag(scope.row.status)">{{ Number(scope.row.status) === 1 ? 'Enabled' : 'Disabled' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="$hasBP('bnt.contentTutorial.update') === false" @click="edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="$hasBP('bnt.contentTutorial.remove') === false" @click="removeDataById(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-dialog :title="form.id ? 'Edit Tutorial' : 'Add Tutorial'" :visible.sync="dialogVisible" width="75%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="120px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Title" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Path" prop="path">
              <el-input v-model="form.path" placeholder="/tutorials/your-article-slug" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Published">
              <el-input v-model="form.publishedLabel" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Cover Image">
              <el-input v-model="form.coverImage" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="Tone">
              <el-input v-model="form.tone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Featured">
              <el-radio-group v-model="form.featured">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">Enabled</el-radio>
                <el-radio :label="0">Disabled</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Sort">
              <el-input-number v-model="form.sortValue" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Summary">
          <el-input v-model="form.summary" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="Markdown File">
          <el-input v-model="form.markdownPath" placeholder="/uploads/tutorial-markdown/xxx.md">
            <el-upload slot="append" :show-file-list="false" :http-request="uploadMarkdown" action="">
              <el-button icon="el-icon-upload">Upload</el-button>
            </el-upload>
          </el-input>
          <div class="field-tip">If a markdown file is uploaded, the portal will render that file directly. Otherwise it will use the structured overview and JSON sections below.</div>
        </el-form-item>
        <el-form-item label="Overview">
          <el-input v-model="form.overview" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="Categories JSON" prop="categoriesJson">
          <el-input v-model="form.categoriesJson" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="Sections JSON">
          <el-input v-model="form.sectionsJson" type="textarea" :rows="8" />
        </el-form-item>
        <el-form-item label="References JSON">
          <el-input v-model="form.referencesJson" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="saveOrUpdate">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/content/tutorial'
import { uploadTutorialMarkdown } from '@/api/content/tutorialUpload'
import { formatStatusTag, mapJsonFieldsForForm, parseJsonFieldsForSubmit } from '@/utils/content-admin'

const jsonDefaults = {
  categoriesJson: '[]',
  sectionsJson: '[]',
  referencesJson: '[]'
}

const defaultForm = {
  path: '',
  title: '',
  summary: '',
  publishedLabel: '',
  categoriesJson: '[]',
  coverImage: '',
  tone: '',
  featured: 0,
  markdownPath: '',
  overview: '',
  sectionsJson: '[]',
  referencesJson: '[]',
  sortValue: 0,
  status: 1
}

export default {
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      searchObj: {},
      dialogVisible: false,
      form: Object.assign({}, defaultForm),
      rules: {
        title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
        path: [{ required: true, message: 'Please input path', trigger: 'blur' }],
        categoriesJson: [{ required: true, message: 'Please input categories JSON', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    statusTag(status) {
      return formatStatusTag(status)
    },
    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      api.getPageList(this.page, this.limit, this.searchObj).then((response) => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    add() {
      this.dialogVisible = true
      this.form = Object.assign({}, defaultForm)
    },
    edit(id) {
      this.dialogVisible = true
      api.getById(id).then((response) => {
        this.form = mapJsonFieldsForForm(response.data, jsonDefaults)
      })
    },
    saveOrUpdate() {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return
        }
        let payload
        try {
          payload = parseJsonFieldsForSubmit(this.form, jsonDefaults)
        } catch (error) {
          this.$message.error(`Invalid JSON field: ${error.message}`)
          return
        }

        const hasStructuredContent = payload.overview || payload.sectionsJson !== '[]'
        const hasMarkdownContent = payload.markdownPath && String(payload.markdownPath).trim() !== ''
        if (!hasStructuredContent && !hasMarkdownContent) {
          this.$message.error('Please provide markdown content or structured tutorial content')
          return
        }

        const request = payload.id ? api.updateById(payload) : api.save(payload)
        request.then(() => {
          this.$message.success('Saved successfully')
          this.dialogVisible = false
          this.fetchData(this.page)
        })
      })
    },
    uploadMarkdown(param) {
      uploadTutorialMarkdown(param.file).then((res) => {
        this.form.markdownPath = res.data.url
        this.$message.success('Uploaded successfully')
      })
    },
    removeDataById(id) {
      this.$confirm('Delete this record?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return api.removeById(id)
      }).then(() => {
        this.$message.success('Deleted successfully')
        this.fetchData(this.page)
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.field-tip {
  margin-top: 8px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}
</style>
'@

Write-Utf8NoBom -Path (Join-Path $backendRoot 'src\main\java\com\lanf\content\model\ContentTutorial.java') -Content $contentTutorialJava
Write-Utf8NoBom -Path (Join-Path $backendRoot 'src\main\resources\mapper\ContentTutorialMapper.xml') -Content $contentTutorialMapperXml
Write-Utf8NoBom -Path (Join-Path $backendRoot 'src\main\java\com\lanf\content\controller\ContentTutorialUploadController.java') -Content $contentTutorialUploadController
Write-Utf8NoBom -Path (Join-Path $backendRoot 'src\main\java\com\lanf\content\service\impl\ContentDataServiceImpl.java') -Content $contentDataServiceImpl

$contentSchemaPath = Join-Path $backendRoot 'src\main\resources\sql\content_schema.sql'
$contentSchema = [System.IO.File]::ReadAllText($contentSchemaPath)
if ($contentSchema -notmatch 'markdown_path') {
  $contentSchema = $contentSchema -replace "(`r?`n  ``references_json`` json DEFAULT NULL,)", "`$1`r`n  ``markdown_path`` varchar(500) DEFAULT NULL,"
  Write-Utf8NoBom -Path $contentSchemaPath -Content $contentSchema
}

Write-Utf8NoBom -Path (Join-Path $frontendRoot 'src\api\content\tutorialUpload.js') -Content $tutorialUploadJs
Write-Utf8NoBom -Path (Join-Path $frontendRoot 'src\views\content\tutorial\list.vue') -Content $tutorialListVue
