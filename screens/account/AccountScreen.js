//Account screen to display user info and favorite list entry
import { Text, View, TouchableOpacity, TextInput} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseSetup";
import { useSelector } from "react-redux";
import { handleSignOut } from "../../redux/authService";
import { LinearGradient } from "expo-linear-gradient";
import { accountStyles } from "../../styles/screens/account";
import PressableButton from "../../components/common/PressableButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/helper/colors";
import MenuItem from "../../components/account/MenuItem";
import Avatar from "../../components/account/Avatar";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseSetup";
import { getOneDocument, updateDB } from "../../firebase/firestoreHelper";

export default function AccountScreen({ navigation }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [nickname, setNickname] = useState("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (isAuthenticated) {
        setUser(auth.currentUser);
        const userDoc = await getOneDocument(auth.currentUser.uid, "users");
        //avatar
        if (userDoc && userDoc.avatar) {
          try {
            const downloadURL = await getDownloadURL(
              ref(storage, userDoc.avatar)
            );
            setAvatarUrl(downloadURL);
          } catch (error) {
            console.error("Error getting avatar URL:", error);
          }
        }
        //nickname
        if (userDoc) {
          setNickname(userDoc.nickname || "");
        }
      }
    }
    fetchUserData();
  }, [isAuthenticated]);

  async function pickImage(url) {
    if (url) {
      setAvatarUrl(url);
    }
  }

  const favoriteHandle = () => {
    navigation.navigate("Favorite List");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleUpdateNickname = async (newNickname) => {
    try {
      await updateDB(auth.currentUser.uid, { nickname: newNickname }, "users");
      setNickname(newNickname);
      setIsEditingNickname(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  return (
    <View style={accountStyles.container}>
      <LinearGradient
        colors={[colors.primary[200], colors.primary[400], colors.primary[800]]}
        style={accountStyles.header}
      >
        <View style={accountStyles.headerContent}>
          {isAuthenticated && user ? (
            <>
              <Avatar
                uid={user.uid}
                avatarUrl={avatarUrl}
                pickImage={pickImage}
              />

              <View style={accountStyles.nicknameContainer}>
                {isEditingNickname ? (
                  <View style={accountStyles.editNicknameContainer}>
                    <TextInput
                      style={accountStyles.nicknameInput}
                      value={nickname}
                      onChangeText={setNickname}
                      placeholder="Enter nickname"
                      autoFocus
                      onBlur={() => setIsEditingNickname(false)}
                      onSubmitEditing={() => handleUpdateNickname(nickname)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsEditingNickname(true)}
                    style={accountStyles.nicknameDisplay}
                  >
                    <Text style={accountStyles.nicknameText}>
                      {nickname || "Set Nickname"}
                    </Text>
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      size={16}
                      color={colors.background.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={accountStyles.emailText}>
                {auth.currentUser.email}
              </Text>
              <Text style={accountStyles.welcomeText}>Welcome back!</Text>
            </>
          ) : (
            <>
              <View style={accountStyles.avatarContainer}>
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={60}
                  color={colors.background.primary}
                />
              </View>
              <Text style={accountStyles.welcomeText}>
                Welcome to Playground App
              </Text>
              <Text style={accountStyles.subtitleText}>
                Login to access all features
              </Text>
            </>
          )}
        </View>
      </LinearGradient>

      <View style={accountStyles.content}>
        {isAuthenticated ? (
          <View style={accountStyles.menuContainer}>
            <MenuItem
              icon="heart-outline"
              title="Favorite Playgrounds"
              onPress={favoriteHandle}
            />
            <MenuItem
              icon="logout"
              title="Sign Out"
              type="danger"
              onPress={handleSignOut}
            />
          </View>
        ) : (
          <View style={accountStyles.loginContainer}>
            <Text style={accountStyles.loginMessage}>
              Login to save your favorite playgrounds, receive updates, and
              more!
            </Text>
            <PressableButton
              componentStyle={accountStyles.loginButton}
              pressedStyle={accountStyles.loginButtonPressed}
              pressHandler={handleLogin}
            >
              <MaterialCommunityIcons
                name="login"
                size={24}
                color={colors.background.primary}
              />
              <Text style={accountStyles.loginButtonText}>Login</Text>
            </PressableButton>
          </View>
        )}
      </View>
    </View>
  );
}
