// Menu items for account screen
import { Text, View } from "react-native";
import React from "react";
import PressableButton from "../../components/common/PressableButton";
import { accountStyles } from "../../styles/screens/account";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/helper/colors";

export default function MenuItem({ icon, title, onPress, type = "default" }) {
  return (
    <PressableButton
      componentStyle={[
        accountStyles.menuItem,
        type === "danger" && accountStyles.menuItemDanger,
      ]}
      pressedStyle={accountStyles.menuItemPressed}
      pressHandler={onPress}
    >
      <View style={accountStyles.menuItemContent}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={type === "danger" ? colors.status.error : colors.primary[500]}
          style={accountStyles.menuIcon}
        />
        <Text
          style={[accountStyles.menuText, type === "danger" && accountStyles.menuTextDanger]}
        >
          {title}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={type === "danger" ? colors.status.error : colors.neutral[400]}
        style={accountStyles.menuArrow}
      />
    </PressableButton>
  );
}
