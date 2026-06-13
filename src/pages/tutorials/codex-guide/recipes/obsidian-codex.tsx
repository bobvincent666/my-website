import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/obsidian-codex.md';

export default function CodexGuideObsidianCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="obsidian-codex" Content={Content} />;
}
