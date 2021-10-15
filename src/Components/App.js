import React from 'react';
import dotenv from 'dotenv';
import GlobalStyle from './GlobalStyles';
import Router from './Router';
dotenv.config();

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
