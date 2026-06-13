import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/remote-bug-fix.md';

export default function CodexGuideRemoteBugFixPage(): ReactNode {
  return <CodexGuideRecipesPage slug="remote-bug-fix" Content={Content} />;
}
