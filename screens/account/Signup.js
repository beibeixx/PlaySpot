//Signup Screen
import {
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { auth } from "../../firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { loginStyles } from "../../styles/screens/login";
import { colors } from "../../styles/helper/colors";
import PressableButton from "../../components/common/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { validateSignupForm } from "../../utils/validation";
import { writeToDB } from "../../firebase/firestoreHelper";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const signupHandler = async () => {
    const formErrors = validateSignupForm(email, password, confirmPassword);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        avatar: "",
      };
      await writeToDB(userData, "users");
      // console.log("Signup successful");
      navigation.navigate("Account");
    } catch (error) {
      // console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
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
            <Text style={loginStyles.title}>Create Account</Text>
            <Text style={loginStyles.subtitle}>Sign up to get started</Text>
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
                placeholder="Create password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && (
                <Text style={loginStyles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={loginStyles.inputWrapper}>
              <Text style={loginStyles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[
                  loginStyles.input,
                  errors.confirmPassword && loginStyles.inputError,
                ]}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={loginStyles.errorText}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>
          {/* Action Buttons */}
          <View style={loginStyles.buttonsContainer}>
            <PressableButton
              componentStyle={loginStyles.loginButton}
              pressHandler={signupHandler}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.text.white} />
              ) : (
                <>
                  <Text style={loginStyles.buttonText}>Create Account</Text>
                  <AntDesign
                    name="adduser"
                    size={20}
                    color={colors.text.white}
                  />
                </>
              )}
            </PressableButton>

            <PressableButton
              componentStyle={loginStyles.registerButton}
              pressHandler={() => navigation.navigate("Login")}
            >
              <Text style={loginStyles.buttonText}>Back to Login</Text>
              <AntDesign name="login" size={20} color={colors.text.white} />
            </PressableButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
