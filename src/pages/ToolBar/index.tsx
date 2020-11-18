import React, { useState } from 'react';
import { Modal, Button, Input, message, Badge, Popconfirm } from 'antd';
import { ToolBarContainer } from './style';
// @ts-ignore
import Feedme from 'feedme';

import { getHtml } from './service';
import { useToggle } from 'ahooks';
import { useModel } from 'umi';
const addRss = async (url: string, addWebsite: Function) => {
  // 获取当前地址, 如果是订阅源
  // https://weekly.75.team/rss

  if (url) {
    // 这里再议
    // url = e.clipboardData.getData('Text');
  }

  const html = await getHtml(url);

  const parser = new Feedme(true);
  parser.on('error', (e: any) => {
    return alert('添加失败');
  });

  parser.write(html);

  const result = parser.done();
  if (result?.title) {
    addWebsite(url, result);
  }
};

const ToolBar = () => {
  const { addWebsite, unReadCount, setAllRead } = useModel(
    'useWebSites',
    model => ({
      addWebsite: model.addWebsite,
      unReadCount: model.unReadCount,
      setAllRead: model.setAllRead,
    }),
  );
  return (
    <ToolBarContainer
      style={{ fontSize: 14 }}
      ghost={false}
      title="简单RSS"
      subTitle="Easy-RSS"
      avatar={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
      extra={[
        <Popconfirm
          title="确认全部已读?"
          onConfirm={setAllRead}
          okText="Yes"
          cancelText="No"
        >
          <Badge count={unReadCount} key={0} size="small" overflowCount={99}>
            <Button key="0" size="small">
              全部已读
            </Button>
          </Badge>
        </Popconfirm>,
        <Button
          key="1"
          type="primary"
          size="small"
          onClick={() => {
            const url = prompt('请输入Feed', '地址');
            if (url !== null && url !== '') {
              addRss(url, addWebsite);
            }
          }}
        >
          添加源
        </Button>,
      ]}
    ></ToolBarContainer>
  );
};
export default ToolBar;
