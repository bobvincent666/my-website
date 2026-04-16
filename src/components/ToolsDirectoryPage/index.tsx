import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {getToolsByCategory, toolCategories} from '@site/src/data/toolItems';
import styles from './styles.module.css';

function toneClassName(tone: string) {
  return styles[`tone${tone.charAt(0).toUpperCase()}${tone.slice(1)}`];
}

export default function ToolsDirectoryPage(): ReactNode {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.panel}>
          <aside className={styles.sidebar}>
            <Heading as="h1" className={styles.sidebarTitle}>
              AI工具集
            </Heading>
            <p className={styles.sidebarMeta}>共收录 16 个分类，69 个网址</p>

            <nav className={styles.categoryNav} aria-label="AI工具分类">
              {toolCategories.map((category, index) => (
                <a
                  key={category.id}
                  className={index === 0 ? styles.categoryActive : styles.categoryLink}
                  href={`#${category.id}`}
                >
                  {category.name}
                </a>
              ))}
            </nav>

            <button type="button" className={styles.applyButton}>
              申请入驻
            </button>
          </aside>

          <div className={styles.content}>
            {toolCategories.map((category) => {
              const tools = getToolsByCategory(category.id);

              return (
                <section key={category.id} id={category.id} className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitleWrap}>
                      <span className={styles.sectionAccent} />
                      <Heading as="h2" className={styles.sectionTitle}>
                        {category.name}
                      </Heading>
                      {category.shortTabs?.map((tab) => (
                        <span key={tab} className={styles.sectionTab}>
                          {tab}
                        </span>
                      ))}
                    </div>
                    <Link className={styles.moreLink} to={`/tools#${category.id}`}>
                      更多
                    </Link>
                  </div>

                  {tools.length > 0 ? (
                    <div className={styles.grid}>
                      {tools.map((tool) => (
                        <Link key={tool.id} className={styles.card} to={`/tools/detail?id=${tool.id}`}>
                          <div className={styles.cardHeader}>
                            <div className={`${styles.logo} ${toneClassName(tool.tone)}`}>
                              {tool.logoText}
                            </div>
                            <div className={styles.cardCopy}>
                              <strong className={styles.cardTitle}>{tool.name}</strong>
                              <p className={styles.cardSubtitle}>{tool.subtitle}</p>
                            </div>
                          </div>
                          <div className={styles.likes}>点赞 {tool.likes}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>该分类内容整理中，敬请期待。</div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
