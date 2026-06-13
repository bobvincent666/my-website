import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/index.md';

export default function CodexGuideRecipesIndexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="index" Content={Content} />;
}
