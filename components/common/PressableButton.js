import { Pressable } from "react-native";
import React from "react";
import { pressableButtonStyles } from "../../styles/components/pressableButton";
import { colors } from "../../styles/helper/colors";

export default function PressableButton({
  children,
  pressHandler,
  componentStyle,
  pressedStyle,
  disabled,
}) {
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => [
        componentStyle,
        disabled && pressableButtonStyles.disabled,
        pressed && pressedStyle,
        pressed && pressableButtonStyles.pressed,
      ]}
      android_ripple={{ color: colors.secondary[100]}}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
}
