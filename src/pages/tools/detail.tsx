import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import ToolDetailPage from '@site/src/components/ToolDetailPage';
import {getToolById} from '@site/src/data/toolItems';

function ToolDetailFallback(): ReactNode {
  return (
    <Layout title="未找到工具详情" description="当前工具参数不存在或已失效">
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
  const item = getToolById(params.get('id'));

  if (!item) {
    return <ToolDetailFallback />;
  }

  return (
    <Layout title={item.name} description={item.summary}>
      <ToolDetailPage
        title={item.name}
        categoryName={item.categoryName}
        description={item.description}
        highlights={item.highlights}
        url={item.url}
      />
    </Layout>
  );
}
