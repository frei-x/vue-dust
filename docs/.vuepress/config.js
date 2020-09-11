module.exports = {
  base: '/',
  title: 'Vue-Dust',
  description: 'vue3 组合 api 库',
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [1, 2, 3],
    },
  },
  themeConfig: {
    sidebar: ['/', '/page-a', ['/page-b', 'Explicit link text']],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'gitee', link: 'https://gitee.com/stringify' },
    ],
  },
};
