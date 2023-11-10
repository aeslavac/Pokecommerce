import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeSplash from './Screens/WelcomeSplash';
import SignUpScreen from './Screens/SignUpScreen';
import HomeSplash from './Screens/HomeSplash';
import PokemonDetailsPage from './Screens/PokemonDetailsPage';
import ProductListScreen from './Screens/ProductListScreen';
import ProductListDetail from './Screens/ProductListDetail';
import PokeCart from './Screens/PokeCart';
import {CartProvider} from './Navigator/CartContext'
import Footer from './Screens/Footer';

const Stack = createStackNavigator();

type RootStackParamList = {
  Login: undefined;
  WelcomeScreen: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: { navigation: LoginScreenNavigationProp }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const loadSavedData = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      console.log('Saved Email:', savedEmail);
      console.log('Saved Password:', savedPassword);
    };
  
    loadSavedData();
  }, []);

  const handleLogin = async () => {
    const { email, password } = form;

    const savedEmail = await AsyncStorage.getItem('email');
    const savedPassword = await AsyncStorage.getItem('password');

    if (email === savedEmail && password === savedPassword) {
      navigation.navigate('WelcomeScreen');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            alt=""
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1181/1181497.png',
            }}
          />
          <Text style={styles.title}>
            Logeate en: <Text style={{ color: '#007AFF' }}>Pokecomerce</Text>
          </Text>
          <Text style={styles.subtitle}>
            Ten una experiencia enfocada para entrenadores
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Correo Electrónico</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="angel@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.formFooter}>
              No tienes una cuenta?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeSplash} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeSplash" component={HomeSplash} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsPage} />
        <Stack.Screen name="ProductDetails" component={ProductListDetail} />
        <Stack.Screen name="PokeCart" component={PokeCart} />
        <Stack.Screen name="Home" component={ProductListScreen} options={{ title: 'Lista de Productos' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
