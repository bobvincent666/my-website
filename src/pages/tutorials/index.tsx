import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import RemoteContentState from '@site/src/components/RemoteContentState';
import {getTutorialListData} from '@site/src/data/contentApi';
import {
  isCodexGuideItem,
} from '@site/src/data/codexGuideTopic';
import {useRemoteData} from '@site/src/hooks/useRemoteData';
import styles from './styles.module.css';

export default function TutorialsPage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getTutorialListData(), []);
  const tutorialItems = (data?.items ?? []).filter((item) => !isCodexGuideItem(item));

  return (
    <Layout title="技术教程" description="AI 技术教程与实战文章列表">
      <RemoteContentState loading={loading} error={error} empty={false} />
      {!loading && !error ? (
        <div className={styles.page}>
          <div className="container">
            <div className={styles.breadcrumb}>
              <Link to="/">首页</Link>
              <span> / </span>
              <span>全部文章</span>
            </div>

            <Link
              className={`${styles.featured} ${styles.codexFeatured}`}
              to="/tutorials/ms-cookbook"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(24, 16, 55, 0.9), rgba(24, 16, 55, 0.25)), url('/ms-cookbook/assets/reading-dada-illustrations/05-peeking-lavender.png')",
                backgroundColor: '#a28dd9',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className={styles.featuredInner}>
                <div className={styles.featuredDate}>
                  <span>ModelScope Cookbook</span>
                  <strong>专题课程</strong>
                </div>
                <div className={styles.featuredText}>
                  <Heading as="h1" className={styles.featuredTitle}>
                    魔搭紫皮书 · 开源模型应用实战
                  </Heading>
                  <p className={styles.featuredDesc}>从模型选型、推理、微调与评测，到 RAG、Agent 与 AIGC，循着阅读路径把开源模型用起来。</p>
                </div>
              </div>
            </Link>

            {tutorialItems.length > 0 ? (
              <div className={styles.list}>
                {tutorialItems.map((item) => (
                  <Link key={item.id} className={styles.listItem} to={item.routePath ?? item.path}>
                    <div
                      className={`${styles.thumb} ${styles[`tone${capitalize(item.tone ?? 'blue')}`]}`}
                      style={{
                        backgroundImage: item.coverImage
                          ? `linear-gradient(180deg, rgba(8, 12, 24, 0.1), rgba(8, 12, 24, 0.28)), url('${item.coverImage}')`
                          : undefined,
                      }}
                    />
                    <div className={styles.itemBody}>
                      <Heading as="h2" className={styles.itemTitle}>
                        {item.title}
                      </Heading>
                      <p className={styles.itemDesc}>{item.summary}</p>
                      <div className={styles.itemMeta}>
                        <div className={styles.itemCategories}>
                          {item.categories.map((category) => (
                            <span key={category}>{category}</span>
                          ))}
                        </div>
                        <span className={styles.itemDate}>{item.publishedLabel}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyGeneralList}>
                当前通用教程列表暂无文章，专题内容请从上方入口进入。
              </div>
            )}
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
