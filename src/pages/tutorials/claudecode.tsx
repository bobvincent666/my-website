import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TutorialArticlePage from '@site/src/components/TutorialArticlePage';
import {getTutorialItemByLink} from '@site/src/data/tutorialItems';
import ClaudeCodeContent from '@site/blog/Claude-Code.md';

export default function TutorialsClaudecodePage(): ReactNode {
  const item = getTutorialItemByLink('/tutorials/claudecode');

  return (
    <Layout
      title="Claude Code Guide"
      description="A practical guide to Claude Code for developer workflows."
    >
      <TutorialArticlePage
        title="Claude Code: an AI coding assistant for faster development workflows"
        description="A structured long-form tutorial covering Claude Code concepts, usage patterns, and practical workflow ideas."
        date={item?.date ?? '2026-02-07'}
        categories={item?.categories ?? ['Open Source']}
        heroTone={item?.tone ?? 'orange'}
        heroImage={item?.image}
      >
        <ClaudeCodeContent />
      </TutorialArticlePage>
    </Layout>
  );
}
