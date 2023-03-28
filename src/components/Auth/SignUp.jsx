import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isloading, haserr, logup, token } from "../../redux/Auth/reducer";
import { useNavigation } from "@react-navigation/native";
import LoaderAnimation from "../../lib/LoaderAnimation";
import PostItem from "../post/PostItem";
import * as Store from "expo-secure-store";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
const SignUp = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [psw, setPsw] = useState("");
    const [repsw, setRePsw] = useState("");
    const [err,setErr] = useState('')

  let isLoading = useSelector(isloading);

  const dispatch = useDispatch();

  const submit = async () => {
    let dataFetch = {
      userId: user,
      password: psw,
    };
    let res = await dispatch(logup(dataFetch));
    if (res.payload) {
      await Store.setItemAsync("token", res.payload.token);
      navigation.replace("home");
    }
    else {
          Alert.alert("Lỗi", "Thông tin mật khẩu hoặc tài khoản không chính xác");
      }
    };
    
    const validate = (e,obj,set) => {
        try {
            if (obj !== e && e.trim() !== '' && obj !== '') {
                setErr('mật khẩu không trùng khớp')
            }
            else {
                 setErr('')
            }
        } catch (error) {
            setErr(error)
        }
     set(e);
    }
  return ( 
    <SafeAreaView className="relative items-center flex-1 w-screen bg-fuchsia-600 flex justify-center">
      <Text className="font-extrabold text-center text-5xl text-white">
        SignUp
      </Text>
      <View className="w-3/6">
        <View>
          <TextInput
            id
            onChangeText={(e) => setUser(e)}
            className="bg-slate-200 w-full mb-2"
            value={user}
            placeholder="Enter username"
            textContentType="username"
          />
        </View>

        <View className="mb-2">
          <TextInput
            onChangeText={(e) => validate(e,repsw,setPsw)}
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
        <View>
          <TextInput
            onChangeText={e => validate(e,psw,setRePsw)}
            className="bg-slate-200 w-full"
            value={repsw}
            textContentType="newPassword"
            name="re-password"
            placeholder="Enter re-password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            enablesReturnKeyAutomatically
          />
              </View>
              <Text className="text-red-600 text-[11px]">{err}</Text>
      </View>

      <Text
        onPress={(e) => navigation.navigate("login")}
        className="mb-4 w-3/5  text-slate-900 underline text-right text-1xl"
      >
        Đã có tài khoản?
      </Text>
      <Button onPress={(e) => submit()} className="p-4" title="SignUp" />
      {isLoading && (
        <View className="w-2/6 h-2/6 absolute top-2/3">
          <LoaderAnimation />
        </View>
      )}
    </SafeAreaView>
  );
};
export default memo(SignUp);
