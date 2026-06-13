import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodexGuideTopicNav from '@site/src/components/CodexGuideTopicNav';
import RemoteContentState from '@site/src/components/RemoteContentState';
import {getTutorialListData} from '@site/src/data/contentApi';
import {
  CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE,
  CODEX_GUIDE_HERO_IMAGE,
  CODEX_GUIDE_PLATFORM_INDEX_ROUTE,
  codexGuideCaseCards,
  codexGuideChecklist,
  codexGuideLearningPaths,
  codexGuideLoopItems,
  codexGuideMetricCards,
  codexGuideTopic,
  groupCodexGuideItems,
  isCodexGuideItem,
} from '@site/src/data/codexGuideTopic';
import {useRemoteData} from '@site/src/hooks/useRemoteData';
import styles from './codex-guide.module.css';

export default function CodexGuidePage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getTutorialListData(), []);
  const topicItems = (data?.items ?? []).filter(isCodexGuideItem);
  const groupedItems = groupCodexGuideItems(topicItems);

  return (
    <Layout title={codexGuideTopic.title} description={codexGuideTopic.subtitle}>
      <RemoteContentState loading={loading} error={error} empty={false} backTo="/tutorials" />
      {!loading && !error ? (
        <div className={styles.page}>
          <CodexGuideTopicNav activeKey="home" />

          <div className="container">
            <section
              id="codex-home"
              className={styles.hero}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98)), url('${CODEX_GUIDE_HERO_IMAGE}')`,
              }}>
              <div className={styles.heroLogo}>
                <div className={styles.heroBadge}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.heroContent}>
                <Heading as="h1" className={styles.heroTitle}>
                  CodexGuide
                </Heading>
                <p className={styles.heroSubtitle}>{codexGuideTopic.subtitle}</p>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryAction} to={CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE}>
                    从学习路线开始
                  </Link>
                  <Link className={styles.secondaryAction} to={CODEX_GUIDE_PLATFORM_INDEX_ROUTE}>
                    选择使用入口
                  </Link>
                  <a className={styles.secondaryAction} href="#codex-cases">
                    浏览实战案例
                  </a>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                这份课程适合谁
              </Heading>
              <p className={styles.sectionLead}>
                CodexGuide 不是命令速查表，而是一套围绕真实工作流组织的实战指南。它要回答三个问题：应该从哪个入口开始，怎样把需求交给 Codex，以及怎样验证交付结果是否可靠。
              </p>
              <div className={styles.metricGrid}>
                {codexGuideMetricCards.map((card) =>
                  card.to ? (
                    <Link key={card.title} to={card.to} className={styles.metricCard} data-tone={card.tone}>
                      <strong>{card.title}</strong>
                      <span>{card.details}</span>
                    </Link>
                  ) : (
                    <a key={card.title} href={card.href} className={styles.metricCard} data-tone={card.tone}>
                      <strong>{card.title}</strong>
                      <span>{card.details}</span>
                    </a>
                  ),
                )}
              </div>
            </section>

            <section id="codex-paths" className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                三条推荐学习路径
              </Heading>
              <p className={styles.sectionLead}>
                不同起点不需要走同一条路。先选择和你当前工作最贴近的路径，再逐步补齐其他能力模块。
              </p>
              <div className={styles.pathGrid}>
                {codexGuideLearningPaths.map((path, index) => (
                  <article key={path.id} className={styles.pathCard}>
                    <span className={styles.pathStep}>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{path.title}</strong>
                    <p>{path.details}</p>
                    <em>{path.audience}</em>
                  </article>
                ))}
              </div>
            </section>

            <section id="codex-surfaces" className={`${styles.section} ${styles.splitSection}`}>
              <div>
                <Heading as="h2" className={styles.sectionTitle}>
                  先选对入口
                </Heading>
                <p className={styles.sectionLead}>
                  Codex 的能力会出现在 App、CLI、Cloud、IDE、ChatGPT 和集成生态里。入口不同，任务节奏不同：本地小步修改适合 CLI，长任务和并行任务适合 Cloud，贴近编辑器的解释与局部修改适合 IDE，跨工具流程适合 App 和插件体系。
                </p>
                <div className={styles.linkRow}>
                  <Link to={CODEX_GUIDE_PLATFORM_INDEX_ROUTE}>查看入口地图</Link>
                  <Link to={CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE}>进入学习路线</Link>
                  <a href="#codex-safety">查看配置与安全边界</a>
                </div>
              </div>
              <div className={styles.surfaceVisual}>
                <div className={styles.surfaceTile}>App</div>
                <div className={styles.surfaceTile}>CLI</div>
                <div className={styles.surfaceTile}>IDE</div>
                <div className={styles.surfaceTile}>Cloud</div>
              </div>
            </section>

            <section id="codex-loop" className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                把一次任务做成闭环
              </Heading>
              <p className={styles.sectionLead}>
                好用的 Codex 不靠花哨 prompt，而靠明确的目标、范围、约束、验证和交付要求。
              </p>
              <div className={styles.loopGrid}>
                {codexGuideLoopItems.map((item) => (
                  <article key={item.title} className={styles.loopCard} data-tone={item.tone}>
                    <strong>{item.title}</strong>
                    <span>{item.details}</span>
                  </article>
                ))}
              </div>
            </section>

            <section id="codex-cases" className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                精选实战场景
              </Heading>
              <p className={styles.sectionLead}>
                案例库不是展示清单，而是一批可改写、可复用的任务样本。你可以把它们替换成自己的仓库、工具和交付要求。
              </p>
              <div className={styles.caseGrid}>
                {codexGuideCaseCards.map((card) => (
                  <a key={card.title} className={styles.caseCard} href={card.href}>
                    <strong>{card.title}</strong>
                    <span>{card.details}</span>
                  </a>
                ))}
              </div>
              <div className={styles.caseSummary}>
                <span>学习路线 {groupedItems.guide.length} 篇</span>
                <span>入口地图 {groupedItems.platform.length} 篇</span>
                <span>配置专题 {groupedItems.configuration.length} 篇</span>
                <span>案例内容 {groupedItems.recipes.length} 篇</span>
              </div>
            </section>

            <section id="codex-safety" className={`${styles.section} ${styles.splitSection} ${styles.reverseSplit}`}>
              <div className={styles.safetyVisual}>
                <div className={styles.safetyFrame}>
                  <span>AGENTS.md</span>
                  <span>Sandbox</span>
                  <span>Approvals</span>
                  <span>Playbook</span>
                </div>
              </div>
              <div>
                <Heading as="h2" className={styles.sectionTitle}>
                  为真实项目做准备
                </Heading>
                <p className={styles.sectionLead}>
                  当 Codex 进入团队项目，真正重要的是边界、复现和共识。每次任务都应该能追溯输入、输出、验证依据和风险说明。
                </p>
                <ul className={styles.checkList}>
                  {codexGuideChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="codex-final" className={`${styles.section} ${styles.finalSection}`}>
              <Heading as="h2" className={styles.sectionTitle}>
                建议从这里开始
              </Heading>
              <p className={styles.sectionLead}>
                如果你是第一次接触 Codex，先完成桌面 App 路线的前几节；如果你已经在项目里写代码，直接从 CLI 安装与第一次任务开始。等第一轮跑通后，再回头补配置、安全和案例模块。
              </p>
              <div className={styles.finalActions}>
                <Link className={styles.primaryAction} to={CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE}>
                  进入学习路线
                </Link>
                <a className={styles.secondaryAction} href="#codex-safety">
                  查看配置专题
                </a>
                <a className={styles.secondaryAction} href="#codex-final">
                  参与共建
                </a>
              </div>
              <div className={styles.tipBox}>
                <strong>最后核对</strong>
                <span>涉及功能、价格、可用性和安全策略时，仍应优先以 OpenAI 官方资料为准。</span>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
