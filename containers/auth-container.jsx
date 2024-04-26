import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";

import { images } from "../constants";

const AuthContainer = ({ children, title, link }) => {
  const { url, name, message } = link;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex items-center h-full px-4 pt-8 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[160px] h-[50px]"
          />

          <Text className="text-2xl text-white mt-10 font-psemibold">
            {title}
          </Text>

          {children}

          <View className="flex justify-center pt-6 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              {message}
            </Text>
            <Link href={url} className="text-lg font-psemibold text-secondary">
              {name}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthContainer;
