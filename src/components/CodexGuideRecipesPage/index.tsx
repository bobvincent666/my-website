import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodexGuideTopicNav from '@site/src/components/CodexGuideTopicNav';
import {CODEX_GUIDE_ROUTE} from '@site/src/data/codexGuideTopic';
import {
  getCodexGuideRecipePageMeta,
  getCodexGuideRecipesRoute,
  getCodexGuideRecipesSectionBySlug,
  getCodexGuideRecipesSidebar,
  type CodexGuideRecipesDocumentComponent,
} from '@site/src/data/codexGuideRecipesPages';
import styles from '../CodexGuideGuidePage/styles.module.css';

function buildInitialExpandedState(slug: string) {
  const currentSection = getCodexGuideRecipesSectionBySlug(slug);
  const initial: Record<string, boolean> = {};

  for (const section of getCodexGuideRecipesSidebar()) {
    initial[section.title] = section.title === currentSection?.title;
  }

  return initial;
}

export default function CodexGuideRecipesPage({
  slug,
  Content,
}: {
  slug: string;
  Content: CodexGuideRecipesDocumentComponent;
}): ReactNode {
  const page = getCodexGuideRecipePageMeta(slug);

  if (!page) {
    return null;
  }

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
    buildInitialExpandedState(slug),
  );

  useEffect(() => {
    setExpandedSections(buildInitialExpandedState(slug));
  }, [slug]);

  const toggleSection = (title: string) => {
    setExpandedSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <Layout title={`${page.title} | CodexGuide`}>
      <div className={styles.page}>
        <CodexGuideTopicNav activeKey="recipes" />

        <div className={`container ${styles.layout} ${styles.layoutNoToc}`}>
          <aside className={styles.sidebar}>
            {getCodexGuideRecipesSidebar().map((section) => {
              const expanded = expandedSections[section.title] ?? false;
              const isCurrentSection = section.items.some((item) => item.slug === slug);

              return (
                <div key={section.title} className={styles.sidebarSection}>
                  <button
                    type="button"
                    className={`${styles.sidebarToggle} ${isCurrentSection ? styles.sidebarToggleActive : ''}`}
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={expanded}>
                    <span>{section.title}</span>
                    <span className={`${styles.sidebarChevron} ${expanded ? styles.sidebarChevronOpen : ''}`}>{'>'}</span>
                  </button>

                  {expanded ? (
                    <ul className={styles.sidebarLinks}>
                      {section.items.map((item) => {
                        const to = getCodexGuideRecipesRoute(item.slug);
                        const active = item.slug === slug;

                        return (
                          <li key={item.slug}>
                            <Link to={to} className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ''}`}>
                              <span>{item.label}</span>
                              <span>{'>'}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </aside>

          <main className={styles.main}>
            <div className={styles.breadcrumb}>
              <Link to={CODEX_GUIDE_ROUTE}>CodexGuide</Link>
              <span> / </span>
              <span>Recipes</span>
              <span> / </span>
              <span>{page.title}</span>
            </div>

            <article className={styles.recipeDocument}>
              <Content />
            </article>

            <div className={styles.footerNav}>
              {page.prevSlug ? (
                <Link className={styles.footerNavItem} to={getCodexGuideRecipesRoute(page.prevSlug)}>
                  <span>上一页</span>
                  <strong>{getCodexGuideRecipePageMeta(page.prevSlug)?.title}</strong>
                </Link>
              ) : (
                <span />
              )}

              {page.nextSlug ? (
                <Link className={styles.footerNavItem} to={getCodexGuideRecipesRoute(page.nextSlug)}>
                  <span>下一页</span>
                  <strong>{getCodexGuideRecipePageMeta(page.nextSlug)?.title}</strong>
                </Link>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
