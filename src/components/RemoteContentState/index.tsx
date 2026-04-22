import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

type RemoteContentStateProps = {
  loading: boolean;
  error: Error | null;
  empty: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  backTo?: string;
};

export default function RemoteContentState({
  loading,
  error,
  empty,
  emptyTitle = '内容加载中',
  emptyDescription = '请稍候，正在获取最新数据。',
  backTo,
}: RemoteContentStateProps): ReactNode {
  if (loading) {
    return (
      <div style={{padding: '2rem 0'}}>
        <div className="container">
          <p>{emptyTitle}</p>
          <p>{emptyDescription}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{padding: '2rem 0'}}>
        <div className="container">
          <p>内容加载失败。</p>
          <p>{error.message}</p>
          {backTo ? (
            <p>
              <Link to={backTo}>返回上一页</Link>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div style={{padding: '2rem 0'}}>
        <div className="container">
          <p>当前暂无可展示内容。</p>
          {backTo ? (
            <p>
              <Link to={backTo}>返回上一页</Link>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return null;
}
