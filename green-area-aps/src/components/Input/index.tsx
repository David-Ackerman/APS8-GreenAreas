import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { Container, Label, Field } from './styles';

type Props = {
  label: string;
};

type InputProps = TextInputProps & Props;

const Input = ({ label, ...rest }: InputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <Container>
      <Label>{label}</Label>
      <Field
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
        style={focus ? { borderColor: '#A1E9C5' } : { borderColor: '#d3e2e6' }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </Container>
  );
};

export default Input;
