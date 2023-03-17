import { useEffect, useLayoutEffect } from "react";
import { View, Text, Button, Animated, Easing, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login,token, isloading,haserr } from "../redux/Login/reducer";
import LoaderAnimation from '../lib/LoaderAnimation'
import { fetchApi } from "../lib/FetchAPI";
const LayoutLoader = () => {
  let isLoading = useSelector(isloading)
  let hasErr = useSelector(haserr)
  const dispatch = useDispatch()
  console.log('kaka', hasErr)
  Alert.alert('loi','deo co api nen loi roi')
  if(hasErr){
    
    }
    useLayoutEffect(() => {
      dispatch(login())
    },[])
  return (
    <View className="flex-1 w-screen bg-fuchsia-600 flex justify-center">
      <Text className="font-extrabold text-center text-5xl text-white">
        MYREVIEW
          </Text>
      {isLoading && <LoaderAnimation/>}    
    </View>
  );
};
export default LayoutLoader;
