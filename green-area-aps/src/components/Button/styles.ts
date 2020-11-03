import styled from 'styled-components/native';
import { Pressable } from 'react-native';

export const StyledButton = styled(Pressable)`
  border: 2px solid #fff;
  border-radius: 30px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: Nunito_700Bold;
  font-weight: bold;
  font-size: 24px;
`;
