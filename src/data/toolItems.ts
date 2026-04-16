export type ToolCategory = {
  id: string;
  name: string;
  shortTabs?: string[];
};

export type ToolItem = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  subtitle: string;
  summary: string;
  description: string;
  highlights: string[];
  url: string;
  likes: number;
  logoText: string;
  tone: 'violet' | 'blue' | 'green' | 'dark' | 'pink';
};

export const toolCategories: ToolCategory[] = [
  {id: 'chat', name: 'AI对话与聊天'},
  {id: 'writing', name: 'AI写作工具'},
  {id: 'image', name: 'AI图像生成', shortTabs: ['AI绘画', 'AI换脸']},
  {id: 'video', name: 'AI视频生成'},
  {id: 'audio', name: 'AI音频工具'},
  {id: 'office', name: 'AI办公工具'},
  {id: 'search', name: 'AI搜索引擎'},
  {id: 'platform', name: 'AI开发平台'},
  {id: 'model', name: 'AI训练模型'},
  {id: 'coding', name: 'AI编程工具'},
  {id: 'check', name: 'AI内容检测'},
  {id: 'legal', name: 'AI法律助手'},
  {id: 'design', name: 'AI设计工具'},
];

function buildToolDetailHref(id: string) {
  return `/tools/detail?id=${encodeURIComponent(id)}`;
}

