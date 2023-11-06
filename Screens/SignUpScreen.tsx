import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
              }}>
              <FeatherIcon name="x" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Create an Account</Text>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => {
              }}>
              <FeatherIcon name="info" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter your name</Text>

              <TextInput
                onChangeText={name => setForm({ ...form, name })}
                placeholder="Name"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                value={form.name}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter your email</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="Email address"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter your password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.inputValidation}>
              <View style={styles.inputValidationRow}>
                <FeatherIcon color="#292B32" name="check-circle" size={14} />

                <Text style={styles.inputValidationRowText}>
                  Minimum of 12 characters
                </Text>
              </View>

              <View style={styles.inputValidationRow}>
                <FeatherIcon color="#292B32" name="check-circle" size={14} />

                <Text style={styles.inputValidationRowText}>
                  At least 1 lower case (a-z)
                </Text>
              </View>

              <View
                style={[
                  styles.inputValidationRow,
                  styles.inputValidationRowInvalid,
                ]}>
                <FeatherIcon color="#292B32" name="check-circle" size={14} />

                <Text style={styles.inputValidationRowText}>
                  At least 1 upper case (A-Z)
                </Text>
              </View>

              <View style={styles.inputValidationRow}>
                <FeatherIcon color="#292B32" name="check-circle" size={14} />

                <Text style={styles.inputValidationRowText}>
                  At least 1 number (0-9)
                </Text>
              </View>

              <View
                style={[
                  styles.inputValidationRow,
                  styles.inputValidationRowInvalid,
                ]}>
                <FeatherIcon color="#292B32" name="check-circle" size={14} />

                <Text style={styles.inputValidationRowText}>
                  At least 1 symbol (%&,!#)
                </Text>
              </View>
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm your password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={confirmPassword =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#878E9A"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
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
  inputValidation: {
    marginBottom: 12,
  },
  inputValidationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  inputValidationRowInvalid: {
    opacity: 0.35,
  },
  inputValidationRowText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#292b32',
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
    backgroundColor: '#292B32',
    borderColor: '#292B32',
    marginTop: 16,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
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
});