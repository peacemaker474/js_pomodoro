import React from 'react';
import dotenv from 'dotenv';
import GlobalStyle from 'styles/GlobalStyles';
import Router from 'Routers/Router';
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
