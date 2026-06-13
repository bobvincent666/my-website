import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/feishu-cli-codex.md';

export default function CodexGuideFeishuCliCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="feishu-cli-codex" Content={Content} />;
}
