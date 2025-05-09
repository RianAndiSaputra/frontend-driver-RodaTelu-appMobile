import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const logoScale = new Animated.Value(0.8);
  const buttonScale = new Animated.Value(0.95);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start();
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" />
      
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            opacity: fadeAnim,
            transform: [{ scale: logoScale }] 
          }
        ]}
      >
        <LinearGradient
          colors={['#0F3222', '#1C4C3A']}
          style={styles.logoBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
          />
        </LinearGradient>
      </Animated.View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Becak Malioboro</Text>
        <Text style={styles.subtitle}>Driver Partner</Text>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <MaterialCommunityIcons 
            name="rhombus" 
            size={16} 
            color="#1C4C3A" 
            style={styles.dividerIcon}
          />
          <View style={styles.dividerLine} />
        </View>
        
        <Text style={styles.description}>
          Bergabunglah sebagai mitra driver becak premium Malioboro dan 
          dapatkan penghasilan tambahan sambil melestarikan budaya 
          transportasi tradisional Yogyakarta.
        </Text>
      </View>
      
      <View style={styles.buttonGroup}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPress={() => router.push('halaman-awal/login')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1C4C3A', '#0F3222']}
              style={styles.primaryButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryButtonText}>Masuk</Text>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="#FFFFFF" 
                style={styles.buttonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPress={() => router.push('/halaman-awal/daftar')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Daftar Mitra Baru</Text>
            <MaterialCommunityIcons 
              name="account-plus" 
              size={20} 
              color="#0F3222" 
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialCommunityIcons name="facebook" size={20} color="#0F3222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialCommunityIcons name="instagram" size={20} color="#0F3222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialCommunityIcons name="whatsapp" size={20} color="#0F3222" />
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          © 2025 Programer Cupu. All rights reserved.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: 'rgba(15, 50, 34, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logoBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  content: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0F3222',
    marginBottom: 4,
    fontFamily: 'PlayfairDisplay-Bold',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(15, 50, 34, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#1C4C3A',
    marginBottom: 16,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1.2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(28, 76, 58, 0.3)',
  },
  dividerIcon: {
    marginHorizontal: 10,
  },
  description: {
    textAlign: 'center',
    color: '#1C4C3A',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 24,
    opacity: 0.9,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F3222',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 1,
    marginRight: 8,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#0F3222',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  secondaryButtonText: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 1,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  socialIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 50, 34, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  copyright: {
    color: '#1C4C3A',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    opacity: 0.7,
  },
});

export default WelcomeScreen;