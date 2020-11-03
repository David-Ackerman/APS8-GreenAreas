import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Container, Title } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
  showCancel?: boolean;
};

const Header = ({ title, showCancel = true }: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBackToHome = () => {
    navigation.navigate('GreenAreasMap');
  };

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15d645" />
      </BorderlessButton>
      <Title>{title}</Title>
      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToHome}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
