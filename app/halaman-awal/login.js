import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Ganti dengan path asset logo Anda yang sebenarnya
  const logoSource = require('../../assets/images/logo.png');
  // const kratonOrnament = require('../../assets/images/batik.png');

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      setError('Nomor HP dan kata sandi harus diisi');
      return;
    }
    
    // Implementasi login sesuai kebutuhan
    console.log('Login with:', phoneNumber);
    
    // Navigate to home screen
    router.push('halaman-utama/home/page');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          {/* <Image source={kratonOrnament} style={styles.ornamentHeader} /> */}
          <Image source={logoSource} style={styles.logo} />
          <Text style={styles.title}>Becak Malioboro</Text>
          <Text style={styles.subtitle}>Masuk ke Akun Driver</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nomor Handphone</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.countryCode}>+62</Text>
              <TextInput
                style={styles.input}
                placeholder="8123456789"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Masukkan kata sandi"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#0F3222"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={['#0F3222', '#0F3222', '#0F3222']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>MASUK</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>ATAU</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.registerPromptContainer}>
            <Text style={styles.registerPromptText}>
              Belum menjadi mitra driver?
            </Text>
            <TouchableOpacity onPress={() => router.push('halaman-awal/daftar')}>
              <Text style={styles.registerLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2025 Programer Cupu. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  ornamentHeader: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: -15,
    tintColor: '#0F3222', // Changed from gold to dark green
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#B1944D', // Changed from gold to dark green
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#0F3222', // Changed from gold to dark green
    marginTop: 5,
    marginBottom: 30,
    fontWeight: '500',
    opacity: 0.8, // Added opacity for subtlety
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#0F3222',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0F3222', // Changed from gold to dark green
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  countryCode: {
    paddingHorizontal: 12,
    color: '#0F3222',
    fontSize: 16,
    fontWeight: '500',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    height: '100%',
    textAlignVertical: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#0F3222',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 10,
    fontSize: 14,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#0F3222', // Changed from gold to dark green
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3222', // Solid dark green instead of gradient
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  orText: {
    marginHorizontal: 10,
    color: '#8A8A8A',
    fontSize: 14,
  },
  registerPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerPromptText: {
    color: '#0F3222',
    fontSize: 14,
  },
  registerLink: {
    color: '#B1944D', // Changed from gold to dark green
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 20, // beri jarak dari bawah
  },  
  footerText: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
  },
});

export default LoginScreen;