import React from 'react';
import { View, TextInput, Image, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import styles from './styles';
// import logo from './logo.png';

const styles = StyleSheet.create({
  input: {
    height: 16,
    margin: 10,
    color: '#000',

  },
  block: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd'
  }
})

const Demo = () => {
  return (
    <ScrollView>
    <KeyboardAvoidingView
        behavior="padding"
       enabled
       padding={20} >
      <View style={styles.block} />
      {/* <Image source={logo} style={styles.logo} /> */}
      <TextInput
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
      
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Demo;