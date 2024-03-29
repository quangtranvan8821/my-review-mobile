import React, { useEffect, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import Main from "./src/Main";
import store from "./src/redux";
import { UIManager, Platform } from "react-native";

import { withExpoSnack } from "nativewind";
const App = () => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default withExpoSnack(App);
