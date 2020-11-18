import React, { useState } from 'react';
import { Collapse, List, Tag } from 'antd';
import { useModel } from 'umi';
import ArticleItem from '@/pages/Article';
import { WebSite } from '@/models/useWebSites';
import { Container } from './style';
const unReadCount = (website: WebSite) =>
  website.items.reduce((a, b) => a + (b.read ? 0 : 1), 0);
const WebSites = () => {
  const { websites, updateTime, setWebAllRead } = useModel(
    'useWebSites',
    models => ({
      websites: models.websites,
      updateTime: models.updateTime,
      setWebAllRead: models.setWebAllRead,
    }),
  );
  const [key, setKey] = useState(0);
  return (
    <Collapse
      accordion
      key={updateTime}
      activeKey={key}
      onChange={key => setKey(key as any)}
    >
      {websites.map((website, idx) => (
        <Container
          header={
            <div>
              {`${website.title}  `}{' '}
              <Tag color="#87d068" onClick={() => setWebAllRead(idx)}>
                {unReadCount(website)}
              </Tag>
            </div>
          }
          key={idx}
        >
          <List
            dataSource={website.items}
            size="small"
            key={idx}
            renderItem={(item, index) => (
              <ArticleItem
                {...item}
                webIndex={idx}
                articleIndex={index}
                key={index}
              ></ArticleItem>
            )}
          ></List>
        </Container>
      ))}
    </Collapse>
  );
};
export default WebSites;
