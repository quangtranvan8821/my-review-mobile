import { SafeAreaView, StyleSheet } from "react-native";
import ClockApp from "./ClockApp";
import React from "react";

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
      <ClockApp />
    </SafeAreaView>
  );
};
