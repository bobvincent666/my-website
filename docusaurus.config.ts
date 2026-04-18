import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '首页',
  tagline: '聚合全网 AI 快讯、技术教程与实用工具集',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'news',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          routeBasePath: 'tutorial-posts',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: '站点 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: '首页', position: 'left', exact: true},
        {to: '/news', label: '全部AI快讯', position: 'left'},
        {to: '/tutorials', label: '技术教程', position: 'left'},
        {to: '/tools', label: 'AI工具集', position: 'left'},
        {to: '/about', label: '关于我们', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: ' ',
          className: 'footer-col-brand',
          items: [
            {
              html: `<a class="footer-brand" href="/">
                      <img class="footer-brand__logo" src="/img/logo.svg" alt="深度空间 Logo" />
                      <span class="footer-brand__name">深度空间</span>
                    </a>`,
            },
            {
              html: `<span>ICP备案：沪ICP备2026012548号</span>`,
            },
            {
              html: `<span>©2026 spaceseek.tech</span>`,
            },
          ],
        },
        {
          title: '内容导航',
          className: 'footer-col-nav',
          items: [
            {label: '全部AI快讯', to: '/news'},
            {label: '技术教程', to: '/tutorials'},
            {label: 'AI工具集', to: '/tools'},
          ],
        },
        {
          title: '站点信息',
          className: 'footer-col-site',
          items: [
            {label: '关于我们', to: '/about'},
            {
              html: `<div class="footer-qrcode">
                      <div class="footer-qrcode__label">二维码</div>
                      <img class="footer-qrcode__image" src="/img/qrcode_for_gh.png" alt="二维码" />
                    </div>`,
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
