import { SafeAreaView,Text} from 'react-native';
import ClockApp from "./components/ClockApp";
import React from "react";
import PostItem from "./components/post/PostItem";

export default Main = () => {


  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-neutral-600">
      <Text className="text-3xl font-bold underline">hihii</Text>
      {/* <ClockApp /> */}
      <PostItem />
    </SafeAreaView>
  );
};
