import styled from 'styled-components/native';

export const Container = styled.View`
  max-width: 320px;
  /* align-items: center; */
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #8fa7b3;
  font-family: Poppins_600SemiBold;
  margin-bottom: 5px;
`;

export const Field = styled.TextInput`
  background: #ffffff;
  border: 1px solid #d3e2e6;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 12px 20px;
  font-family: Poppins_400Regular;
  font-size: 16px;
`;
