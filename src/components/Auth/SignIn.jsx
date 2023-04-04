import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from "react-native";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isloading, haserr, login, token } from "../../redux/Auth/reducer";
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
      userId: user,
      password: psw,
    };

    let res = await dispatch(login(dataFetch));
    if (res.payload) {
      await Store.setItemAsync("token", res.payload.token);
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOutr);

      navigation.replace("home");
    } else {
      Alert.alert("Lỗi", "Thông tin mật khẩu hoặc tài khoảng không chính xác");
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View>
        <Image source={require("../../../assets/images/Vectors.png")} />
      </View>

      <View className="h-2/5/5 w-full flex justify-center items-center">
        <Text className="text-4xl text-color-primary font-bold mb-6 tracking-[2px] ">
          SignIn
        </Text>

        <View>
          <View className="ml-5 mr-5 border-2 w-4/5 h-14 mt-5 mb-5 flex-row items-center border-purple rounded-3xl border-color-primary">
            <TextInput
              id
              onChangeText={(e) => setUser(e)}
              className="h-full flex-1 ml-[10px] text-base"
              value={user}
              placeholder="Enter Username"
              textContentType="username"
            />
          </View>

          <View className="ml-5 mr-5 border-2 w-4/5 h-14 mt-5 mb-5 flex-row items-center border-purple rounded-3xl border-color-primary">
            <TextInput
              onChangeText={(e) => setPsw(e)}
              className="h-full flex-1 ml-[10px] text-base"
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

        <TouchableOpacity
          onPress={(e) => submit()}
          className="rounded-2xl bg-color-primary justify-center items-center mt-5 pt-5 pb-5 pl-32 pr-32"
        >
          <Text className="text-white text-base font-bold">SignIn</Text>
        </TouchableOpacity>
        {isLoading && (
          <View className="w-2/6 h-2/6 absolute top-2/3">
            <LoaderAnimation />
          </View>
        )}

        <View className="w-4/5 h-14 flex flex-row justify-end items-center mt-5">
          <Text className="text-sm">Don't have an account?</Text>
          <Text
            className="ml-2 mr-2 text-color-primary"
            onPress={(e) => navigation.replace("logup")}
          >
            SignUp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default memo(SignIn);
