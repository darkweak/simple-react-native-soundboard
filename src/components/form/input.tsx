import React from 'react';
import { PlatformColor, StyleSheet, TextInput, TextInputProps, TextProps } from 'react-native';

type inputType = {
    placeholder: string;
    setValue: (s: string) => void;
    value: string;
} & TextInputProps;

export const Input: React.FC<inputType> = ({ placeholder, style, setValue, value, ...rest }) => {
  return (
    <TextInput
      style={{...styles.input, ...((style as TextProps) ?? {})}}
      placeholderTextColor={PlatformColor('systemGray')}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      {...rest}
    />
  );
};

export const inputStyle = {
  fontSize: 16,
  padding: 10,
  backgroundColor: PlatformColor('tertiarySystemBackground'),
  color: PlatformColor('label'),
  borderRadius: 15,
};

const styles = StyleSheet.create({
  input: inputStyle,  
});
