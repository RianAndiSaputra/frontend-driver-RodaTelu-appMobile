import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const TipsScreen = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories
  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'earning', name: 'Penghasilan' },
    { id: 'safety', name: 'Keamanan' },
    { id: 'service', name: 'Pelayanan' },
    { id: 'vehicle', name: 'Kendaraan' },
  ];

  // Tips data
  const tips = [
    {
      id: '1',
      title: 'Cara Meningkatkan Penghasilan',
      category: 'earning',
      content: 'Fokus bekerja pada jam sibuk (07:00-09:00 dan 16:00-19:00) untuk mendapatkan orderan lebih banyak dan tarif yang lebih tinggi.',
      image: require('../../../assets/images/logo.png'),
      likes: 124,
      saved: true
    },
    {
      id: '2',
      title: 'Tips Keamanan Berkendara Malam Hari',
      category: 'safety',
      content: 'Selalu pastikan lampu kendaraan berfungsi dengan baik. Hindari rute sepi dan selalu laporkan lokasi Anda ke keluarga.',
      image: require('../../../assets/images/logo.png'),
      likes: 89,
      saved: false
    },
    {
      id: '3',
      title: 'Memberikan Pelayanan Terbaik',
      category: 'service',
      content: 'Sapa pelanggan dengan ramah, tawarkan bantuan dengan barang bawaan, dan pastikan kendaraan selalu bersih dan nyaman.',
      image: require('../../../assets/images/logo.png'),
      likes: 156,
      saved: true
    },
    {
      id: '4',
      title: 'Perawatan Rutin Becak Motor',
      category: 'vehicle',
      content: 'Lakukan servis rutin setiap 1 bulan atau 2000 km. Periksa rem, tekanan angin ban, dan oli secara berkala.',
      image: require('../../../assets/images/logo.png'),
      likes: 72,
      saved: false
    },
  ];

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0F3222" translucent barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0F3222', '#1A5D1A']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tips & Panduan</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategory
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tips List */}
        <View style={styles.tipsContainer}>
          {filteredTips.map(tip => (
            <View key={tip.id} style={styles.tipCard}>
              <Image source={tip.image} style={styles.tipImage} />
              <View style={styles.tipContent}>
                <View style={styles.tipCategory}>
                  <Text style={styles.tipCategoryText}>
                    {categories.find(c => c.id === tip.category)?.name}
                  </Text>
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.content}</Text>
                <View style={styles.tipFooter}>
                  <View style={styles.likesContainer}>
                    <MaterialCommunityIcons name="thumb-up" size={16} color="#B1944D" />
                    <Text style={styles.likesText}>{tip.likes} Suka</Text>
                  </View>
                  <TouchableOpacity style={styles.saveButton}>
                    <MaterialCommunityIcons 
                      name={tip.saved ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color="#B1944D" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Tip */}
        <View style={styles.weeklyTip}>
          <Text style={styles.weeklyTipTitle}>TIP MINGGU INI</Text>
          <Text style={styles.weeklyTipContent}>
            Gunakan fitur "Istirahat" saat lelah. Driver yang beristirahat cukup 
            memiliki rating 15% lebih tinggi dan pendapatan 20% lebih banyak.
          </Text>
          <View style={styles.weeklyTipFooter}>
            <Text style={styles.weeklyTipSource}>~ Tim Becak Digital</Text>
          </View>
        </View>

        {/* Popular Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topik Populer</Text>
          <View style={styles.topicsContainer}>
            {[
              'Cara dapat rating 5 bintang',
              'Area terbaik narik',
              'Hadiah driver berprestasi',
              'Promo menarik pelanggan'
            ].map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <MaterialCommunityIcons name="lightbulb-on" size={16} color="#B1944D" />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>
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
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#0F3222',
  },
  categoryText: {
    color: '#555',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#FFF',
  },
  tipsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipImage: {
    width: '100%',
    height: 150,
  },
  tipContent: {
    padding: 16,
  },
  tipCategory: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  tipCategoryText: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: '600',
  },
  tipTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    color: '#B1944D',
    fontSize: 12,
    marginLeft: 4,
  },
  saveButton: {
    padding: 4,
  },
  weeklyTip: {
    backgroundColor: '#B1944D',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  weeklyTipTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  weeklyTipContent: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  weeklyTipFooter: {
    alignItems: 'flex-end',
  },
  weeklyTipSource: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topicText: {
    color: '#0F3222',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default TipsScreen;