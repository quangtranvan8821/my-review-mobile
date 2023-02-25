import { SafeAreaView, StyleSheet } from "react-native";
import ClockApp from "./components/ClockApp";
import React from "react";
import PostItem from "./components/post/PostItem";

export default Main = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <ClockApp /> */}
      <PostItem />
    </SafeAreaView>
  );
};
