import { Button, Text, View ,SafeAreaView,StatusBar} from "react-native"
import * as Store from 'expo-secure-store'
import { useEffect } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { logout,token } from "../../../redux/auth/reducer"

const Profile = ({navigation}) => {
    const dispatch = useDispatch()

    const Token = useSelector(token)

// dang xuat
    const signOut = async () => {
        await dispatch(logout())
        let check = await Store.setItemAsync('token',Token)
        if (!check) {
            navigation.replace('login')
        }
    }
    return (
        <SafeAreaView className="flex-1">
            <StatusBar/>
            {/* Header detail */}
            <View>
                <Text className="text-2xl font-bold">Some fucking text</Text>
            </View>

            {/* Content */}
            <View>

                <Button title="logout" onPress={signOut}/>
            </View>

            {/* Actions */}
            <View className="flex justify-between gap-1">
                <Button title="Like" onPress={signOut}></Button>
                <Button className="mt-1" title="Press me"/>
            </View>
        </SafeAreaView>
    )
}

export default Profile