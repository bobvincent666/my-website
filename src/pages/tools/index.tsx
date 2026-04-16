import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import ToolsDirectoryPage from '@site/src/components/ToolsDirectoryPage';

export default function ToolsPage(): ReactNode {
  return (
    <Layout title="AI工具集" description="AI 工具导航、分类与产品入口集合">
      <ToolsDirectoryPage />
    </Layout>
  );
}
