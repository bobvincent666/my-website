import type {ReactNode} from 'react';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import ClaudeCodeArticle from '@site/blog/Claude-Code.md';

export default function ClaudeCodeNewsPage(): ReactNode {
  return (
    <TutorialArticlePage
      title="Claude Code 入门到精通"
      description="直接渲染本地 Markdown 文件 blog/Claude-Code.md"
      date="2026年4月12日"
      categories={['全网AI快讯', 'Markdown 详情']}
      heroTone="orange"
    >
      <ClaudeCodeArticle />
    </TutorialArticlePage>
  );
}
