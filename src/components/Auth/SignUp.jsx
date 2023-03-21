
import { View,Text,Button, TextInput } from "react-native"
const SignUp = ({ navigation }) => {
    return (
        <View className="flex-1 w-screen bg-fuchsia-600 items-center flex justify-center">
        <Text className="font-extrabold text-center text-5xl text-white">
          hahah
        </Text>
            
            <Text onPress={e => navigation.navigate('login')} className=" w-3/5  text-slate-900 underline text-right ">đã có tài khoản</Text>
        </View>
    )
}
export default SignUp