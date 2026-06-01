# SpaceSeek Portal Website

[简体中文](#简体中文) | [English](#english)

---

## 简体中文

### 项目简介

`my-website` 是 SpaceSeek 的门户前端项目，用于搭建一个聚合 **AI 快讯、技术教程、工具目录** 的内容型网站。  
项目基于 **Docusaurus + React + TypeScript**，支持：

- 首页内容聚合
- 新闻列表与详情页
- 教程列表与详情页
- 工具目录与详情页
- 对接内容管理后台与后端接口
- 支持上传图片、Markdown 教程并在门户站渲染

这个仓库适合作为“AI 内容分享网站”的前端模板开源给更多开发者复用。

### 在线站点

- 门户站：`https://spaceseek.tech`
- 管理后台：`https://wsadmin.spaceseek.tech`

### 项目截图

![SpaceSeek 首页截图](C:\Users\baoba\develop\Web\my-website\static\img\home_image.png)

### 相关仓库

当前仓库只包含**门户前端**。如果你需要完整内容管理链路，还需要配套项目：

- `website_back_end`：内容接口、上传接口、鉴权、内容聚合逻辑
- `website_front_end`：管理控制台，用于维护新闻、教程、工具、首页配置

### 技术栈

- Docusaurus 3
- React 19
- TypeScript
- MDX / Markdown
- CSS Modules

### 适用场景

- 搭建 AI 资讯 / 教程 / 工具导航网站
- 作为内容型门户站前端模板
- 对接已有 CMS / Java 后端 / Node 后端
- 为开源 AI 社区建设内容展示站点

---

### 功能概览

#### 1. 首页

- 聚合展示新闻、教程、工具
- 支持运营位配置
- 支持接口化取数

#### 2. 新闻系统

- 新闻列表页
- 新闻详情页
- 支持来源、时间线、关键信息卡片等结构

#### 3. 教程系统

- 教程列表页
- 教程详情页
- 支持两种内容模式：
  - 结构化 JSON 教程
  - Markdown 教程动态渲染

#### 4. 工具目录

- 工具分类列表
- 工具详情页

#### 5. 内容接口对接

当前前端已经支持从后端接口获取：

- 首页数据
- 新闻列表 / 详情
- 教程列表 / 详情
- 工具列表 / 详情

接口入口逻辑位于：

- [src/data/contentApi.ts](C:\Users\baoba\develop\Web\my-website\src\data\contentApi.ts)

---

### 本地开发

#### 环境要求

- Node.js `>= 20`
- npm 或 yarn

建议使用与 `package.json` 一致的 Node 版本。

#### 安装依赖

```bash
npm install
```

或

```bash
yarn
```

#### 启动开发环境

```bash
npm run start
```

默认会启动在本地开发端口（通常为 `3000`）。

#### 类型检查

```bash
npm run typecheck
```

#### 生产构建

```bash
npm run build
```

#### 本地预览构建结果

```bash
npm run serve
```

---

### 数据来源说明

#### 1. 静态内容

部分页面内容仍保留本地静态资源作为兜底或固定内容来源，例如：

- `blog/`
- `src/data/home.json`
- `src/data/tutorialItems.json`
- `src/data/tutorialDetailsItem.json`

#### 2. 接口内容

站点当前主要通过 `/api/content/**` 获取内容。

本地开发时：

- 当前逻辑会请求 `http://localhost:5240/api/content/...`

部署到服务器后：

- 当前逻辑会自动改为同域相对路径 `/api/content/...`

#### 3. 上传资源

如果内容中使用了后台上传图片，前端会自动处理 `/uploads/...` 路径：

- 本地：拼接为 `http://localhost:5240/uploads/...`
- 线上：拼接为同域 `/uploads/...`

---

### 项目结构

```text
my-website/
├─ blog/                      # Markdown / blog 内容
├─ docs/                      # Docusaurus docs（当前项目主要未作为主内容区使用）
├─ src/
│  ├─ components/             # 页面组件
│  ├─ css/                    # 全局样式
│  ├─ data/                   # 本地数据、统一模型、API 适配层
│  ├─ hooks/                  # 自定义 hooks
│  └─ pages/                  # 路由页面
├─ static/                    # 静态资源（图片、logo、favicon 等）
├─ docusaurus.config.ts       # 站点配置
├─ sidebars.ts                # docs 侧边栏配置
└─ package.json
```

#### 核心目录说明

- `src/pages/news/`：新闻页面
- `src/pages/tutorials/`：教程页面
- `src/pages/tools/`：工具页面
- `src/components/`：页面级组件
- `src/data/contentModels.ts`：统一内容模型
- `src/data/contentApi.ts`：后端接口适配

---

### 与后台联动的关键约定

#### 内容接口

当前前端默认依赖以下接口风格：

- `GET /api/content/home`
- `GET /api/content/news`
- `GET /api/content/news/:id`
- `GET /api/content/tutorials`
- `GET /api/content/tutorials/detail?path=...`
- `GET /api/content/tools`
- `GET /api/content/tools/:id`

#### 教程内容模式

教程支持两种来源：

1. **结构化教程**
   - 后端返回 `overview / sections / references`

2. **Markdown 教程**
   - 后端返回：
     - `contentType = markdown`
     - `markdownContent`
   - 前端统一使用 Markdown 渲染组件展示

#### 图片资源

若后端返回：

```text
/uploads/tutorial-images/xxx.png
```

则需要确保：

- 门户站 Nginx 可访问 `/uploads/**`
- 后端上传目录与 Nginx `alias` 指向同一目录

---

### 部署说明

#### 1. 构建静态站点

```bash
npm run build
```

构建产物位于：

```text
build/
```

#### 2. Nginx 反向代理建议

门户站通常需要同时代理：

- `/api/` -> 后端服务
- `/uploads/` -> 上传资源目录
- `/` -> `build/` 静态文件

示例：

```nginx
server {
    listen 80;
    server_name spaceseek.tech;

    location /api/ {
        proxy_pass http://127.0.0.1:5240;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        alias /your/uploads/root/;
        try_files $uri =404;
    }

    location / {
        root /your/portal/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

#### 3. 需要特别注意的点

- `/uploads/` 目录必须和后端真实写入目录一致
- 管理台域名和门户域名如果都要显示图片，两边都要配置 `/uploads/`
- 上传资源过大时，Nginx 还要配置：

```nginx
client_max_body_size 10m;
```

---

### 常用命令

```bash
npm run start          # 本地开发
npm run build          # 生产构建
npm run serve          # 本地预览 build
npm run clear          # 清理 Docusaurus 缓存
npm run typecheck      # TypeScript 检查
npm run write-heading-ids
npm run write-translations
```

---

### 开源协作建议

如果你准备基于这个项目继续开发，建议优先关注以下几部分：

1. 统一内容模型
   - `src/data/contentModels.ts`

2. 内容接口适配
   - `src/data/contentApi.ts`

3. 教程 Markdown 渲染链路
   - `src/pages/tutorials/article.tsx`
   - `src/components/TutorialMarkdownContent/`

4. 首页、新闻、教程、工具的数据映射关系

---

### 已知说明

- 当前仓库中存在部分历史中文编码污染文本，后续可继续清理。
- 某些 blog / tutorial-posts 页面存在锚点 warning，不影响主站内容页面运行。
- 当前站点更偏向“内容门户”而非通用博客模板。

---

### License

如果你计划正式开源，建议补充明确的开源协议，例如：

- MIT
- Apache-2.0

当前仓库请在发布前补充 `LICENSE` 文件。

---

## English

### Overview

`my-website` is the portal frontend for SpaceSeek, designed to build an AI-focused content website that combines:

- AI news
- technical tutorials
- tool directories

The project is built with **Docusaurus + React + TypeScript** and supports both static content and backend-driven content.

It can be reused as an open-source frontend template for anyone building an AI knowledge-sharing website.

### Live Sites

- Portal: `https://spaceseek.tech`
- Admin: `https://wsadmin.spaceseek.tech`

### Screenshot

![SpaceSeek homepage screenshot](C:\Users\baoba\develop\Web\my-website\static\img\home_image.png)

### Related Repositories

This repository contains the **portal frontend only**.

For the full content workflow, the ecosystem usually also includes:

- `website_back_end`: content APIs, upload APIs, aggregation logic, authentication
- `website_front_end`: admin console for managing news, tutorials, tools, and homepage sections

### Tech Stack

- Docusaurus 3
- React 19
- TypeScript
- MDX / Markdown
- CSS Modules

---

### Features

#### Homepage

- Aggregated news, tutorials, and tools
- Configurable sections
- API-driven content support

#### News

- News list page
- News detail page
- Structured detail blocks such as sources, timelines, and key facts

#### Tutorials

- Tutorial list page
- Tutorial detail page
- Two content modes:
  - structured JSON tutorials
  - runtime-rendered Markdown tutorials

#### Tools

- Tool directory
- Tool detail page

#### API Integration

The frontend already supports:

- homepage data
- news list / detail
- tutorial list / detail
- tool list / detail

Main API adapter:

- [src/data/contentApi.ts](C:\Users\baoba\develop\Web\my-website\src\data\contentApi.ts)

---

### Local Development

#### Requirements

- Node.js `>= 20`
- npm or yarn

#### Install

```bash
npm install
```

or

```bash
yarn
```

#### Start Dev Server

```bash
npm run start
```

#### Type Check

```bash
npm run typecheck
```

#### Production Build

```bash
npm run build
```

#### Serve Built Output

```bash
npm run serve
```

---

### Data Sources

#### Static content

Some content is still stored locally as static resources or fallbacks, for example:

- `blog/`
- `src/data/home.json`
- `src/data/tutorialItems.json`
- `src/data/tutorialDetailsItem.json`

#### API content

The main portal content is fetched from `/api/content/**`.

In local development:

- requests are sent to `http://localhost:5240/api/content/...`

In production:

- requests automatically fall back to same-origin `/api/content/...`

#### Uploaded assets

If the backend returns:

```text
/uploads/...
```

the frontend resolves it automatically:

- local: `http://localhost:5240/uploads/...`
- production: same-origin `/uploads/...`

---

### Project Structure

```text
my-website/
├─ blog/
├─ docs/
├─ src/
│  ├─ components/
│  ├─ css/
│  ├─ data/
│  ├─ hooks/
│  └─ pages/
├─ static/
├─ docusaurus.config.ts
├─ sidebars.ts
└─ package.json
```

Key areas:

- `src/pages/news/`
- `src/pages/tutorials/`
- `src/pages/tools/`
- `src/data/contentModels.ts`
- `src/data/contentApi.ts`

---

### Backend Contract

Expected API shape:

- `GET /api/content/home`
- `GET /api/content/news`
- `GET /api/content/news/:id`
- `GET /api/content/tutorials`
- `GET /api/content/tutorials/detail?path=...`
- `GET /api/content/tools`
- `GET /api/content/tools/:id`

#### Tutorial modes

1. **Structured tutorial**
   - backend returns `overview / sections / references`

2. **Markdown tutorial**
   - backend returns:
     - `contentType = markdown`
     - `markdownContent`

---

### Deployment Notes

Typical Nginx setup should support:

- `/api/` -> backend service
- `/uploads/` -> uploaded assets
- `/` -> portal static build

Example:

```nginx
server {
    listen 80;
    server_name example.com;

    location /api/ {
        proxy_pass http://127.0.0.1:5240;
    }

    location /uploads/ {
        alias /your/uploads/root/;
        try_files $uri =404;
    }

    location / {
        root /your/portal/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

Also note:

- uploaded asset directories must match the backend write path
- if uploads are handled behind Nginx, both admin and portal domains may need `/uploads/`
- large uploads require:

```nginx
client_max_body_size 10m;
```

---

### Useful Scripts

```bash
npm run start
npm run build
npm run serve
npm run clear
npm run typecheck
```

---

### Open Source Notes

Before publishing this project publicly, you should also add:

- a `LICENSE` file
- deployment instructions for backend/admin repos
- screenshots or demo GIFs
- issue / contribution guidelines if needed

### License

Recommended options:

- MIT
- Apache-2.0

Please add a proper `LICENSE` file before releasing the project.
