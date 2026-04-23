import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import NewsFeedPage from '@site/src/components/NewsFeedPage';
import RemoteContentState from '@site/src/components/RemoteContentState';
import {getNewsListItems} from '@site/src/data/adapters/newsAdapter';
import {getNewsListData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

export default function NewsPage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getNewsListData(), []);
  const items = data?.items?.length ? data.items : getNewsListItems();
  const isEmpty = items.length === 0;

  return (
    <Layout title="全部AI快讯" description="最新 AI 行业动态与快讯列表">
      <RemoteContentState loading={loading} error={error} empty={isEmpty} />
      {!isEmpty ? <NewsFeedPage items={items} /> : null}
    </Layout>
  );
}
