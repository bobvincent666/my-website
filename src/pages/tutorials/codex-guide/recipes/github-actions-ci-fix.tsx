import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/github-actions-ci-fix.md';

export default function CodexGuideGithubActionsCiFixPage(): ReactNode {
  return <CodexGuideRecipesPage slug="github-actions-ci-fix" Content={Content} />;
}
