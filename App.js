import React, { useEffect, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import Main from "./src/Main";
import store from "./src/redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


import { withExpoSnack } from 'nativewind';
const App = () => {

  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default withExpoSnack(App);
