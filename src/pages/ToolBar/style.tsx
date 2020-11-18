import styled from 'styled-components';
import { PageHeader } from 'antd';
export const ToolBarContainer = styled(PageHeader)`
  .ant-page-header-heading-title {
    font-size: 16px;
  }
  .ant-page-header-content {
    padding-top: 0px;
  }
  .ant-page-header-heading-sub-title {
    font-size: 10px;
  }
  &.ant-page-header {
    padding: 8px !important;
  }
`;
