import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContainer } from "../../containers";

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
    <AuthContainer
      title="Create a New Account"
      link={{
        url: "/sign-in",
        name: "Sign in",
        message: "Already have an account?",
      }}
    >
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
        containerStyles="mt-10 w-full"
        isLoading={isSubmitting}
      />
    </AuthContainer>
  );
};

export default SignUp;
