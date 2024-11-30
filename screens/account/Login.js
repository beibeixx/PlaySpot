//Login screen
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup";
import { sendPasswordResetEmail } from "firebase/auth";
import { loginStyles } from "../../styles/screens/login";
import { colors } from "../../styles/helper/colors";
import PressableButton from "../../components/common/PressableButton";
import { AntDesign } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginHandler = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      navigation.goBack();
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginSignup = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "Password reset email has been sent. Please check your inbox."
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={loginStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={loginStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.contentContainer}>
          {/* Header */}
          <View style={loginStyles.headerContainer}>
            <Image
              source={require("../../assets/favicon.png")}
              style={loginStyles.logo}
              resizeMode="contain"
            />
            <Text style={loginStyles.title}>Welcome Back!</Text>
            <Text style={loginStyles.subtitle}>Sign in to continue</Text>
          </View>

          {/* Input Fields */}
          <View style={loginStyles.inputContainer}>
            <View style={loginStyles.inputWrapper}>
              <Text style={loginStyles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  loginStyles.input,
                  errors.email && loginStyles.inputError,
                ]}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {errors.email && (
                <Text style={loginStyles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={loginStyles.inputWrapper}>
              <Text style={loginStyles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  loginStyles.input,
                  errors.password && loginStyles.inputError,
                ]}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && (
                <Text style={loginStyles.errorText}>
                  {loginStyles.password}
                </Text>
              )}
            </View>

            <View style={loginStyles.forgotPasswordContainer}>
              <PressableButton
                componentStyle={loginStyles.forgotPasswordButton}
                pressHandler={handleForgotPassword}
              >
                <Text style={loginStyles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </PressableButton>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={loginStyles.buttonsContainer}>
            <PressableButton
              componentStyle={loginStyles.loginButton}
              pressHandler={loginHandler}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.text.white} />
              ) : (
                <>
                  <Text style={loginStyles.buttonText}>Sign In</Text>
                  <AntDesign name="login" size={20} color={colors.text.white} />
                </>
              )}
            </PressableButton>

            <PressableButton
              componentStyle={loginStyles.registerButton}
              pressHandler={loginSignup}
            >
              <Text style={loginStyles.buttonText}>Create Account</Text>
              <AntDesign name="adduser" size={20} color={colors.text.white} />
            </PressableButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
