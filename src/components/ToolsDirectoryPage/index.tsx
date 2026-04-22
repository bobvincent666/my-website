import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {ToolListSection} from '@site/src/data/contentApi';
import styles from './styles.module.css';

function toneClassName(tone: string) {
  return styles[`tone${tone.charAt(0).toUpperCase()}${tone.slice(1)}`];
}

export default function ToolsDirectoryPage({
  sections,
  total,
}: {
  sections: ToolListSection[];
  total: number;
}): ReactNode {
  const [activeCategoryId, setActiveCategoryId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const syncActiveFromHash = () => {
      const hashId = decodeURIComponent(window.location.hash.replace('#', ''));
      const matched = sections.find((category) => category.id === hashId);
      if (matched) {
        setActiveCategoryId(matched.id);
      }
    };

    syncActiveFromHash();
    window.addEventListener('hashchange', syncActiveFromHash);
    return () => window.removeEventListener('hashchange', syncActiveFromHash);
  }, [sections]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.panel}>
          <aside className={styles.sidebar}>
            <Heading as="h1" className={styles.sidebarTitle}>
              AI工具集
            </Heading>
            <p className={styles.sidebarMeta}>共收录 {sections.length} 个分类，{total} 个工具</p>

            <nav className={styles.categoryNav} aria-label="AI工具分类">
              {sections.map((category) => (
                <a
                  key={category.id}
                  className={
                    category.id === activeCategoryId ? styles.categoryActive : styles.categoryLink
                  }
                  href={`#${category.id}`}
                  onClick={() => setActiveCategoryId(category.id)}
                  aria-current={category.id === activeCategoryId ? 'true' : undefined}
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
            {sections.map((category) => (
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

                {category.items.length > 0 ? (
                  <div className={styles.grid}>
                    {category.items.map((tool) => (
                      <Link key={tool.id} className={styles.card} to={tool.path}>
                        <div className={styles.cardHeader}>
                          <div
                            className={`${styles.logo} ${toneClassName(tool.tone ?? 'blue')}`}>
                            {tool.logoText ?? tool.title.slice(0, 2)}
                          </div>
                          <div className={styles.cardCopy}>
                            <strong className={styles.cardTitle}>{tool.title}</strong>
                            <p className={styles.cardSubtitle}>{tool.summary}</p>
                          </div>
                        </div>
                        <div className={styles.likes}>{tool.categories[0] ?? category.name}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>该分类内容整理中，敬请期待。</div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
