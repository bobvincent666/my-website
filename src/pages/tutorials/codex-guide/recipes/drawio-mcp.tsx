import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/drawio-mcp.md';

export default function CodexGuideDrawIoMcpPage(): ReactNode {
  return <CodexGuideRecipesPage slug="drawio-mcp" Content={Content} />;
}
