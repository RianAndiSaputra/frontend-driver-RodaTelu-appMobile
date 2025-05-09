import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../../components/Footer';

const PrivacyPolicy = () => {
  const router = useRouter();
  
  const privacySections = [
    {
      title: "Informasi yang Kami Kumpulkan",
      content: "Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar, menggunakan layanan, atau berkomunikasi dengan kami. Ini termasuk nama, alamat email, nomor telepon, informasi pembayaran, dan data lain yang diperlukan untuk menyediakan layanan kami."
    },
    {
      title: "Penggunaan Informasi",
      content: "Informasi yang kami kumpulkan digunakan untuk:\n- Menyediakan, memelihara, dan meningkatkan layanan kami\n- Memproses transaksi dan mengirim notifikasi terkait\n- Memberikan dukungan pelanggan\n- Mengembangkan produk dan layanan baru\n- Melindungi keamanan dan integritas layanan kami"
    },
    {
      title: "Berbagi Informasi",
      content: "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami dapat berbagi informasi dengan:\n- Penyedia layanan yang membantu operasi bisnis kami\n- Otoritas hukum jika diwajibkan oleh hukum\n- Pihak ketiga dalam hal merger, akuisisi, atau penjualan aset"
    },
    {
      title: "Keamanan Data",
      content: "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah."
    },
    {
      title: "Hak Anda",
      content: "Anda memiliki hak untuk:\n- Mengakses dan menerima salinan data pribadi Anda\n- Meminta perbaikan data yang tidak akurat\n- Meminta penghapusan data pribadi Anda\n- Membatasi atau menolak pemrosesan data Anda\n- Menerima data Anda dalam format terstruktur"
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Terakhir diperbarui: 1 Januari 2024{"\n\n"}
          Kebijakan Privasi ini menjelaskan bagaimana BecakApp mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
        </Text>
        
        {privacySections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
        
        <Text style={styles.contactText}>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan{' '}
          <Text style={styles.contactLink} onPress={() => router.push('/halaman-utama/profile/contact')}>
            hubungi kami
          </Text>.
        </Text>
      </ScrollView>
      
      <Footer activeTab="profile" />
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
  intro: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  contactText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 20,
    lineHeight: 22,
  },
  contactLink: {
    color: '#B1944D',
    fontWeight: 'bold',
  },
});

export default PrivacyPolicy;