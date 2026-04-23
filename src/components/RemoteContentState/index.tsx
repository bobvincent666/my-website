import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type RemoteContentStateProps = {
  loading: boolean;
  error: Error | null;
  empty: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  backTo?: string;
};

type StateContent = {
  title: string;
  description: string;
  showReload: boolean;
};

function getStateContent(
  loading: boolean,
  error: Error | null,
  empty: boolean,
  emptyTitle: string,
  emptyDescription: string,
): StateContent | null {
  if (loading) {
    return {
      title: emptyTitle,
      description: emptyDescription,
      showReload: false,
    };
  }

  if (error) {
    return {
      title: '页面加载失败',
      description: '网络似乎出了点问题，请检查网络连接后重试',
      showReload: true,
    };
  }

  if (empty) {
    return {
      title: '当前暂无内容',
      description: '相关数据暂时还没有准备好，可以稍后再回来看看',
      showReload: false,
    };
  }

  return null;
}

export default function RemoteContentState({
  loading,
  error,
  empty,
  emptyTitle = '内容加载中',
  emptyDescription = '请稍候，正在获取最新数据。',
  backTo,
}: RemoteContentStateProps): ReactNode {
  const content = getStateContent(loading, error, empty, emptyTitle, emptyDescription);
  const illustrationUrl = useBaseUrl('/img/error-illustration.png');
  const brandUrl = useBaseUrl('/img/brand.png');

  if (!content) {
    return null;
  }

  return (
    <section className={styles.statePage}>
      <div className={styles.brandWrap}>
        <img className={styles.brand} src={brandUrl} alt="Spaceseek" />
      </div>

      <div className={styles.center}>
        <img className={styles.illustration} src={illustrationUrl} alt={content.title} />
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>

        <div className={styles.actions}>
          {content.showReload ? (
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
            >
              <span className={styles.reloadIcon} aria-hidden="true">
                ↻
              </span>
              <span>重新加载</span>
            </button>
          ) : null}

          {!content.showReload && backTo ? (
            <Link className={styles.secondaryLink} to={backTo}>
              返回上一页
            </Link>
          ) : null}
        </div>

        <div className={styles.footerNote}>
          <span className={styles.line} />
          <span className={styles.star}>✦</span>
          <span className={styles.footerText}>spaceseek，将探索AI宇宙无限可能</span>
          <span className={styles.star}>✦</span>
          <span className={styles.line} />
        </div>

        {error?.message && content.showReload ? (
          <p className={styles.errorMeta}>{error.message}</p>
        ) : null}
      </div>
    </section>
  );
}
