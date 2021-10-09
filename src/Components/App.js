import React from 'react';
import GlobalStyle from './GlobalStyles';
import Router from './Router';
import firebase from "./firebase";

function App() {
  console.log(firebase);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
