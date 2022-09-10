import {
  Alert,
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
import {signIn, signUp} from '../lib/firebase/auth';

export default function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다');
      return;
    }

    setLoading(true);
    const info = {email, password};
    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      navigation.navigate('SensorHome');
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Data Collector</Text>
        <Text style={styles.text}>CapstoneDesign2</Text>
        <View style={styles.form}>
          <SignInForm
            form={form}
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignInButton
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
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
