import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import {getNewsItemById} from '@site/src/data/newsItems';

function NewsDetailFallback(): ReactNode {
  return (
    <TutorialArticlePage
      title="未找到新闻详情"
      description="当前新闻参数不存在或已失效。"
      date="请返回列表页重试"
      categories={['全网AI快讯']}
      heroTone="blue"
    >
      <p>当前新闻内容没有找到，可能是跳转参数缺失或对应数据已经调整。</p>
      <p>
        <Link to="/news">返回全网AI快讯</Link>
      </p>
    </TutorialArticlePage>
  );
}

export default function NewsDetailPage(): ReactNode {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const item = getNewsItemById(params.get('id'));

  if (!item) {
    return <NewsDetailFallback />;
  }

  return (
    <TutorialArticlePage
      title={item.title}
      description={item.excerpt}
      date={`${item.month}${item.day}日 ${item.time}`}
      categories={item.categories}
      heroTone="blue"
    >
      <p>{item.excerpt}</p>
      <p>来源：{item.source}</p>
      {item.detail.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        <Link to="/news">返回全网AI快讯</Link>
      </p>
    </TutorialArticlePage>
  );
}
