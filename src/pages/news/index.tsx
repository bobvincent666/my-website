import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import NewsFeedPage from '@site/src/components/NewsFeedPage';

export default function NewsPage(): ReactNode {
  return (
    <Layout title="全网AI快讯" description="最新 AI 行业动态与快讯列表">
      <NewsFeedPage />
    </Layout>
  );
}
