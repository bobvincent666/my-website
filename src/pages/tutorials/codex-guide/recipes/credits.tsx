import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/credits.md';

export default function CodexGuideRecipesCreditsPage(): ReactNode {
  return <CodexGuideRecipesPage slug="credits" Content={Content} />;
}
