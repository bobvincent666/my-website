import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import ClaudeCodeContent from '@site/blog/Claude-Code.md';

export default function TutorialsClaudecodePage(): ReactNode {
  return (
    <Layout title="Claude Code 入门到精通" description="Claude Code 是由 Anthropic 公司推出的面向开发者的智能编码助手。">
     <TutorialArticlePage
        title="Claude Code：一个开源的 AI 代码助手，助你轻松驾驭编程挑战"
        description="Claude Code 能自动从数十个来源抓取内容，用 AI 生成高质量、结构清晰的摘要，按 4 小时 / 每日 / 每周 / 每月四种频率推送给你。"
        date="2026年02月27日"
        categories={['开源项目']}
        heroTone="orange"
      >
        <ClaudeCodeContent />
      </TutorialArticlePage>
    </Layout>
     
  );
}