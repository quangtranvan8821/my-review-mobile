import React, { useLayoutEffect } from "react";
import { Provider } from "react-redux";
import Main from "./src/Main";
import store from "./src/redux";
import * as SecureStore from 'expo-secure-store';

import { withExpoSnack } from 'nativewind';
const App = () => {
  // useLayoutEffect(() => {
  //   (async () => {
  //     await SecureStore.setItemAsync('token', null);
  //   })()
  // },[])
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default withExpoSnack(App);
