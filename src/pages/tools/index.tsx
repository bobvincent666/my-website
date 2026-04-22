import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import RemoteContentState from '@site/src/components/RemoteContentState';
import ToolsDirectoryPage from '@site/src/components/ToolsDirectoryPage';
import {getToolListData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

export default function ToolsPage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getToolListData(), []);

  return (
    <Layout title="AI工具集" description="AI 工具导航、分类与产品入口集合">
      <RemoteContentState loading={loading} error={error} empty={!data?.sections.length} />
      {data?.sections?.length ? (
        <ToolsDirectoryPage sections={data.sections} total={data.total} />
      ) : null}
    </Layout>
  );
}
