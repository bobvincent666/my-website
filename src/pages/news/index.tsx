import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import NewsFeedPage from '@site/src/components/NewsFeedPage';
import RemoteContentState from '@site/src/components/RemoteContentState';
import {getNewsListData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

export default function NewsPage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getNewsListData(), []);

  return (
    <Layout title="全网AI快讯" description="最新 AI 行业动态与快讯列表">
      <RemoteContentState loading={loading} error={error} empty={!data?.items.length} />
      {data?.items?.length ? <NewsFeedPage items={data.items} /> : null}
    </Layout>
  );
}
