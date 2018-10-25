import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { secondary, white } from '../utils/colors'

export default function OpacityButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={{flex:1}} onPress={onPress}>
      <View style={[styles.button, style]} >
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    // width: "90%",
    margin: "5%",
    // marginBottom: 30,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: secondary
  },
  text: {
    textAlign: "center",
    color: white,
    padding: 24,
  }
})