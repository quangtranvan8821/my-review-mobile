import { View, Text, Button, TextInput,Alert,SafeAreaView } from "react-native";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isloading, haserr, login, token } from "../../redux/Auth/reducer";
import { useNavigation } from "@react-navigation/native";
import LoaderAnimation from '../../lib/LoaderAnimation'
import PostItem from "../post/PostItem";
import * as Store from 'expo-secure-store'
const SignIn = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [psw, setPsw] = useState("");
  let userToken = useSelector(token)
  let isLoading = useSelector(isloading)
  let hasErr = useSelector(haserr)
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(hasErr)
    if (userToken) {
      Store.setItemAsync('token',userToken)
     navigation.replace('home')
    }
    if (hasErr) {
      Alert.alert('Loi', 'thong tin tai khoan khong chinh xac')
}
  },[userToken,dispatch,hasErr])
  const submit = async () => {
    let dataFetch = {
      userId: user,
      password: psw,
    }
    dispatch(login(dataFetch));

  };

  return (
    <SafeAreaView className="relative items-center flex-1 w-screen bg-fuchsia-600 flex justify-center">
      <Text className="font-extrabold text-center text-5xl text-white">
        SignIn
      </Text>
      <View className="w-3/6">
        <View>
        <TextInput
          id
          onChangeText={e => setUser(e)}
          className="bg-slate-300 w-full mb-2"
            value={user}
            placeholder="Enter username"
            textContentType="username"
        />
        </View>

        <View>
        <TextInput
          onChangeText={e => setPsw(e)}
          className="bg-slate-200 w-full"
          value={psw}
            textContentType="newPassword"
            name="password"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            enablesReturnKeyAutomatically

        />
        </View>
      </View>

      <Text
        onPress={(e) => navigation.navigate("logup")}
        className="mb-4 w-3/5  text-slate-900 underline text-right text-1xl"
      >
        chưa có tài khoản?
      </Text>
      <Button onPress={e => submit()} className="p-4" title="SignIn" />
      {isLoading && <View className='w-2/6 h-2/6 absolute top-2/3'>
            <LoaderAnimation/>
       </View>}
    </SafeAreaView>
  );
};
export default memo(SignIn);
