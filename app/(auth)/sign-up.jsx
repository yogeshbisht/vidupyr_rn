import { useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            Register to VidUpyr
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-8"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="w-full mt-10"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-8 flex-row gap-2">
            <Text className="text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
