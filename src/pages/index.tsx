import React from 'react';
import { Container, GlobalStyle } from './style';
import ToolBar from './ToolBar';
import WebSites from './WebSites';

export default () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ToolBar />
        <WebSites />
      </Container>
    </>
  );
};
