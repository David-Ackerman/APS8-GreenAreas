import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import GreenAreaDetails from './Pages/GreenAreaDetails';
import Header from './components/Header';
import SelectMapPosition from './Pages/CreateGreenArea/SelectMapPosition';
import GreenAreaData from './Pages/CreateGreenArea/GreenAreaData';
import GreenAreasMap from './Pages/GreenAreasMap';
import { AppLoading } from 'expo';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  let positionLoaded = false;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      positionLoaded = true;
    })();
  }, []);
  if (location === null) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F2F3F5' },
        }}
      >
        <Screen
          name="GreenAreasMap"
          component={GreenAreasMap}
          initialParams={location.coords}
        />
        <Screen
          name="GreenAreaDetails"
          component={GreenAreaDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="GreenArea" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="GreenAreaData"
          component={GreenAreaData}
          options={{
            headerShown: true,
            header: () => <Header title="Green Area" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
