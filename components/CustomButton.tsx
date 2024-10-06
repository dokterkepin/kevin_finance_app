import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, isLoading, textStyles }: {
  title: string,
  handlePress: (event: GestureResponderEvent) => void,
  containerStyles: string,
  isLoading: boolean,
  textStyles: string
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`font-[Helvetica-Bold] text-center ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton