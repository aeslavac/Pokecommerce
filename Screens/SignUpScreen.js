import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPasswordSuggestions, setShowPasswordSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const saveRegistrationData = async () => {
    try {
      
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        setErrorMessage("Faltan datos por rellenar");
        setIsErrorModalVisible(true); 
      } else if (form.password !== form.confirmPassword) {
        setErrorMessage("Las contraseñas no coinciden");
        setIsErrorModalVisible(true); 
      } else {
        const savedEmail = await AsyncStorage.getItem('email');
        if (savedEmail === form.email) {
          setErrorMessage("Este correo ya está registrado");
          setIsErrorModalVisible(true); 
        } else {
          const invalidSuggestions = getInvalidSuggestions(form.password);
          if (invalidSuggestions.length > 0) {
            setErrorMessage("La contraseña no cumple con los criterios");
            setIsErrorModalVisible(true); 
          } else {
            await AsyncStorage.setItem('name', form.name);
            await AsyncStorage.setItem('email', form.email);
            await AsyncStorage.setItem('password', form.password);
            setErrorMessage("");
            setSuccessMessage("Registro exitoso");
            setIsSuccessModalVisible(true); 
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsErrorModalVisible(false); 
    setIsSuccessModalVisible(false); 
  };

  const passwordSuggestions = [
    "Mínimo 6 caracteres",
    "Al menos 1 letra minúscula (a-z)",
    "Al menos 1 letra mayúscula (A-Z)",
    "Al menos 1 número (0-9)",
    "Al menos 1 símbolo (%&,!#)",
  ];

  const validatePassword = (password) => {
    return [
      password.length >= 6 ? null : "Mínimo 6 caracteres",
      /[a-z]/.test(password) ? null : "Al menos 1 letra minúscula (a-z)",
      /[A-Z]/.test(password) ? null : "Al menos 1 letra mayúscula (A-Z)",
      /\d/.test(password) ? null : "Al menos 1 número (0-9)",
      /[%&!#]/.test(password) ? null : "Al menos 1 símbolo (%&,!#)",
    ];
  };

  const getInvalidSuggestions = (password) => {
    return validatePassword(password).filter((suggestion) => suggestion);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate('WelcomeScreen'); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crear Cuenta</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Ingresa tu nombre</Text>
              <TextInput
                onChangeText={(name) => {
                  clearMessages();
                  setForm({ ...form, name });
                }}
                placeholder="Nombre"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                value={form.name}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Ingresa tu correo</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(email) => {
                  clearMessages();
                  setForm({ ...form, email });
                }}
                placeholder="Correo Electronico"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Ingresa una contraseña</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(password) => {
                  clearMessages();
                  setForm({ ...form, password });
                  setShowPasswordSuggestions(true);
                }}
                placeholder="********"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            {showPasswordSuggestions && (
              <View style={styles.passwordSuggestions}>
                {getInvalidSuggestions(form.password).map((suggestion, index) => (
                  <Text style={styles.invalidPasswordSuggestion} key={index}>
                    {suggestion}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirma tu Contraseña</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(confirmPassword) => {
                  clearMessages();
                  setForm({ ...form, confirmPassword });
                }}
                placeholder="********"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword}
              />
            </View>

            <TouchableOpacity onPress={saveRegistrationData}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {isErrorModalVisible && (
        <Modal isVisible={isErrorModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setIsErrorModalVisible(false)}>
              <Text style={styles.modalButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {isSuccessModalVisible && (
        <Modal isVisible={isSuccessModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Éxito</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
            <TouchableOpacity onPress={closeSuccessModal}>
              <Text style={styles.modalButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#292929',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#292929',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f0f4f6',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderColor: '#d7dbdd',
    borderWidth: 1,
  },
  passwordSuggestions: {
    marginTop: 6,
  },
  invalidPasswordSuggestion: {
    fontSize: 13,
    fontWeight: '500',
    color: 'red',
    marginLeft: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#80DAEB',
    borderColor: '##80DAEB',
    marginTop: 16,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#1F1B1C',
    letterSpacing: 0.133,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 12,
  },
  modalButton: {
    fontSize: 18,
    color: '#007BFF',
  },
});