export const toolItems: ToolItem[] = [
  {
    id: 'qwen-chat',
    name: 'Qwen Chat',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '阿里云推出的 Qwen2.5-Max 正掀起新一轮模型应用热潮。',
    summary: '阿里云推出的 Qwen2.5-Max 正掀起行业新浪潮。',
    description:
      '阿里云推出的 Qwen2.5-Max 正掀起行业新浪潮。这款基于混合专家模型架构的智能引擎，通过海量数据训练展现出非凡实力。其预训练数据量突破 20 万亿 token 大关，相当于人类文明所有文字记录的数百倍体量。更令人瞩目的是，它在多项国际权威评测中力压 DeepSeek V3、GPT-4o 等顶尖模型，成为行业新标杆。',
    highlights: [
      '智能运算新标杆在知识问答、编程辅助、逻辑推理等场景下，展现出超越同级别模型的实战能力，特别在代码生成任务中准确率明显提升。',
      '动态资源调度系统采用智能路由技术，可根据任务需求自动调配计算资源，兼顾响应速度与成本控制。',
      '适合中文场景落地，从通用对话到企业知识库问答都有较成熟的体验。',
    ],
    url: 'https://chat.qwen.ai/',
    likes: 0,
    logoText: 'Q',
    tone: 'violet',
  },
  {
    id: 'grok-ai',
    name: 'Grok AI',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: 'Grok AI 是马斯克的 xAI 公司推出的对话助手。',
    summary: 'Grok AI 是马斯克的 xAI 公司推出的对话助手。',
    description:
      'Grok AI 面向实时信息、热点追踪和轻松问答场景，强调更强的联网感知和社交语境理解，适合需要快速获得趋势信息的用户。',
    highlights: [
      '适合关注实时事件和公共话题。',
      '在风格上更偏直接、轻松的对话体验。',
      '适合作为资讯跟进与观点整理的辅助工具。',
    ],
    url: 'https://grok.com/',
    likes: 0,
    logoText: 'X',
    tone: 'dark',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: 'DeepSeek 是幻方量化旗下深度求索推出的通用智能助手。',
    summary: 'DeepSeek 是幻方量化旗下深度求索推出的通用智能助手。',
    description:
      'DeepSeek 在推理、代码和长文本问答方面关注度很高，适合技术人员、研究人员以及需要高性价比模型能力的团队。',
    highlights: [
      '推理与代码场景表现亮眼。',
      '适合需要较长上下文的任务。',
      '在开发者圈层中有较高讨论度。',
    ],
    url: 'https://chat.deepseek.com/',
    likes: 0,
    logoText: 'DS',
    tone: 'blue',
  },
  {
    id: 'xingye-ai',
    name: '星野AI',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '星野是一款面向陪伴聊天与角色互动场景的 AI 产品。',
    summary: '星野是一款面向陪伴聊天与角色互动场景的 AI 产品。',
    description:
      '星野AI 更偏向轻社交与角色陪伴体验，适合希望尝试剧情式互动、个性化设定和情绪陪伴的用户。',
    highlights: [
      '更强调角色感与互动沉浸感。',
      '适合轻娱乐与情绪陪伴类使用。',
      '适合作为对话产品设计的参考案例。',
    ],
    url: 'https://www.xingyeai.com/',
    likes: 0,
    logoText: '星',
    tone: 'dark',
  },
  {
    id: 'zhipu-qingyan',
    name: '智谱清言',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '智谱清言以其卓越的性能吸引了大量中文用户。',
    summary: '智谱清言以其卓越的性能吸引了大量中文用户。',
    description:
      '智谱清言面向中文问答、写作、学习和办公场景，产品成熟度较高，适合通用型日常助手需求。',
    highlights: [
      '中文对话能力较稳定。',
      '覆盖学习、写作和办公辅助。',
      '适合大多数普通用户快速上手。',
    ],
    url: 'https://chatglm.cn/',
    likes: 0,
    logoText: 'Z',
    tone: 'blue',
  },
  {
    id: 'ernie-bot',
    name: '文心一言',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '文心一言是百度生态中的通用 AI 助手入口。',
    summary: '文心一言是百度生态中的通用 AI 助手入口。',
    description:
      '文心一言适合中文问答、资料整合、办公与生态联动场景，对百度系产品有一定协同优势。',
    highlights: [
      '中文生态整合度高。',
      '适合办公与资料整理。',
      '更适合百度系用户和企业用户尝试。',
    ],
    url: 'https://yiyan.baidu.com/',
    likes: 0,
    logoText: '文',
    tone: 'blue',
  },
  {
    id: 'yuanbao',
    name: '腾讯元宝',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '腾讯元宝是腾讯推出的一款通用 AI 助手产品。',
    summary: '腾讯元宝是腾讯推出的一款通用 AI 助手产品。',
    description:
      '腾讯元宝在办公问答、内容整理和腾讯生态协同场景中更有优势，适合已经在微信和腾讯文档场景中工作的用户。',
    highlights: [
      '办公和知识整理更顺手。',
      '生态协同是主要优势。',
      '适合日常通用问答与轻办公。',
    ],
    url: 'https://yuanbao.tencent.com/',
    likes: 0,
    logoText: '元',
    tone: 'green',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: 'Gemini 是 Google 生态中的多模态助手。',
    summary: 'Gemini 是 Google 生态中的多模态助手。',
    description:
      'Gemini 强调多模态、办公协同和搜索生态配合，适合跨文档、跨图片和信息整合场景。',
    highlights: [
      '多模态体验完整。',
      '与 Google 生态配合紧密。',
      '适合信息整合与学习使用。',
    ],
    url: 'https://gemini.google.com/',
    likes: 0,
    logoText: 'G',
    tone: 'blue',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: 'Kimi 是由月之暗面推出的长文本助手。',
    summary: 'Kimi 是由月之暗面推出的长文本助手。',
    description:
      'Kimi 在长文本阅读、资料整合和多轮问答上体验突出，适合学生、研究人员和需要处理大量文档的用户。',
    highlights: [
      '长文处理能力突出。',
      '适合资料总结与阅读辅助。',
      '多轮对话体验比较稳定。',
    ],
    url: 'https://kimi.moonshot.cn/',
    likes: 0,
    logoText: 'K',
    tone: 'dark',
  },
  {
    id: 'doubao',
    name: '豆包',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '豆包是一款面向大众用户的通用 AI 助手。',
    summary: '豆包是一款面向大众用户的通用 AI 助手。',
    description:
      '豆包定位更偏日常陪伴、轻创作和生活问答，适合普通用户低门槛接触 AI。',
    highlights: [
      '更偏生活化与大众化。',
      '适合中文日常使用。',
      '轻创作和问答体验友好。',
    ],
    url: 'https://www.doubao.com/',
    likes: 0,
    logoText: '豆',
    tone: 'pink',
  },
  {
    id: 'haimuo-ai',
    name: '海螺AI',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: '海螺 AI 是面向大众与创作者的综合型智能助手。',
    summary: '海螺 AI 是面向大众与创作者的综合型智能助手。',
    description:
      '海螺AI 覆盖聊天、创作和效率工具场景，整体体验偏轻量和易用，适合希望快速体验多功能能力的用户。',
    highlights: [
      '产品体验轻量直接。',
      '适合普通用户快速上手。',
      '兼顾聊天与内容创作。',
    ],
    url: 'https://hailuoai.com/',
    likes: 1,
    logoText: '海',
    tone: 'green',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    categoryId: 'chat',
    categoryName: 'AI对话与聊天',
    subtitle: 'ChatGPT 是最受全球用户关注的通用 AI 助手之一。',
    summary: 'ChatGPT 是最受全球用户关注的通用 AI 助手之一。',
    description:
      'ChatGPT 适合通用问答、写作、编程、学习和多模态场景，是很多人接触 AI 的第一站。',
    highlights: [
      '通用能力覆盖面广。',
      '适合从日常到专业任务的多种需求。',
      '生态和插件能力扩展空间大。',
    ],
    url: 'https://chatgpt.com/',
    likes: 0,
    logoText: 'CG',
    tone: 'green',
  },
  {
    id: 'yunque-ai',
    name: '云雀AI',
    categoryId: 'writing',
    categoryName: 'AI写作工具',
    subtitle: '科研写作过程中，选题构思与框架整理体验突出。',
    summary: '科研写作过程中，选题构思与框架整理体验突出。',
    description:
      '云雀AI 更适合论文构思、材料润色与结构搭建场景，适合学生与研究人员进行长文写作辅助。',
    highlights: [
      '更适合论文与正式文本写作。',
      '在结构整理上较有帮助。',
      '适合作为写作初稿助手。',
    ],
    url: 'https://www.yunque.ai/',
    likes: 0,
    logoText: '云',
    tone: 'blue',
  },
  {
    id: 'aibiye',
    name: 'Aibiye',
    categoryId: 'writing',
    categoryName: 'AI写作工具',
    subtitle: 'Aibiye 是长春芝麻开门教育科技推出的写作辅助工具。',
    summary: 'Aibiye 是长春芝麻开门教育科技推出的写作辅助工具。',
    description:
      'Aibiye 面向教育和写作辅助场景，适合选题、内容扩写、提纲整理和素材梳理。',
    highlights: [
      '适合教育与学习辅助。',
      '提纲生成和扩写体验顺手。',
      '适合基础写作任务。',
    ],
    url: 'https://www.aibiye.com/',
    likes: 0,
    logoText: 'Ai',
    tone: 'pink',
  },
  {
    id: 'moyu-ai',
    name: '墨狐AI',
    categoryId: 'writing',
    categoryName: 'AI写作工具',
    subtitle: '墨狐AI 是面向小说与故事创作的写作工具。',
    summary: '墨狐AI 是面向小说与故事创作的写作工具。',
    description:
      '墨狐AI 更适合长篇故事、人物设定、章节续写和灵感扩展，对小说创作者比较友好。',
    highlights: [
      '擅长小说与剧情内容。',
      '更适合创意写作。',
      '支持人物和世界观设定思路。',
    ],
    url: 'https://www.mohuai.com/',
    likes: 0,
    logoText: '墨',
    tone: 'violet',
  },
  {
    id: 'biling-ai',
    name: '笔灵AI小说',
    categoryId: 'writing',
    categoryName: 'AI写作工具',
    subtitle: '笔灵AI小说是面向网文创作者的写作辅助产品。',
    summary: '笔灵AI小说是面向网文创作者的写作辅助产品。',
    description:
      '笔灵AI小说适合网文创作、续写、脑洞扩展和章节打磨，面向持续输出型创作者。',
    highlights: [
      '适合网文与持续连载。',
      '章节续写效率较高。',
      '适合作为灵感放大器使用。',
    ],
    url: 'https://ibiling.cn/',
    likes: 0,
    logoText: '笔',
    tone: 'green',
  },
  {
    id: 'liblibai',
    name: 'LiblibAI',
    categoryId: 'image',
    categoryName: 'AI图像生成',
    subtitle: 'LiblibAI 是国内内容创作者常用的图像生成平台之一。',
    summary: 'LiblibAI 是国内内容创作者常用的图像生成平台之一。',
    description:
      'LiblibAI 提供图像生成、模型社区和创作工作流，适合设计师、插画师和内容创作者使用。',
    highlights: [
      '社区和模型资源丰富。',
      '适合国内创作者快速出图。',
      '适合风格探索与灵感验证。',
    ],
    url: 'https://www.liblib.art/',
    likes: 0,
    logoText: 'Li',
    tone: 'dark',
  },
  {
    id: 'wanxiang',
    name: '万相营造',
    categoryId: 'image',
    categoryName: 'AI图像生成',
    subtitle: '万相营造是面向视觉内容生产的 AI 创作工具。',
    summary: '万相营造是面向视觉内容生产的 AI 创作工具。',
    description:
      '万相营造适合海报、视觉提案和品牌创意草图生成，对营销与视觉团队比较友好。',
    highlights: [
      '适合视觉提案与营销素材。',
      '对品牌内容生产有帮助。',
      '更适合快节奏创意团队。',
    ],
    url: 'https://wanxiang.aliyun.com/',
    likes: 0,
    logoText: '万',
    tone: 'violet',
  },
  {
    id: 'faceswapper',
    name: 'FaceSwapper',
    categoryId: 'image',
    categoryName: 'AI图像生成',
    subtitle: 'FaceSwapper 是一款常见的 AI 换脸工具。',
    summary: 'FaceSwapper 是一款常见的 AI 换脸工具。',
    description:
      'FaceSwapper 更适合创意实验、娱乐内容和人像替换场景，使用门槛低，适合快速体验。',
    highlights: [
      '适合轻量换脸场景。',
      '操作门槛较低。',
      '适合作为图像玩法类工具体验。',
    ],
    url: 'https://www.faceswapper.ai/',
    likes: 0,
    logoText: 'FS',
    tone: 'blue',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    categoryId: 'image',
    categoryName: 'AI图像生成',
    subtitle: 'Stable Diffusion 是最具代表性的开源图像生成模型之一。',
    summary: 'Stable Diffusion 是最具代表性的开源图像生成模型之一。',
    description:
      'Stable Diffusion 拥有庞大的开源生态和丰富的工作流扩展，适合有一定技术能力的创作者深度定制。',
    highlights: [
      '开源生态完整。',
      '高度可定制。',
      '适合进阶用户与工作流搭建。',
    ],
    url: 'https://stability.ai/',
    likes: 0,
    logoText: 'SD',
    tone: 'pink',
  },
];

export function getToolById(id: string | null | undefined) {
  if (!id) {
    return undefined;
  }

  return toolItems.find((item) => item.id === id);
}

export function getToolsByCategory(categoryId: string) {
  return toolItems.filter((item) => item.categoryId === categoryId);
}
