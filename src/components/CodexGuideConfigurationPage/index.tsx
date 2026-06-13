import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodexGuideTopicNav from '@site/src/components/CodexGuideTopicNav';
import {
  CODEX_GUIDE_ROUTE,
  getCodexGuideConfigurationRoute,
  getCodexGuideConfigurationSectionBySlug,
} from '@site/src/data/codexGuideTopic';
import {
  getCodexGuideConfigurationPage,
  getCodexGuideConfigurationSidebar,
  type CodexGuideConfigurationPageData,
} from '@site/src/data/codexGuideConfigurationPages';
import styles from '../CodexGuideGuidePage/styles.module.css';

function buildInitialExpandedState(page: CodexGuideConfigurationPageData) {
  const currentSection = getCodexGuideConfigurationSectionBySlug(page.slug);
  const initial: Record<string, boolean> = {};

  for (const section of getCodexGuideConfigurationSidebar()) {
    initial[section.title] = section.title === currentSection?.title;
  }

  return initial;
}

export default function CodexGuideConfigurationPage({slug}: {slug: string}): ReactNode {
  const page = getCodexGuideConfigurationPage(slug);

  if (!page) {
    return null;
  }

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
    buildInitialExpandedState(page),
  );

  useEffect(() => {
    setExpandedSections(buildInitialExpandedState(page));
  }, [page]);

  const toggleSection = (title: string) => {
    setExpandedSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <Layout title={`${page.title} | CodexGuide`} description={page.summary}>
      <div className={styles.page}>
        <CodexGuideTopicNav activeKey="configuration" />

        <div className={`container ${styles.layout}`}>
          <aside className={styles.sidebar}>
            {getCodexGuideConfigurationSidebar().map((section) => {
              const expanded = expandedSections[section.title] ?? false;
              const isCurrentSection = section.items.some((item) => item.slug === page.slug);

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
                        const to = getCodexGuideConfigurationRoute(item.slug);
                        const active = item.slug === page.slug;

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
              <span>Configuration</span>
              <span> / </span>
              <span>{page.title}</span>
            </div>

            <Heading as="h1" className={styles.title}>
              {page.title}
            </Heading>

            <div className={styles.meta}>
              <span>{page.meta.author}</span>
              <span>{page.meta.wordCount}</span>
              <span>{page.meta.readingTime}</span>
            </div>

            <p className={styles.lead}>{page.summary}</p>

            {page.note ? (
              <div className={`${styles.callout} ${page.note.tone === 'warning' ? styles.calloutWarning : styles.calloutTip}`}>
                <strong>{page.note.title}</strong>
                <p>{page.note.body}</p>
              </div>
            ) : null}

            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <Heading as="h2">{section.title}</Heading>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {section.ordered ? (
                  <ol>
                    {section.ordered.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}

                {section.codeBlocks?.map((block, index) => (
                  <div key={`${section.id}-code-${index}`} className={styles.codeBlockWrap}>
                    {block.title ? <div className={styles.codeBlockTitle}>{block.title}</div> : null}
                    <pre className={styles.codeBlock}>
                      <code>{block.code}</code>
                    </pre>
                  </div>
                ))}

                {section.images?.map((image) => (
                  <figure key={image.src} className={styles.figure}>
                    {image.label ? <div className={styles.figureLabel}>{image.label}</div> : null}
                    <img src={image.src} alt={image.alt} className={styles.figureImage} />
                    {image.caption ? <figcaption className={styles.figureCaption}>{image.caption}</figcaption> : null}
                  </figure>
                ))}

                {section.subsections?.map((subsection) => (
                  <div key={subsection.title} className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>{subsection.title}</h3>

                    {subsection.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {subsection.bullets ? (
                      <ul>
                        {subsection.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {subsection.ordered ? (
                      <ol>
                        {subsection.ordered.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    ) : null}

                    {subsection.codeBlocks?.map((block, index) => (
                      <div key={`${subsection.title}-code-${index}`} className={styles.codeBlockWrap}>
                        {block.title ? <div className={styles.codeBlockTitle}>{block.title}</div> : null}
                        <pre className={styles.codeBlock}>
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    ))}

                    {subsection.images?.map((image) => (
                      <figure key={image.src} className={styles.figure}>
                        {image.label ? <div className={styles.figureLabel}>{image.label}</div> : null}
                        <img src={image.src} alt={image.alt} className={styles.figureImage} />
                        {image.caption ? <figcaption className={styles.figureCaption}>{image.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                ))}

                {section.callouts?.map((callout, index) => (
                  <div
                    key={`${section.id}-${index}`}
                    className={`${styles.callout} ${callout.tone === 'warning' ? styles.calloutWarning : styles.calloutTip}`}>
                    {callout.title ? <strong>{callout.title}</strong> : null}
                    <p>{callout.body}</p>
                  </div>
                ))}

                {section.table ? (
                  <table>
                    <thead>
                      <tr>
                        {section.table.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join('|')}>
                          {row.map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </section>
            ))}

            <div className={styles.footerNav}>
              {page.prevSlug ? (
                <Link className={styles.footerNavItem} to={getCodexGuideConfigurationRoute(page.prevSlug)}>
                  <span>上一页</span>
                  <strong>{getCodexGuideConfigurationPage(page.prevSlug)?.title}</strong>
                </Link>
              ) : (
                <span />
              )}

              {page.nextSlug ? (
                <Link className={styles.footerNavItem} to={getCodexGuideConfigurationRoute(page.nextSlug)}>
                  <span>下一页</span>
                  <strong>{getCodexGuideConfigurationPage(page.nextSlug)?.title}</strong>
                </Link>
              ) : null}
            </div>
          </main>

          <aside className={styles.toc}>
            <div className={styles.tocTitle}>此页内容</div>
            <div className={styles.tocLinks}>
              {page.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
