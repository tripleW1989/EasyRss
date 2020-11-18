import { Button } from 'antd';
import React, { FC } from 'react';
import { useModel } from 'umi';
interface ReadButtonProps {
  read: boolean;
  id: string;
  articleIndex: number;
  webIndex: number;
}
const ReadButton: FC<ReadButtonProps> = ({
  read,
  articleIndex,
  id,
  webIndex,
}) => {
  const { setRead } = useModel('useWebSites', model => ({
    setRead: model.setRead,
  }));
  return (
    <Button
      size="small"
      type={read ? 'dashed' : 'primary'}
      onClick={e => {
        e.stopPropagation();
        setRead(webIndex, articleIndex);
      }}
    >
      {read ? '已读' : '未读'}
    </Button>
  );
};
export default ReadButton;
