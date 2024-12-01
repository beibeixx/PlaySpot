//Account screen to display user info and favorite list entry
import { Text, View } from "react-native";
import React, {useEffect, useState} from "react";
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
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebaseSetup';
import { getAvatarFromDB, updateAvatarInDB } from "../../firebase/firestoreHelper";

export default function AccountScreen({ navigation }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function fetchAvatar() {
    if (isAuthenticated) {
      setUser(auth.currentUser);
      const avatarUri = await getAvatarFromDB("users", auth.currentUser.uid);
      if (avatarUri) {
        const downloadURL = await getDownloadURL(ref(storage, avatarUri));
        setAvatarUrl(downloadURL);
      }
    }
  }
    fetchAvatar();
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

  return (
    <View style={accountStyles.container}>
      <LinearGradient
        colors={[colors.primary[200],colors.primary[400], colors.primary[800]]}
        style={accountStyles.header}
      >
        <View style={accountStyles.headerContent}>
          {isAuthenticated  && user ? (
            <>
              <Avatar uid={user.uid} avatarUrl={avatarUrl} pickImage={pickImage}/>
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
            {/* TO BE ADDED */}
            {/* <MenuItem
              icon="bell-outline"
              title="Notifications"
              onPress={() => {}}
            /> */}
            {/* <MenuItem icon="cog-outline" title="Settings" onPress={() => {}} /> */}
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
