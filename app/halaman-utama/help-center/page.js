import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../../components/Footer';

const HelpCenter = () => {
  const router = useRouter();
  
  const faqs = [
    {
      question: "Bagaimana cara memulai perjalanan?",
      answer: "Tekan tombol 'Mulai Perjalanan' di beranda, lalu pilih tujuan Anda."
    },
    {
      question: "Bagaimana sistem pembayaran bekerja?",
      answer: "Pembayaran dapat dilakukan secara tunai atau melalui aplikasi dengan metode pembayaran digital."
    },
    {
      question: "Apa yang harus dilakukan jika driver tidak muncul?",
      answer: "Silakan hubungi layanan pelanggan melalui menu 'Hubungi Kami'."
    },
    {
      question: "Bagaimana cara mengubah profil saya?",
      answer: "Anda dapat mengubah profil melalui menu 'Edit Profil' di halaman profil."
    },
    {
      question: "Bagaimana sistem rating bekerja?",
      answer: "Setelah perjalanan selesai, Anda dapat memberikan rating dan ulasan untuk driver."
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pertanyaan yang Sering Diajukan</Text>
        
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
            {index < faqs.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
        
        <Text style={styles.contactText}>
          Tidak menemukan jawaban yang Anda cari?{' '}
          <Text style={styles.contactLink} onPress={() => router.push('/halaman-utama/profile/contact')}>
            Hubungi kami
          </Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 20,
    textAlign: 'center',
  },
  contactLink: {
    color: '#B1944D',
    fontWeight: 'bold',
  },
});

export default HelpCenter;