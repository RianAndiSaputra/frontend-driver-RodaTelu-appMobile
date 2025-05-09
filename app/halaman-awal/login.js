import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
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

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState({
    phone: false,
    password: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  
  useEffect(() => {
    // Animation sequence when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Logo path - replace with your actual asset path
  const logoSource = require('../../assets/images/logo.png');
  // Background ornament - replace with your actual asset path
  const kratonOrnament = require('../../assets/images/batik.png');

  const handleLogin = () => {
    // Directly navigate to home screen without validation
    router.push('halaman-utama/home/page');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F3222" />
      
      {/* Background Image/Pattern */}
      <Image 
        source={kratonOrnament} 
        style={styles.backgroundPattern}
        resizeMode="cover"
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View 
          style={[
            styles.headerContainer, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.logoContainer}>
            <Image source={logoSource} style={styles.logo} />
          </View>
          <Text style={styles.title}>Becak Malioboro</Text>
          <Text style={styles.subtitle}>Masuk ke Akun Driver</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.formContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nomor Handphone</Text>
              <View style={[
                styles.inputWrapper,
                isFocused.phone && styles.inputWrapperFocused,
              ]}>
                <Text style={styles.countryCode}>+62</Text>
                <TextInput
                  style={styles.input}
                  placeholder="8123456789"
                  placeholderTextColor="#88887a"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  onFocus={() => setIsFocused({...isFocused, phone: true})}
                  onBlur={() => setIsFocused({...isFocused, phone: false})}
                />
                <Ionicons name="phone-portrait-outline" size={20} color="#0F3222" style={styles.inputIcon} />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <View style={[
                styles.inputWrapper,
                isFocused.password && styles.inputWrapperFocused,
              ]}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#88887a"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsFocused({...isFocused, password: true})}
                  onBlur={() => setIsFocused({...isFocused, password: false})}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#0F3222"
                  />
                </TouchableOpacity>
                <Ionicons name="lock-closed-outline" size={20} color="#0F3222" style={styles.inputIcon} />
              </View>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            <View style={styles.rememberForgotContainer}>
              <TouchableOpacity 
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons 
                  name={rememberMe ? "checkbox" : "square-outline"} 
                  size={20} 
                  color={rememberMe ? "#0F3222" : "#88887a"} 
                />
                <Text style={styles.rememberMeText}>Ingat Saya</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.buttonContainer}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#0F3222', '#164731', '#0F3222']}
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
        </Animated.View>

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
  backgroundPattern: {
    position: 'absolute',
    width: width,
    height: height * 0.4,
    tintColor: '#0F3222',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    tintColor: '#B1944D',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 30,
    fontWeight: '500',
    opacity: 0.8,
    letterSpacing: 0.3,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#0F3222',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 50, 34, 0.3)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: 54,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: '#0F3222',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#0F3222',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  countryCode: {
    paddingRight: 12,
    color: '#0F3222',
    fontSize: 16,
    fontWeight: '500',
    borderRightWidth: 1,
    borderRightColor: 'rgba(15, 50, 34, 0.2)',
    height: '60%',
    textAlignVertical: 'center',
    paddingVertical: 8,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0F3222',
    paddingLeft: 0,
  },
  inputIcon: {
    marginLeft: 12,
    opacity: 0.7,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 46,
    padding: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#FF3B30',
    marginLeft: 6,
    fontSize: 14,
    flex: 1,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#0F3222',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(15, 50, 34, 0.2)',
  },
  orText: {
    marginHorizontal: 16,
    color: '#0F3222',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.6,
    letterSpacing: 1,
  },
  registerPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center',
  },
  registerPromptText: {
    color: '#0F3222',
    fontSize: 14,
    opacity: 0.8,
  },
  registerLink: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },  
  footerText: {
    fontSize: 12,
    color: '#0F3222',
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default LoginScreen;