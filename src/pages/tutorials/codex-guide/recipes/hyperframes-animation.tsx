import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/hyperframes-animation.md';

export default function CodexGuideHyperframesAnimationPage(): ReactNode {
  return <CodexGuideRecipesPage slug="hyperframes-animation" Content={Content} />;
}
