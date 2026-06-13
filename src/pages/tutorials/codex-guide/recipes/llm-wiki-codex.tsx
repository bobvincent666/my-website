import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/llm-wiki-codex.md';

export default function CodexGuideLlmWikiCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="llm-wiki-codex" Content={Content} />;
}
