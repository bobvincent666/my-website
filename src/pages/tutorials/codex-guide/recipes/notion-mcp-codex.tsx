import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/notion-mcp-codex.md';

export default function CodexGuideNotionMcpCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="notion-mcp-codex" Content={Content} />;
}
