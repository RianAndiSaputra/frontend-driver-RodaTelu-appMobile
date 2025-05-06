import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const ContactCustomerService = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const spinValue = new Animated.Value(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const startSpin = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    startSpin();
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setMessage('');
      
      setTimeout(() => {
        setSendSuccess(false);
      }, 3000);
    }, 2000);
  };

  const openWhatsApp = () => {
    const url = 'https://wa.me/6281234567890?text=Halo%20Becak%20Malioboro%20CS';
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', 'Tidak dapat membuka WhatsApp');
    });
  };

  const openEmail = () => {
    const url = 'mailto:cs@becakmalioboro.com?subject=Pertanyaan%20Becak%20Malioboro';
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', 'Tidak dapat membuka aplikasi email');
    });
  };

  const makePhoneCall = () => {
    let phoneNumber = '';
    
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${+6281234567890}';
    } else {
      phoneNumber = 'telprompt:${+6281234567890}';
    }
    
    Linking.openURL(phoneNumber);
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: <FontAwesome5 name="whatsapp" size={24} color="#25D366" />,
      title: 'WhatsApp',
      description: 'Respon cepat via WhatsApp',
      action: openWhatsApp
    },
    {
      id: 'call',
      icon: <Ionicons name="call" size={24} color="#0F3222" />,
      title: 'Telepon',
      description: '08xx-xxxx-xxxx',
      action: makePhoneCall
    },
    {
      id: 'email',
      icon: <MaterialCommunityIcons name="email" size={24} color="#0F3222" />,
      title: 'Email',
      description: 'cs@becakmalioboro.com',
      action: openEmail
    },
    {
      id: 'office',
      icon: <MaterialCommunityIcons name="office-building" size={24} color="#0F3222" />,
      title: 'Kantor',
      description: 'Jl. Malioboro No. 123, Yogyakarta',
      action: () => router.push('/contact/office')
    }
  ];

  const faqs = [
    {
      question: "Berapa lama proses verifikasi pendaftaran?",
      answer: "Proses verifikasi biasanya memakan waktu 1-2 hari kerja. Tim kami akan memverifikasi data dan dokumen yang Anda submit."
    },
    {
      question: "Bagaimana cara mengecek status verifikasi?",
      answer: "Anda akan menerima notifikasi via email/SMS ketika verifikasi selesai. Anda juga bisa mengecek di halaman status verifikasi di aplikasi."
    },
    {
      question: "Dokumen apa saja yang diperlukan untuk pendaftaran?",
      answer: "Anda perlu menyiapkan KTP, SIM, STNK kendaraan, SKCK, dan surat keterangan sehat. Semua dokumen harus foto asli dan jelas terbaca."
    },
    {
      question: "Apa yang harus dilakukan jika dokumen ditolak?",
      answer: "Anda akan menerima alasan penolakan via email. Silakan upload ulang dokumen yang sesuai dengan persyaratan melalui halaman verifikasi."
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0F3222" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hubungi Kami</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'chat' && styles.activeTab]}
            onPress={() => setActiveTab('chat')}
          >
            <Ionicons 
              name="chatbubbles" 
              size={20} 
              color={activeTab === 'chat' ? '#FFFFFF' : '#0F3222'} 
            />
            <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
              Live Chat
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'contact' && styles.activeTab]}
            onPress={() => setActiveTab('contact')}
          >
            <MaterialCommunityIcons 
              name="contacts" 
              size={20} 
              color={activeTab === 'contact' ? '#FFFFFF' : '#0F3222'} 
            />
            <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
              Kontak
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'faq' && styles.activeTab]}
            onPress={() => setActiveTab('faq')}
          >
            <MaterialCommunityIcons 
              name="help-circle" 
              size={20} 
              color={activeTab === 'faq' ? '#FFFFFF' : '#0F3222'} 
            />
            <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
              FAQ
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'chat' && (
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.avatar}
              />
              <View style={styles.csInfo}>
                <Text style={styles.csName}>Customer Service</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.statusIndicator} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.chatBubbleContainer}>
              <View style={[styles.chatBubble, styles.receivedBubble]}>
                <Text style={styles.chatText}>
                  Halo! Saya CS Becak Malioboro. Ada yang bisa saya bantu?
                </Text>
                <Text style={styles.chatTime}>12:30 PM</Text>
              </View>
              
              {sendSuccess && (
                <View style={[styles.chatBubble, styles.sentBubble, styles.successBubble]}>
                  <Ionicons name="checkmark-done" size={16} color="#FFFFFF" />
                  <Text style={[styles.chatText, styles.successText]}>
                    Pesan terkirim
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Ketik pesan Anda..."
                multiline
                value={message}
                onChangeText={setMessage}
              />
              
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendMessage}
                disabled={isSending || !message.trim()}
              >
                {isSending ? (
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Ionicons name="refresh" size={24} color="#FFFFFF" />
                  </Animated.View>
                ) : (
                  <Ionicons 
                    name="send" 
                    size={24} 
                    color={message.trim() ? '#FFFFFF' : '#CCCCCC'} 
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {activeTab === 'contact' && (
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>Hubungi Kami Melalui</Text>
            
            <View style={styles.contactMethodsContainer}>
              {contactMethods.map((method) => (
                <TouchableOpacity 
                  key={method.id}
                  style={styles.contactCard}
                  onPress={method.action}
                >
                  <View style={styles.contactIcon}>
                    {method.icon}
                  </View>
                  <View style={styles.contactTextContainer}>
                    <Text style={styles.contactTitle}>{method.title}</Text>
                    <Text style={styles.contactDescription}>{method.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#888888" />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.officeHoursContainer}>
              <Text style={styles.sectionTitle}>Jam Operasional</Text>
              <View style={styles.hoursCard}>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Senin - Jumat</Text>
                  <Text style={styles.timeText}>08:00 - 17:00 WIB</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Sabtu</Text>
                  <Text style={styles.timeText}>09:00 - 15:00 WIB</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Minggu & Hari Libur</Text>
                  <Text style={styles.timeText}>Tutup</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'faq' && (
          <View style={styles.faqContainer}>
            <Text style={styles.sectionTitle}>Pertanyaan Umum</Text>
            
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.8}
              >
                <View style={styles.faqQuestionContainer}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons 
                    name={expandedFaq === index ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color="#0F3222" 
                  />
                </View>
                
                {expandedFaq === index && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
            
            <View style={styles.helpCard}>
              <MaterialCommunityIcons name="face-agent" size={40} color="#0F3222" />
              <Text style={styles.helpTitle}>Masih butuh bantuan?</Text>
              <Text style={styles.helpText}>
                Jika pertanyaan Anda belum terjawab, silakan hubungi customer service kami
              </Text>
              <TouchableOpacity 
                style={styles.helpButton}
                onPress={() => setActiveTab('contact')}
              >
                <Text style={styles.helpButtonText}>Hubungi CS</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0F3222',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#0F3222',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#0F3222',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  csInfo: {
    flex: 1,
  },
  csName: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
  },
  chatBubbleContainer: {
    flex: 1,
    marginBottom: 16,
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  receivedBubble: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  sentBubble: {
    backgroundColor: '#0F3222',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successBubble: {
    backgroundColor: '#4CAF50',
  },
  chatText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  receivedText: {
    color: '#333333',
  },
  successText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  chatTime: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  messageInput: {
    flex: 1,
    maxHeight: 120,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  contactContainer: {
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginBottom: 16,
  },
  contactMethodsContainer: {
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 50, 34, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
  },
  officeHoursContainer: {
    marginTop: 8,
  },
  hoursCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#0F3222',
  },
  faqContainer: {
    marginHorizontal: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 16,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  faqAnswerContainer: {
    marginTop: 12,
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    lineHeight: 22,
  },
  helpCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginTop: 16,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  helpButton: {
    backgroundColor: '#0F3222',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
});

export default ContactCustomerService;