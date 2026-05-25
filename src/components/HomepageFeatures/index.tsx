import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {HomeData, HomeSection} from '@site/src/data/home';
import styles from './styles.module.css';

function SectionHeader({
  title,
  moreLabel,
  moreTo,
}: {
  title: string;
  moreLabel: string;
  moreTo: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <Link className={styles.moreLink} to={moreTo}>
        {moreLabel}
      </Link>
    </div>
  );
}

function ContentSection({section}: {section: HomeSection}): ReactNode {
  const items = section.id === 'home-news' ? section.items.slice(0, 8) : section.items;

  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title={section.title} moreLabel={section.moreLabel} moreTo={section.moreTo} />
      <div className={styles.contentGrid}>
        {items.map((item) => (
          <Link key={item.id} className={styles.contentCard} to={item.routePath ?? item.path}>
            <div
              className={clsx(styles.cardVisual, styles[`accent${capitalize(item.tone ?? 'blue')}`])}
              style={{
                backgroundImage: item.coverImage
                  ? `linear-gradient(180deg, rgba(8, 12, 24, 0.12), rgba(8, 12, 24, 0.38)), url('${item.coverImage}')`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <span className={styles.visualLabel}>{item.categories[0] ?? section.title}</span>
            </div>
            <div className={styles.cardBody}>
              <Heading as="h3" className={styles.cardTitle}>
                {item.title}
              </Heading>
              <p className={styles.cardExcerpt}>{item.summary}</p>
              <div className={styles.cardMeta}>
                <span>{item.sourceName ?? item.kind}</span>
                <span>{item.publishedLabel}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolsSection({section}: {section: HomeSection}): ReactNode {
  return (
    <section className={clsx(styles.sectionBlock, styles.toolsBlock)}>
      <SectionHeader title={section.title} moreLabel={section.moreLabel} moreTo={section.moreTo} />
      <div className={styles.toolsGrid}>
        {section.items.map((tool) => (
          <Link key={tool.id} className={styles.toolCard} to={tool.routePath ?? tool.path}>
            <div className={styles.toolAvatar}>{tool.logoText}</div>
            <div className={styles.toolBody}>
              <strong>{tool.title}</strong>
              <span>{tool.summary}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function HomepageFeatures({home}: {home: HomeData}): ReactNode {
  return (
    <div className={styles.pageShell}>
      <div className="container">
        <ContentSection section={home.sections.news} />
        <ContentSection section={home.sections.tutorials} />
        <ToolsSection section={home.sections.tools} />
      </div>
    </div>
  );
}
