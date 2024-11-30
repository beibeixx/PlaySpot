//Signup Screen
import { StyleSheet, Text, TextInput, View, Button,Alert } from 'react-native'
import { useState } from 'react';
import { auth } from '../../firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupHandler = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');  
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // check fegex for email
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }
    // check password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful');
      navigation.navigate('Account');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.header}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.header}>Confirm password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
})