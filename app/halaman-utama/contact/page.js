import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../../components/Footer';

const ContactPage = () => {
  const router = useRouter();
  
  const contactMethods = [
    {
      icon: <FontAwesome name="phone" size={24} color="#0F3222" />,
      title: "Telepon",
      description: "Hubungi layanan pelanggan 24 jam",
      action: "08123456789",
      onPress: () => Linking.openURL('tel:08123456789')
    },
    {
      icon: <MaterialIcons name="email" size={24} color="#0F3222" />,
      title: "Email",
      description: "Kirim email ke tim dukungan kami",
      action: "support@becakapp.com",
      onPress: () => Linking.openURL('mailto:support@becakapp.com')
    },
    {
      icon: <MaterialCommunityIcons name="chat-outline" size={24} color="#0F3222" />,
      title: "Live Chat",
      description: "Chat langsung dengan agen kami",
      action: "Buka Live Chat",
      onPress: () => alert('Live Chat akan dibuka')
    },
    {
      icon: <MaterialIcons name="location-on" size={24} color="#0F3222" />,
      title: "Kantor Kami",
      description: "Jl. Becak Digital No. 123, Yogyakarta",
      action: "Lihat di Peta",
      onPress: () => Linking.openURL('https://maps.google.com/?q=Jl+Becak+Digital+No+123,Yogyakarta')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hubungi Kami</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pilih metode yang paling nyaman untuk Anda</Text>
        
        {contactMethods.map((method, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.contactCard}
            onPress={method.onPress}
          >
            <View style={styles.contactIcon}>
              {method.icon}
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{method.title}</Text>
              <Text style={styles.contactDescription}>{method.description}</Text>
            </View>
            <View style={styles.contactAction}>
              <Text style={styles.actionText}>{method.action}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#888888" />
            </View>
          </TouchableOpacity>
        ))}
        
        <Text style={styles.hoursTitle}>Jam Operasional Layanan Pelanggan:</Text>
        <Text style={styles.hoursText}>Senin - Minggu, 24 Jam</Text>
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
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contactIcon: {
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 3,
  },
  contactDescription: {
    fontSize: 12,
    color: '#888888',
  },
  contactAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#B1944D',
    marginRight: 5,
  },
  hoursTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
  hoursText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ContactPage;