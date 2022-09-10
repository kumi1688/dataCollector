import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SignInForm from '../components/SignInForm';
import SignInButton from '../components/SignInButton';

export default function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Data Collector for CapstoneDesign2</Text>
        <View style={styles.form}>
          <SignInForm
            form={form}
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignInButton isSignUp={isSignUp} onSubmit={onSubmit} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});
