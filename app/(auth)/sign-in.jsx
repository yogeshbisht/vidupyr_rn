import { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContainer } from "../../containers";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer
      title="Login to Your Account"
      link={{
        url: "/sign-up",
        name: "Sign up",
        message: "Don't have an account?",
      }}
    >
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
        containerStyles="mt-10 w-full"
        isLoading={isSubmitting}
      />
    </AuthContainer>
  );
};

export default SignIn;
