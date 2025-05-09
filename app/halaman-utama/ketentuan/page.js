import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TermsAndConditions = () => {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback if there's no navigation history
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Syarat dan Ketentuan Penggunaan</Text>
        
        <Text style={styles.sectionTitle}>1. Pengenalan</Text>
        <Text style={styles.paragraph}>
          Selamat datang di aplikasi kami. Dengan mengakses atau menggunakan aplikasi ini, Anda setuju untuk terikat oleh syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap jangan menggunakan aplikasi ini.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Penggunaan Aplikasi</Text>
        <Text style={styles.paragraph}>
          Aplikasi ini ditujukan untuk penggunaan pribadi dan non-komersial. Anda tidak diperbolehkan menggunakan aplikasi ini untuk tujuan yang melanggar hukum atau merugikan pihak lain.
        </Text>
        
        <Text style={styles.sectionTitle}>3. Akun Pengguna</Text>
        <Text style={styles.paragraph}>
          Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda dan semua aktivitas yang terjadi di bawah akun Anda. Kami berhak untuk menangguhkan atau menghentikan akun Anda jika kami mencurigai adanya pelanggaran keamanan atau penyalahgunaan.
        </Text>
        
        <Text style={styles.sectionTitle}>4. Konten</Text>
        <Text style={styles.paragraph}>
          Semua konten yang disediakan dalam aplikasi ini adalah untuk tujuan informasi saja. Kami tidak menjamin keakuratan, kelengkapan, atau kegunaan dari konten tersebut.
        </Text>
        
        <Text style={styles.sectionTitle}>5. Pembatasan Tanggung Jawab</Text>
        <Text style={styles.paragraph}>
          Kami tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan aplikasi ini, termasuk namun tidak terbatas pada kerugian langsung, tidak langsung, insidental, atau konsekuensial.
        </Text>
        
        <Text style={styles.sectionTitle}>6. Perubahan Syarat dan Ketentuan</Text>
        <Text style={styles.paragraph}>
          Kami dapat mengubah syarat dan ketentuan ini dari waktu ke waktu. Perubahan akan berlaku segera setelah diposting di aplikasi. Penggunaan berkelanjutan aplikasi setelah perubahan berarti Anda menerima syarat dan ketentuan yang diperbarui.
        </Text>
        
        <Text style={styles.sectionTitle}>7. Hukum yang Berlaku</Text>
        <Text style={styles.paragraph}>
          Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan di pengadilan yang berwenang di Indonesia.
        </Text>
        
        <Text style={styles.lastUpdated}>
          Terakhir diperbarui: 1 Januari 2023
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F3222',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666666',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TermsAndConditions;