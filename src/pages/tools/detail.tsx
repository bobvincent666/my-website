import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import RemoteContentState from '@site/src/components/RemoteContentState';
import ToolDetailPage from '@site/src/components/ToolDetailPage';
import {getToolDetailData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

function ToolDetailFallback(): ReactNode {
  return (
    <Layout title="未找到工具详情" description="当前工具参数不存在或已失效。">
      <div style={{padding: '2rem 0'}}>
        <div className="container">
          <p>当前工具内容没有找到，可能是跳转参数缺失或对应数据已经调整。</p>
          <p>
            <Link to="/tools">返回 AI工具集</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default function ToolsDetailPage(): ReactNode {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const {data: item, loading, error} = useRemoteData(
    () => (id ? getToolDetailData(id) : Promise.resolve(null)),
    [id],
  );

  if (loading || error) {
    return <RemoteContentState loading={loading} error={error} empty={false} backTo="/tools" />;
  }

  if (!item) {
    return <ToolDetailFallback />;
  }

  return (
    <Layout title={item.title} description={item.summary}>
      <ToolDetailPage
        title={item.title}
        categoryName={item.categoryName}
        description={item.description}
        highlights={item.highlights}
        url={item.website}
      />
    </Layout>
  );
}
