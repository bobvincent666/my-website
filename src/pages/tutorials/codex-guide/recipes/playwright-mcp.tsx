import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/playwright-mcp.md';

export default function CodexGuidePlaywrightMcpPage(): ReactNode {
  return <CodexGuideRecipesPage slug="playwright-mcp" Content={Content} />;
}
