import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  LayoutAnimation
} from "react-native";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isloading, haserr, login, token } from "../../redux/auth/reducer";
import { useNavigation } from "@react-navigation/native";
import LoaderAnimation from "../../lib/LoaderAnimation";
import * as Store from "expo-secure-store";
const SignIn = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [psw, setPsw] = useState("");
  let isLoading = useSelector(isloading);
  const dispatch = useDispatch();

  const submit = async () => {
    let dataFetch = {
      email: user,
      password: psw,
    };

   let res = await dispatch(login(dataFetch))
    if (res.payload) {
      await Store.setItemAsync("token", res.payload.access_token);
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOutr);

      navigation.replace("home");
    }
    else {
      Alert.alert("Lỗi", "Thông tin mật khẩu hoặc tài khoảng không chính xác");
    }
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
            onChangeText={(e) => setUser(e)}
            className="bg-slate-300 w-full mb-2"
            value={user}
            placeholder="Enter username"
            textContentType="username"
          />
        </View>

        <View>
          <TextInput
            onChangeText={(e) => setPsw(e)}
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
        onPress={(e) => navigation.replace("logup")}
        className="mb-4 w-3/5  text-slate-900 underline text-right text-1xl"
      >
        chưa có tài khoản?
      </Text>
      <Button onPress={(e) => submit()} className="p-4" title="SignIn" />
      {isLoading && (
        <View className="w-2/6 h-2/6 absolute top-2/3">
          <LoaderAnimation />
        </View>
      )}
    </SafeAreaView>
  );
};
export default memo(SignIn);
