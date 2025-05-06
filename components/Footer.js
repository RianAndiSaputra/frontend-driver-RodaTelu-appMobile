import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Footer = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const menuItems = [
    { key: 'beranda', label: 'Beranda', icon: 'home' },
    { key: 'riwayat', label: 'Riwayat', icon: 'history' },
    { key: 'dompet', label: 'Dompet', icon: 'wallet' },
    { key: 'Akun', label: 'Akun', icon: 'account' },
  ];

  const onPressMenu = (key) => {
    setActiveTab(key);
    // Navigate to corresponding page
    switch (key) {
      case 'beranda':
        router.push('/halaman-utama/home');
        break;
      case 'riwayat':
        router.push('/halaman-utama/history');
        break;
      case 'dompet':
        router.push('/halaman-utama/wallet');
        break;
      case 'Akun':
        router.push('/halaman-utama/profile');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.bottomNav}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => onPressMenu(item.key)}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
            color={activeTab === item.key ? '#B1944D' : '#888888'}
          />
          <Text style={[styles.navText, activeTab === item.key && styles.activeNavText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginTop: 4,
  },
  activeNavText: {
    color: '#B1944D',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Footer;
