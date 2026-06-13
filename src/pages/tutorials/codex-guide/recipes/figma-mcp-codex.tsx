import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/figma-mcp-codex.md';

export default function CodexGuideFigmaMcpCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="figma-mcp-codex" Content={Content} />;
}
