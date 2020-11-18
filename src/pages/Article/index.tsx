import React, { FC } from 'react';
import { Article } from '@/models/useWebSites';
import { parseCData } from '@/utils';
import { List, Tooltip } from 'antd';
import { Item } from './stylet';
import Dayjs from 'dayjs';
import ReadButton from '../ReadButton';
import { useModel } from 'umi';
const ArticleItem: FC<Article> = ({
  title,
  link,
  read,
  description,
  pubdate,
  published,
  content,
  id,
  guid,
  articleIndex,
  webIndex,
}) => {
  const { setRead } = useModel('useWebSites', model => ({
    setRead: model.setRead,
  }));
  return (
    <Item
      extra={
        <ReadButton
          read={!!read}
          id={id || guid}
          articleIndex={articleIndex}
          webIndex={webIndex}
        />
      }
      style={{ maxHeight: 100, overflow: 'hidden' }}
      onClick={() => {
        setRead(webIndex, articleIndex, true);
      }}
    >
      <List.Item.Meta
        title={<a target="_blank" href={(link as any).href || link}>{parseCData(title)}</a>}
        description={Dayjs(pubdate || published).format('YYYY-MM-DD HH:MM')}
      />
    </Item>
  );
};

export default ArticleItem;
