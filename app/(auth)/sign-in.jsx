import { useState } from "react";
import { Link } from "expo-router";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex items-center h-full px-8 pt-8"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[200px] h-[60px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10">
            Login to VidUpyr
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-8"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full mt-10"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-8 flex-row gap-2">
            <Text className="text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
