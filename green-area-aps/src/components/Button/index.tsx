import React from 'react';
import { Text } from 'react-native';

import { StyledButton, ButtonText } from './styles';

type ButtonProps = {
  label: string;
  filled: boolean;
  action: () => void;
};

const Button = ({ label, filled, action }: ButtonProps) => {
  return (
    <StyledButton
      onPress={action}
      style={filled ? { backgroundColor: '#fff', marginTop: 20 } : {}}
    >
      <ButtonText style={filled ? { color: '#62e78e' } : {}}>
        {label}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;
