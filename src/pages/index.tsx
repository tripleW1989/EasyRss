import React, { useEffect } from 'react';
import { Container, GlobalStyle } from './style';
import ToolBar from './ToolBar';
import WebSites from './WebSites';

export default () => {
  useEffect(() => {
    chrome.runtime.sendMessage('init', function(response) {
      console.log(response);
    });
  }, []);
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
