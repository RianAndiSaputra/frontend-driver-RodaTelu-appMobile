import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const VerificationScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0F3222" barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.title}>Verifikasi Pendaftaran</Text>
          <Text style={styles.subtitle}>Data Anda sedang dalam proses verifikasi oleh tim kami</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <MaterialCommunityIcons name="clock" size={40} color="#0F3222" />
          </View>
          <Text style={styles.statusTitle}>Menunggu Verifikasi</Text>
          <Text style={styles.statusText}>
            Proses verifikasi biasanya memakan waktu 1-2 hari kerja. Kami akan mengirimkan notifikasi 
            begitu pendaftaran Anda disetujui.
          </Text>
        </View>
        
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotActive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Pendaftaran Selesai</Text>
              <Text style={styles.timelineDate}>Hari ini, 12:30 WIB</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotInactive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Verifikasi Dokumen</Text>
              <Text style={styles.timelineDate}>Sedang diproses</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotInactive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Verifikasi Kendaraan</Text>
              <Text style={styles.timelineDate}>Menunggu</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotInactive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Persetujuan Akun</Text>
              <Text style={styles.timelineDate}>Menunggu</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#0F3222" />
            <Text style={styles.infoTitle}>Informasi Penting</Text>
          </View>
          <Text style={styles.infoText}>
            1. Pastikan semua dokumen yang Anda upload jelas dan terbaca
            {"\n\n"}
            2. Tim kami mungkin akan menghubungi Anda untuk konfirmasi data
            {"\n\n"}
            3. Jika ada dokumen yang kurang, Anda akan menerima notifikasi
            {"\n\n"}
            4. Setelah verifikasi selesai, Anda akan mendapatkan email konfirmasi
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('halaman-awal/welcome')}
        >
          <Text style={styles.buttonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => router.push('halaman-awal/contact')}
        >
          <Text style={styles.contactButtonText}>Hubungi Customer Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    textAlign: 'center',
    lineHeight: 24,
  },
  statusContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  statusIcon: {
    backgroundColor: 'rgba(15, 50, 34, 0.1)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
  },
  timelineContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F3222',
    marginRight: 16,
    marginTop: 2,
  },
  timelineDotInactive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 16,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
  },
  infoBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0F3222',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  contactButton: {
    borderWidth: 1,
    borderColor: '#0F3222',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
  },
});

export default VerificationScreen;