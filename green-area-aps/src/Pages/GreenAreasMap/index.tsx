import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../../assets/marker.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

type GreenArea = {
  id: number;
  name: string;
  species: string;
  description: string;
  latitude: number;
  longitude: number;
};

const GreenAreasMap = () => {
  const [greenAreas, setGreenAreas] = useState<GreenArea[]>([]);
  const navigation = useNavigation();
  const route = useRoute<any>();
  useEffect(() => {
    api.get('greenAreas').then((response) => {
      setGreenAreas(response.data);
    });
  }, []);
  const { latitude, longitude } = route.params;
  const handleNavigateToDetails = (id: number) => {
    navigation.navigate('GreenAreaDetails', { id });
  };

  const handleNavigateToCreateGreenArea = () => {
    navigation.navigate('GreenAreaData', { position: { latitude, longitude } });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {greenAreas.map((greenArea) => {
          return (
            <Marker
              key={greenArea.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.4,
                y: 0.9,
              }}
              anchor={{
                x: 0.0,
                y: 1,
              }}
              coordinate={{
                latitude: greenArea.latitude,
                longitude: greenArea.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToDetails(greenArea.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text numberOfLines={1} style={styles.calloutText}>
                    {greenArea.species || greenArea.description}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {greenAreas.length} Areas verdes encontradas
        </Text>
        <RectButton
          style={styles.createGreenAreaButton}
          onPress={handleNavigateToCreateGreenArea}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#11d13b',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3',
  },
  createGreenAreaButton: {
    width: 56,
    height: 56,
    backgroundColor: '#11d13b',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GreenAreasMap;
