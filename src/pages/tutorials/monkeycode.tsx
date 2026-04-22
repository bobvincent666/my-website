import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import RemoteContentState from '@site/src/components/RemoteContentState';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import TutorialDetailContent from '@site/src/components/TutorialDetailContent';
import {getTutorialDetailData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

export default function MonkeycodeTutorialPage(): ReactNode {
  const {data: item, loading, error} = useRemoteData(
    () => getTutorialDetailData('/tutorials/monkeycode'),
    [],
  );

  if (loading || error) {
    return <RemoteContentState loading={loading} error={error} empty={false} backTo="/tutorials" />;
  }

  if (!item) {
    return <RemoteContentState loading={false} error={null} empty={true} backTo="/tutorials" />;
  }

  return (
    <Layout title={item.title} description={item.summary}>
      <TutorialArticlePage
        title={item.title}
        description={item.summary}
        date={item.publishedLabel ?? '最新更新'}
        categories={item.categories}
        heroTone={item.tone}
        heroImage={item.coverImage}>
        <TutorialDetailContent item={item} />
      </TutorialArticlePage>
    </Layout>
  );
}
