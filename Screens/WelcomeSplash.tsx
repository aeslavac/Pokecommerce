// WelcomeScreen.js
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeSplash: undefined;
};

type WelcomeScreenProps = StackScreenProps<RootStackParamList, 'WelcomeScreen'>;


const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Bienvenido a Pokecomerce !',
    message: 'la App ideal para un entrenador',
    action: 'Toca para empezar',
  },
  {
    title: 'El futuro de los entrenadores',
    message: 'Esta dentro de esta Aplicación',
    action: 'Continua',
  },
  {
    title: "Preparate",
    message: 'Para la experiencia de compras de pokemon para entrenadores principiantes',
    action: 'Disfruta de la experiencia',
  },
];

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const [slide, setSlide] = useState(0);
  const swiper = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const animatedBackgroundLeft = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, -1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ left: animatedBackgroundLeft }}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/2560px-International_Pokémon_logo.svg.png' }}
          resizeMode="contain"
          style={styles.slideImage}
        />
      </Animated.View>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onTouchStart={() => {
          Animated.timing(contentOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }}
        onTouchEnd={() => {
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }}
        scrollEventThrottle={1}
      >
        {slides.map((item, index) => (
          <Animated.View key={index} style={[styles.slide, { opacity: contentOpacity }]}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideText}>{item.message}</Text>
            <TouchableOpacity
              onPress={() => {
                if (index === slides.length - 1) {
                  navigation.navigate('HomeSplash');
                } else {
                  if (swiper.current) {
                    swiper.current.scrollBy(1);
                  }
                }
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>{item.action}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f26',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 36,
  },
  slideImage: {
    width: width * slides.length,
    height: 0.6 * height,
    position: 'absolute',
    top: 47,
    left: 0,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#a9b1cf',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e5afb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 36,
    marginVertical: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
