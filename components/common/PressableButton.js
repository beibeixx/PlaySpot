import { Pressable } from 'react-native'
import React from 'react'
import commonStyles from '../../utils/style'
import commonColors from '../../utils/color'

export default function PressableButton({children, pressHandler, componentStyle, disabled}) {
  return (
    <Pressable 
      onPress={pressHandler}
      style={({ pressed }) => [
        componentStyle,
        disabled && commonStyles.disabled,
        pressed && commonStyles.pressed,
      ]}
        android_ripple={{color: commonColors.itemBackgroundSelected}}
      disabled={disabled}
      >
      {children}
    </Pressable>
  )
}