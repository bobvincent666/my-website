import type {ReactNode} from 'react';
import CodexGuideRecipesPage from '@site/src/components/CodexGuideRecipesPage';
import Content from '@site/src/content/codex-guide/recipes/clinical-literature-review.md';

export default function CodexGuideClinicalLiteratureReviewPage(): ReactNode {
  return <CodexGuideRecipesPage slug="clinical-literature-review" Content={Content} />;
}
