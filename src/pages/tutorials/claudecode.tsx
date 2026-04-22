import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import RemoteContentState from '@site/src/components/RemoteContentState';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import {getTutorialListData} from '@site/src/data/contentApi';
import {useRemoteData} from '@site/src/hooks/useRemoteData';
import ClaudeCodeContent from '@site/blog/Claude-Code.md';

export default function TutorialsClaudecodePage(): ReactNode {
  const {data, loading, error} = useRemoteData(() => getTutorialListData(), []);
  const item = data?.items.find((entry) => entry.path === '/tutorials/claudecode');

  if (loading || error) {
    return <RemoteContentState loading={loading} error={error} empty={false} backTo="/tutorials" />;
  }

  return (
    <Layout
      title="Claude Code Guide"
      description="A practical guide to Claude Code for developer workflows.">
      <TutorialArticlePage
        title="Claude Code: an AI coding assistant for faster development workflows"
        description="A structured long-form tutorial covering Claude Code concepts, usage patterns, and practical workflow ideas."
        date={item?.publishedLabel ?? '2026-02-07'}
        categories={item?.categories ?? ['Open Source']}
        heroTone={item?.tone ?? 'orange'}
        heroImage={item?.coverImage}>
        <ClaudeCodeContent />
      </TutorialArticlePage>
    </Layout>
  );
}
