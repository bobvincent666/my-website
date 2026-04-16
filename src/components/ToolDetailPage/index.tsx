import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ToolDetailPageProps = {
  title: string;
  categoryName: string;
  description: string;
  highlights: string[];
  url: string;
};

export default function ToolDetailPage({
  title,
  categoryName,
  description,
  highlights,
  url,
}: ToolDetailPageProps): ReactNode {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span>&gt;</span>
          <Link to="/tools">AI工具集</Link>
          <span>&gt;</span>
          <span>{categoryName}</span>
          <span>&gt;</span>
          <span>{title}</span>
        </div>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.actions}>
            <button type="button" className={styles.reportButton}>
              举报
            </button>
            <a className={styles.visitButton} href={url} target="_blank" rel="noreferrer">
              访问网站
            </a>
          </div>
        </div>

        <div className={styles.article}>
          <p className={styles.description}>{description}</p>

          <h2 className={styles.sectionTitle}>五大核心优势构建技术护城河</h2>
          <ol className={styles.list}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
