import { View, Text, StatusBar, Image } from "react-native";
const LayoutLoader = () => {
  return (
    <>
      <View>
        <StatusBar barStyle="light-content" />
        <View className="bg-color-primary h-full w-full flex flex-col">
          <View className="bg-white h-[300px] w-[300px] rounded-full justify-center items-center mt-20 ml-auto mr-auto">
            <Image
              className=" "
              source={require("../../assets/images/logo.png")}
            />
          </View>

          <View className="w-full h-20 justify-center items-center mt-10">
            <Text className="text-4xl text-white font-bold">MY REVIEW</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default LayoutLoader;
