import Layout from '@theme/Layout';

export default function MsCookbookPage() {
  return (
    <Layout title="魔搭紫皮书" description="ModelScope Cookbook：开源模型应用实战">
      <iframe
        title="ModelScope Cookbook 魔搭紫皮书"
        src="/ms-cookbook/index.html#home"
        style={{display: 'block', width: '100%', height: 'calc(100dvh - 60px)', border: 0}}
      />
    </Layout>
  );
}
