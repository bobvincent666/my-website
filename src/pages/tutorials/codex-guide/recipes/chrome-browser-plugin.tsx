import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/chrome-browser-plugin.md';

export default function CodexGuideChromeBrowserPluginPage(): ReactNode {
  return <CodexGuideRecipesPage slug="chrome-browser-plugin" Content={Content} />;
}
