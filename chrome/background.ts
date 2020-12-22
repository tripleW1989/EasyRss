import storage from '../src/db';
import { Article, WebSite } from '../src/models/useWebSites';
import axios from 'axios';
import Feedme from 'feedme';
const refreshWebSites = () => {
  storage.getItem('websites', async (err: any, webs: string = '[]') => {
    if (!err) {
      let websites: WebSite[] = JSON.parse(webs);
      const newWebSites = await Promise.all(
        (websites || []).map(async web => {
          try {
            const { data } = await axios.get(web.feedLink);
            // @ts-ignore
            const parser = new Feedme(true);
            parser.on('error', (e: any) => {
              return alert('添加失败');
            });

            parser.write(data);

            const result = parser.done();
            if (result?.title) {
              return {
                ...result,
                feedLink: web.feedLink,
                items: result.items.map((item: Article) => {
                  const target = findTargetArticle(
                    web.items,
                    (item.link as any).href || item.link,
                  );
                  return { ...item, read: target?.read };
                }),
              };
            }
          } catch (e) {
            console.error('输入的地址可能有误', e);
            return web;
          }
        }),
      );
      storage.setItem('websites', JSON.stringify(newWebSites));
    }
  });
};
setTimeout(() => {
  refreshWebSites();
}, 1000 * 20);
// }, 1000 * 60 * 5);
const findTargetArticle = (articles: Article[], url: string) => {
  return articles.find(article => {
    return (article.link as any).href || article.link === url;
  });
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.

  if (request === 'init') {
    console.log('界面唤醒');
    refreshWebSites();
  }
  sendResponse(true);
  return true;
});
refreshWebSites();
