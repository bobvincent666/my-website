import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type TutorialArticlePageProps = {
  title: string;
  description: string;
  date: string;
  categories: string[];
  heroTone?: 'violet' | 'blue' | 'orange';
  heroImage?: string;
  children: ReactNode;
};

export default function TutorialArticlePage({
  title,
  description,
  date,
  categories,
  heroTone = 'blue',
  heroImage,
  children,
}: TutorialArticlePageProps): ReactNode {
  return (
    // <Layout title={title} description={description}>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">首页</Link>
            <span> / </span>
            <Link to="/tutorials">全部文章</Link>
          </div>

          <section
            className={`${styles.hero} ${styles[`hero${capitalize(heroTone)}`]}`}
            style={
              heroImage
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(8, 12, 24, 0.22), rgba(8, 12, 24, 0.64)), url('${heroImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }
                : undefined
            }
          >
            <div className={styles.heroInner}>
              <div className={styles.heroDateBlock}>
                <span>{date}</span>
                <strong>最新文章</strong>
              </div>
              <div className={styles.heroContent}>
                <Heading as="h1" className={styles.heroTitle}>
                  {title}
                </Heading>
                <p className={styles.heroDesc}>{description}</p>
              </div>
            </div>
          </section>

          <article className={styles.article}>
            <div className={styles.metaRow}>
              {categories.map((category) => (
                <span key={category} className={styles.category}>
                  {category}
                </span>
              ))}
              <span className={styles.metaDate}>{date}</span>
            </div>
            <div className={styles.content}>{children}</div>
          </article>
        </div>
      </div>
    // </Layout>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
