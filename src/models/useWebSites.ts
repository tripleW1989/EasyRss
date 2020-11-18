import storage from '@/db';
import { useState, useCallback, useEffect } from 'react';

export interface Article {
  read?: boolean;
  description: string;
  content: { text: string };
  id: string;
  guid: string;
  link: string | { href: string };
  pubdate: Date;
  published: Date;
  title: string;
  webIndex: number; // 父index
  articleIndex: number; // 子Index
}
export interface WebSite {
  description: string; //'领略前端技术，阅读奇舞周刊';
  feedLink: string;
  link: string; //'https://weekly.75.team';
  title: string; //'奇舞周刊';
  items: Article[];
  updated: string;
}
export default function useWebsite() {
  const [websites, setArticles] = useState<WebSite[]>([]);
  console.log('websites: ', websites);
  const [updateTime, setUpdateTime] = useState(0);
  const [unReadCount, setUnReadCount] = useState(0);

  const addWebsite = (feedLink: string, website: WebSite) => {
    if (
      websites
        .map(web => {
          return web.link;
        })
        .includes(website.link)
    ) {
      return alert('网站已存在');
    }
    alert(`${website.title} 添加成功`);
    setArticles([...websites, { ...website, feedLink }]);
  };

  const setRead = (
    webIndex: number,
    articleIndex: number,
    isRead: boolean = !websites[webIndex].items[articleIndex].read,
  ) => {
    websites[webIndex].items[articleIndex].read = isRead;

    setArticles([...websites]);
    setUpdateTime(+new Date());
  };
  const setAllRead = () => {
    let newWebsites = websites.map(website => {
      return {
        ...website,
        items: website.items.map(item => {
          return { ...item, read: true };
        }),
      };
    });
    setArticles(newWebsites);
    setUpdateTime(+new Date());
  };
  const setWebAllRead = (websiteIndex: number) => {
    let newWebsites = websites.map((website, index) => {
      if (websiteIndex !== index) {
        return website;
      }
      return {
        ...website,
        items: website.items.map(item => {
          return { ...item, read: true };
        }),
      };
    });
    setArticles(newWebsites);
    setUpdateTime(+new Date());
  };
  useEffect(() => {
    storage.getItem('websites', (err: any, webs = '[]') => {
      setArticles(JSON.parse(webs));
    });
  }, []);

  useEffect(() => {
    // 持久化存储
    storage.setItem('websites', JSON.stringify(websites));

    // 计算未读
    let unRead = 0;
    websites.map(website => {
      return website.items.map(item => {
        if (!item.read) {
          unRead++;
        }
      });
    });
    setUnReadCount(unRead);
    chrome?.browserAction.setBadgeText({ text: `${unRead}` });
  }, [websites.length, updateTime]);

  return {
    websites,
    addWebsite,
    updateTime,
    setRead,
    setAllRead,
    setWebAllRead,
    unReadCount,
  };
}
