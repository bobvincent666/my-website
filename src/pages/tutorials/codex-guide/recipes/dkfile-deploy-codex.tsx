import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/dkfile-deploy-codex.md';

export default function CodexGuideDkfileDeployCodexPage(): ReactNode {
  return <CodexGuideRecipesPage slug="dkfile-deploy-codex" Content={Content} />;
}
