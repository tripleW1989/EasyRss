import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '*', component: '@/pages/index' }],

  proxy: {
    '/ruanyifeng': {
      target: 'http://www.ruanyifeng.com',
      changeOrigin: true,
      pathRewrite: { '^/ruanyifeng': '' },
    },
    '/75': {
      target: 'https://weekly.75.team',
      changeOrigin: true,
      pathRewrite: { '^/75': '' },
    },
    '/test': {
      target: 'http://47.115.175.47:4000',
      changeOrigin: true,
      pathRewrite: { '^/test': '' },
    },
  },
  request: {
    dataField: '',
  },
});
