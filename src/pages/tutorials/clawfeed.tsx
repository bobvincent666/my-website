import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import TutorialDetailContent from '@site/src/components/TutorialDetailContent';
import {getTutorialDetailByPath} from '@site/src/data/tutorialDetails';

export default function ClawfeedTutorialPage(): ReactNode {
  const item = getTutorialDetailByPath('/tutorials/clawfeed');

  if (!item) {
    return null;
  }

  return (
    <Layout title={item.title} description={item.description}>
      <TutorialArticlePage
        title={item.title}
        description={item.description}
        date={item.date}
        categories={item.categories}
        heroTone={item.tone}
        heroImage={item.image}
      >
        <TutorialDetailContent item={item} />
      </TutorialArticlePage>
    </Layout>
  );
}
