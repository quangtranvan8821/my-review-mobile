import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ClockApp = () => {
  const [time, setTime] = useState(new Date());
  function updateTime() {
    setTime(new Date());
  }
  setInterval(updateTime, 1000);
  
  return (
    <View style={styles.container}>
      <Text>{time.toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "blue",
    width: 150,
    height: 150,
    borderRadius:150,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClockApp;
