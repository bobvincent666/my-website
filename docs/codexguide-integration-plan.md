# CodexGuide 内容结构盘点与整合实施方案

## 1. 目标

将 `C:\Users\baoba\develop\AI\CodexGuide` 的高质量文档内容整合进当前项目，而不是直接引入 VuePress 站点本身。

当前项目已经具备这些承接条件：

- `my-website` 已支持教程列表与教程详情页
- `my-website` 已支持基于接口的 Markdown 教程渲染
- `website_back_end` 已支持教程 Markdown 文件上传与详情接口返回 `markdownContent`
- `website_front_end` 已支持教程封面上传与 Markdown 文件上传

结论：

- 内容迁移：可行
- 框架级整站嵌入：不推荐
- 最佳落地方式：专题化迁移整合

## 2. CodexGuide 现状盘点

源仓库：

- `C:\Users\baoba\develop\AI\CodexGuide`

技术栈：

- VuePress 2
- Vue 3
- `vuepress-theme-hope`

主内容目录：

- `C:\Users\baoba\develop\AI\CodexGuide\docs`

内容规模：

- Markdown 文件总数：53

栏目分布：

| 栏目 | 数量 | 当前判断 |
| --- | ---: | --- |
| `guide` | 19 | 主学习路径，优先迁移 |
| `platform` | 6 | 平台认知，适合专题目录页 |
| `configuration` | 5 | 配置与安全，适合文档/教程 |
| `practice` | 4 | 方法论专题 |
| `recipes` | 16 | 实战案例库，价值高 |
| `reference` | 1 | 参考页 |
| `community` | 1 | 共建/roadmap 页 |

关键资源目录：

- `docs/images`
- `docs/.vuepress/public/images`
- `docs/.vuepress/public/screenshots`

兼容性风险：

1. `docs/index.md` 使用 VuePress 首页 frontmatter，不适合直接迁移
2. 大量使用 `::: tip / warning / info / caution` 容器语法
3. 图片路径依赖 VuePress 目录结构
4. 侧边栏依赖 `.vuepress/sidebar/index.ts`
5. 当前 `my-website` 的 `TutorialMarkdownContent` 只支持有限 Markdown 语法，需要在导入时清洗

当前渲染器的明确限制：

- 支持：标题、段落、无序列表、有序列表、引用、代码块、横线、粗体、斜体、行内代码、链接
- 不支持：Markdown 图片、表格、VuePress 容器、自定义组件、目录锚点扩展

这意味着：

- 如果首批 5 篇正文包含内容图片，当前 `my-website` 还需要扩展 `TutorialMarkdownContent`
- 仅做路径重写不够，前端渲染器本身也要支持 `![alt](url)`

## 3. 路由映射策略

不建议把 `CodexGuide` 继续塞进 `/tutorials/article?path=...` 的 query 形式长期使用。建议对 CodexGuide 建立独立专题路由层。

推荐目标路由前缀：

- `/guides/codex/...`

原因：

- 与现有零散教程 `tutorials/*` 解耦
- 便于后续做专题导航、章节目录、面包屑和 SEO
- 不会把 CodexGuide 53 篇内容全部混入通用 tutorials 路由命名空间

### 3.1 栏目级路由映射表

| CodexGuide 源栏目 | 目标路由前缀 | 页面定位 | 备注 |
| --- | --- | --- | --- |
| `docs/index.md` | `/guides/codex` | 专题首页 | 重写，不直接迁移 |
| `guide/*` | `/guides/codex/guide/*` | 入门与主线教程 | 第一优先级 |
| `platform/*` | `/guides/codex/platform/*` | 平台能力说明 | 第二优先级 |
| `configuration/*` | `/guides/codex/configuration/*` | 配置与安全 | 第二优先级 |
| `practice/*` | `/guides/codex/practice/*` | 工作方法 | 第二优先级 |
| `recipes/*` | `/guides/codex/recipes/*` | 实战案例库 | 第三优先级 |
| `reference/*` | `/guides/codex/reference/*` | 参考资料 | 第三优先级 |
| `community/*` | `/guides/codex/community/*` | 共建页 | 视需要迁移 |

### 3.2 文件级首批路由映射表

以下 5 篇作为第一批迁移目标：

