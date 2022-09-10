import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

export default function SignInForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        onChangeText={createChangeTextHandler('email')}
      />
      <BorderedInput
        hasMarginBottom
        secureTextEntry
        placeholder="비밀번호"
        value={form.password}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
        onChangeText={createChangeTextHandler('password')}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}
