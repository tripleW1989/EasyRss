import styled from 'styled-components';
import { Collapse } from 'antd';
export const Container = styled(Collapse.Panel)`
  && .ant-collapse-header {
    padding: 5px;
    padding-left: 40px;
  }
  && .ant-collapse-arrow {
    top: 10px !important;
  }
  && .ant-collapse-content-box {
    padding: 0;
  }
`;
