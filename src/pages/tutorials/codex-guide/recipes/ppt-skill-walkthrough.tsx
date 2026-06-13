import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/ppt-skill-walkthrough.md';

export default function CodexGuidePptSkillWalkthroughPage(): ReactNode {
  return <CodexGuideRecipesPage slug="ppt-skill-walkthrough" Content={Content} />;
}
