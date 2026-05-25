import type {ReactNode} from 'react';
import styles from './styles.module.css';

type TutorialMarkdownContentProps = {
  markdown: string;
};

type MarkdownBlock =
  | {type: 'heading'; level: 2 | 3 | 4; text: string}
  | {type: 'paragraph'; text: string}
  | {type: 'ul'; items: string[]}
  | {type: 'ol'; items: string[]}
  | {type: 'blockquote'; text: string}
  | {type: 'code'; code: string}
  | {type: 'hr'};

export default function TutorialMarkdownContent({
  markdown,
}: TutorialMarkdownContentProps): ReactNode {
  const blocks = parseMarkdown(markdown);

  return (
    <div className={styles.markdown}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function renderBlock(block: MarkdownBlock, index: number): ReactNode {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return <h2 key={index}>{renderInline(block.text)}</h2>;
      }
      if (block.level === 3) {
        return <h3 key={index}>{renderInline(block.text)}</h3>;
      }
      return <h4 key={index}>{renderInline(block.text)}</h4>;
    case 'paragraph':
      return <p key={index}>{renderInline(block.text)}</p>;
    case 'ul':
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index}>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case 'blockquote':
      return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
    case 'code':
      return (
        <pre key={index}>
          <code>{block.code}</code>
        </pre>
      );
    case 'hr':
      return <hr key={index} />;
    default:
      return null;
  }
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n');
  const blocks: MarkdownBlock[] = [];

  let paragraphLines: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push({type: 'paragraph', text: paragraphLines.join(' ').trim()});
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listType && listItems.length) {
      blocks.push({type: listType, items: [...listItems]});
    }
    listType = null;
    listItems = [];
  };

  const flushCode = () => {
    if (codeLines.length) {
      blocks.push({type: 'code', code: codeLines.join('\n')});
      codeLines = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flushParagraph();
      flushList();
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({type: 'hr'});
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = Math.min(Math.max(headingMatch[1].length, 2), 4) as 2 | 3 | 4;
      blocks.push({type: 'heading', level, text: headingMatch[2].trim()});
      continue;
    }

    const blockquoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph();
      flushList();
      blocks.push({type: 'blockquote', text: blockquoteMatch[1].trim()});
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ul') {
        flushList();
      }
      listType = 'ul';
      listItems.push(unorderedMatch[1].trim());
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ol') {
        flushList();
      }
      listType = 'ol';
      listItems.push(orderedMatch[1].trim());
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();
  if (inCodeBlock) {
    flushCode();
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  const pattern =
    /(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      result.push(
        <a key={`${match.index}-link`} href={match[3]} target="_blank" rel="noreferrer">
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      result.push(<code key={`${match.index}-code`}>{match[5]}</code>);
    } else if (match[6]) {
      result.push(<strong key={`${match.index}-strong`}>{match[7]}</strong>);
    } else if (match[8]) {
      result.push(<em key={`${match.index}-em`}>{match[9]}</em>);
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}
