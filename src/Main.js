import { SafeAreaView,Text} from 'react-native';
import React from "react";
import PostItem from "./components/post/PostItem";
import LayoutLoader from './components/LayoutLoader';
export default Main = () => {
  return (
    <SafeAreaView className="bg-slate-600 flex-1 items-center justify-center">
       <LayoutLoader/>
    </SafeAreaView>
  );
};
