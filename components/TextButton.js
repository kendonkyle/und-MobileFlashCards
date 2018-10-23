import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { secondary } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.basic, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  basic: {
    textAlign: 'center',
    color: secondary,
  }
})