| 源文件 | 推荐 slug | 目标 path | 推荐 routePath | 原因 |
| --- | --- | --- | --- | --- |
| `guide/00-overview.md` | `codex-overview` | `/guides/codex/guide/overview` | `/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Foverview` | 专题入口认知页 |
| `guide/01-app-installation.md` | `codex-app-installation` | `/guides/codex/guide/app-installation` | `/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fapp-installation` | 新手起步页 |
| `guide/12-cli-installation.md` | `codex-cli-installation` | `/guides/codex/guide/cli-installation` | `/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fcli-installation` | CLI 安装常用 |
| `platform/index.md` | `codex-platform-map` | `/guides/codex/platform/overview` | `/tutorials/article?path=%2Fguides%2Fcodex%2Fplatform%2Foverview` | 平台总览页 |
| `recipes/index.md` | `codex-recipes` | `/guides/codex/recipes/overview` | `/tutorials/article?path=%2Fguides%2Fcodex%2Frecipes%2Foverview` | 实战案例入口页 |

说明：

- `path` 是后端教程详情接口的唯一查找键
- `routePath` 是前端列表页实际跳转路径
- 当前系统若短期内不新增真正的动态路由解析，可先继续走 `/tutorials/article?path=...`
- 后续如要升级，可在 `my-website` 增加 `/guides/codex/[...slug]` 形式的真实静态/动态映射页

## 4. 第一批 5 篇文章迁移方案

### 4.1 迁移原则

1. 保留正文内容，不保留 VuePress 站点结构
2. 封面、摘要、分类、路径走后台结构化字段
3. Markdown 文件只存正文，不把主题配置混进去
4. 图片统一迁移到当前站点静态目录或后端上传目录
5. 所有容器语法在导入前转换成当前渲染器可识别格式

### 4.2 每篇文章的处理要求

#### A. `guide/00-overview.md`

- 目标定位：CodexGuide 专题的认知总览
- 风险点：
  - 可能含专题导语和相对链接
  - 需统一站内链接风格
- 处理：
  - 提取首段作为 summary
  - 分类建议：`["CodexGuide", "入门"]`
  - 封面建议：单独上传 Codex 专题封面

#### B. `guide/01-app-installation.md`

- 目标定位：App 安装指引
- 风险点：
  - 图片较多
  - 可能有提示块
- 处理：
  - 将 `::: tip / warning` 转为 blockquote
  - 将 `../images/...` 改写为 `/codex-guide/images/...`
  - 分类建议：`["CodexGuide", "安装"]`

#### C. `guide/12-cli-installation.md`

- 目标定位：CLI 安装教程
- 风险点：
  - 代码块和命令较多
  - 可能有平台差异说明
- 处理：
  - 保留 fenced code block
  - 列表和命令说明按当前 Markdown 渲染器兼容格式保留
  - 分类建议：`["CodexGuide", "CLI"]`

#### D. `platform/index.md`

- 目标定位：Codex 平台入口总览
- 风险点：
  - 更像目录页，可能包含大量站内跳转
- 处理：
  - 允许保留列表式目录
  - 将原相对链接改成新路由
  - 分类建议：`["CodexGuide", "平台"]`

#### E. `recipes/index.md`

- 目标定位：案例库入口
- 风险点：
  - 大量子案例链接
  - 可能需二期继续迁移 recipes 具体文章
- 处理：
  - 当前先保留目录性质
  - 子链接按后续 recipes 路由规范预置
  - 分类建议：`["CodexGuide", "案例"]`

### 4.3 第一批迁移落地顺序

1. 复制源 Markdown 到中间目录
2. 执行批量转换脚本
3. 上传清洗后的 Markdown 到 `website_back_end`
4. 在 `website_front_end` 的教程管理页补录元数据
5. 在 `my-website` 的教程列表或专题入口中展示

## 5. Markdown 批量清洗/转换方案

### 5.1 目标

生成可导入当前系统的标准化产物：

1. 清洗后的 Markdown 正文
2. 教程导入清单 `manifest.json`
3. 图片资源重映射结果

### 5.2 必做转换规则

#### 规则 A：移除或重写 VuePress 首页 frontmatter

下列字段不应直接进入当前项目正文：

- `home`
- `heroImage`
- `heroText`
- `tagline`
- `actions`
- `features`
- `pageClass`

处理策略：

- 普通文档保留基础 frontmatter 中的 `title / description`
- `docs/index.md` 不直接导入，改为专题首页手工重写

#### 规则 B：容器语法转换

将：

```md
::: tip
内容
:::
```

转换为：

```md
> Tip: 内容
```

同理支持：

- `warning`
- `info`
- `caution`

原因：

当前 `TutorialMarkdownContent` 只支持 blockquote，不支持 VuePress 容器语法。

#### 规则 C：图片路径重写

统一改成：

- `../images/...` -> `/codex-guide/images/...`
- `/images/...` -> `/codex-guide/images/...`
- `/screenshots/...` -> `/codex-guide/screenshots/...`

#### 规则 D：站内链接重写

把原 VuePress 站内链接转为新 path 或 routePath。

例如：

- `../guide/01-app-installation.md`
  -> `/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fapp-installation`

#### 规则 E：HTML 清洗

对于非必要 HTML：

- 目录页和首页中的布局型 HTML 移除
- 正文中的简单 HTML 尽量转为纯 Markdown

### 5.3 建议产物目录

转换脚本建议输出到：

- `C:\Users\baoba\develop\Web\my-website\.codexguide-output\markdown`
- `C:\Users\baoba\develop\Web\my-website\.codexguide-output\manifest`

说明：

- 这是中间产物目录，不直接作为线上内容目录
- 最终正文仍通过后台上传/接口导入进入系统

## 6. 接口与系统改造要求

这一部分不能忽略 `website_back_end` 和 `website_front_end`。

### 6.1 `website_back_end` 需要保证的能力

当前已有能力：

- 上传教程 Markdown
- 上传教程封面
- 教程详情接口返回 `markdownContent`

建议补充或确认以下能力：

#### A. 教程新增/修改接口字段

教程模型至少要支持：

- `id`
- `title`
- `summary`
- `path`
- `route_path`
- `categories`
- `published_label`
- `cover_image`
- `tone`
- `markdown_path`
- `content_type`
- `source_project`
- `source_path`

其中建议新增：

- `route_path`
- `source_project`
- `source_path`

用于保留 CodexGuide 来源与前端实际跳转路径。

#### B. 建议新增批量导入接口

建议新增：

- `POST /admin/content/tutorial/import`

请求体建议：

```json
{
  "sourceProject": "CodexGuide",
  "items": [
    {
      "title": "Codex Overview",
      "summary": "....",
      "path": "/guides/codex/guide/overview",
      "routePath": "/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Foverview",
      "categories": ["CodexGuide", "入门"],
      "publishedLabel": "2026-06-01",
      "coverImage": "/uploads/tutorial-images/codex-guide.png",
      "tone": "blue",
      "contentType": "markdown",
      "markdownContent": "..."
    }
  ]
}
```

如果短期不做批量接口，也至少要允许脚本通过现有新增接口逐条写入。

### 6.2 `website_front_end` 需要保证的能力

建议补充：

#### A. 教程管理页新增字段

- `routePath`
- `sourceProject`
- `sourcePath`

#### B. 增加批量导入入口

建议在教程管理页增加：

- “导入 CodexGuide Markdown” 按钮
- 上传 `manifest.json`
- 后台批量创建教程记录

短期可以不做 UI，只要后端先有接口。

### 6.3 `my-website` 需要保证的能力

建议补充：

1. 首页和 tutorials 列表页可按 `sourceProject = CodexGuide` 做专题聚合
2. 增加 CodexGuide 专题入口页
3. 后续考虑将 `routePath` 作为教程卡片跳转优先值
4. 扩展 `TutorialMarkdownContent`，至少补齐：
   - Markdown 图片
   - 表格
   - 更稳健的 blockquote 与列表解析

## 7. 实施顺序

### 阶段一：准备

1. 定义路由命名规范
2. 建立静态资源目录：
   - `static/codex-guide/images`
   - `static/codex-guide/screenshots`
3. 确认首批 5 篇映射

### 阶段二：转换

1. 使用批量脚本清洗 Markdown
2. 批量复制图片资源
3. 生成 manifest

### 阶段三：导入

1. `website_back_end` 接收导入请求
2. `website_front_end` 支持管理与复核
3. `my-website` 展示专题内容

### 阶段四：扩展

1. 扩展到 `guide` 全量
2. 再迁 `platform / configuration / practice`
3. 最后迁 `recipes / reference / community`

## 8. 当前建议的最小可用交付

第一批只做以下内容：

- 5 篇文章导入
- 1 个 CodexGuide 专题入口页
- 1 套批量转换脚本
- 1 套后端批量导入接口

这样可以先验证：

- Markdown 兼容性
- 图片资源链路
- 教程列表展示
- 教程详情渲染
- 后台管理可维护性

## 9. 决策建议

当前最合理的执行路径：

1. 先保留现有教程系统
2. 将 CodexGuide 作为独立专题内容源
3. 先跑首批 5 篇迁移
4. 验证后再批量扩展至 53 篇

这条路径风险最低，也最符合当前三端架构。
