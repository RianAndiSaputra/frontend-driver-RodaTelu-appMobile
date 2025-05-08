import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const NewAchievementScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('progress');
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  // User progress data
  const userProgress = {
    level: 4,
    currentXP: 1250,
    nextLevelXP: 2000,
    progressPercent: 62.5,
    streakDays: 7,
    completedAchievements: 18,
    totalAchievements: 25
  };

  // Achievement categories
  const categories = [
    { id: 'all', name: 'Semua', icon: 'star-circle-outline' },
    { id: 'riding', name: 'Berkendara', icon: 'motorbike' },
    { id: 'earning', name: 'Penghasilan', icon: 'cash' },
    { id: 'service', name: 'Pelayanan', icon: 'face-agent' },
    { id: 'challenge', name: 'Tantangan', icon: 'flag-checkered' },
  ];

  // Achievements data
  const achievements = [
    {
      id: '1',
      title: 'Pendatang Baru',
      description: 'Selesaikan 5 perjalanan pertama',
      category: 'riding',
      progress: 5,
      target: 5,
      reward: 'Rp 25.000',
      icon: 'medal',
      color: '#FFD700',
      status: 'completed',
      rewardClaimed: true,
      tips: 'Terus terima order untuk menyelesaikan pencapaian ini lebih cepat'
    },
    {
      id: '2',
      title: 'Ahli Jalanan',
      description: 'Tempuh 1000 km total',
      category: 'riding',
      progress: 680,
      target: 1000,
      reward: 'Rp 100.000',
      icon: 'road',
      color: '#4CAF50',
      status: 'in-progress',
      rewardClaimed: false,
      tips: 'Fokus pada order dengan jarak menengah (3-5km) untuk efisiensi'
    },
    {
      id: '3',
      title: 'Bintang 5 Konsisten',
      description: 'Dapatkan rating 5 bintang 20 kali berturut-turut',
      category: 'service',
      progress: 12,
      target: 20,
      reward: 'Rp 75.000',
      icon: 'star',
      color: '#2196F3',
      status: 'in-progress',
      rewardClaimed: false,
      tips: 'Sapa pelanggan dengan ramah dan pastikan kendaraan bersih'
    },
    {
      id: '4',
      title: 'Master Penghasilan',
      description: 'Dapatkan Rp 5.000.000 dalam seminggu',
      category: 'earning',
      progress: 3250000,
      target: 5000000,
      reward: 'Rp 150.000',
      icon: 'trending-up',
      color: '#9C27B0',
      status: 'in-progress',
      rewardClaimed: false,
      tips: 'Aktif pada jam sibuk dan manfaatkan zona bonus'
    },
    {
      id: '5',
      title: 'Pelopor Daerah',
      description: 'Jelajahi 10 zona baru',
      category: 'challenge',
      progress: 6,
      target: 10,
      reward: 'Rp 50.000',
      icon: 'map-marker-radius',
      color: '#FF9800',
      status: 'in-progress',
      rewardClaimed: false,
      tips: 'Coba terima order ke daerah yang belum pernah Anda kunjungi'
    },
    {
      id: '6',
      title: 'Raja Jam Sibuk',
      description: 'Selesaikan 30 order pada jam sibuk',
      category: 'riding',
      progress: 30,
      target: 30,
      reward: 'Rp 120.000',
      icon: 'clock-fast',
      color: '#E91E63',
      status: 'completed',
      rewardClaimed: false,
      tips: 'Jam sibuk biasanya 07:00-09:00 dan 16:00-19:00'
    },
  ];

  // Badges data
  const badges = [
    { id: '1', name: 'Pemula', icon: 'medal', tier: 'bronze', earned: true, date: '12 Jun 2023' },
    { id: '2', name: 'Ahli', icon: 'trophy', tier: 'silver', earned: true, date: '25 Jul 2023' },
    { id: '3', name: 'Master', icon: 'crown', tier: 'gold', earned: false, date: '' },
    { id: '4', name: 'Legend', icon: 'diamond', tier: 'platinum', earned: false, date: '' },
    { id: '5', name: 'Pelopor', icon: 'flag', tier: 'silver', earned: true, date: '5 Agu 2023' },
  ];

  // Stats data
  const stats = [
    { id: '1', label: 'Total Perjalanan', value: '247', icon: 'map-marker-path', change: '+12%' },
    { id: '2', label: 'KM Ditempuh', value: '1.856 km', icon: 'map-marker-distance', change: '+18%' },
    { id: '3', label: 'Rating Rata-rata', value: '4.8', icon: 'star', change: '+0.2' },
    { id: '4', label: 'Pelanggan Setia', value: '14', icon: 'heart', change: '+3' },
  ];

  // Progress chart data
  const progressChartData = {
    labels: ["Progress"],
    data: [userProgress.progressPercent / 100],
    colors: ["rgba(177, 148, 77, 0.8)"]
  };

  const toggleAchievementExpansion = (id) => {
    setExpandedAchievement(expandedAchievement === id ? null : id);
  };

  const renderLevelCard = () => (
    <LinearGradient
      colors={['#0F3222', '#1A5D1A']}
      style={styles.levelCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.levelContent}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelLabel}>LEVEL ANDA</Text>
          <Text style={styles.levelValue}>{userProgress.level}</Text>
          <Text style={styles.levelTitle}>Ahli Becak</Text>
        </View>
        
        <View style={styles.progressChart}>
          <ProgressChart
            data={progressChartData}
            width={100}
            height={100}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            hideLegend={true}
            strokeWidth={8}
          />
          <Text style={styles.progressText}>{userProgress.progressPercent}%</Text>
        </View>
      </View>
      
      <View style={styles.xpContainer}>
        <Text style={styles.xpText}>
          {userProgress.currentXP.toLocaleString()}/{userProgress.nextLevelXP.toLocaleString()} XP
        </Text>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${userProgress.progressPercent}%` }]} />
        </View>
      </View>
    </LinearGradient>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map(stat => (
        <View key={stat.id} style={styles.statCard}>
          <View style={styles.statIcon}>
            <MaterialCommunityIcons name={stat.icon} size={20} color="#B1944D" />
          </View>
          <View style={styles.statText}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
          <Text style={styles.statChange}>{stat.change}</Text>
        </View>
      ))}
    </View>
  );

  const renderAchievementItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.achievementCard,
        item.status === 'completed' && styles.completedCard,
      ]}
      onPress={() => toggleAchievementExpansion(item.id)}
    >
      <View style={[styles.achievementIcon, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#FFF" />
      </View>
      
      <View style={styles.achievementContent}>
        <View style={styles.achievementHeader}>
          <Text style={styles.achievementTitle}>{item.title}</Text>
          {item.status === 'completed' && (
            <View style={styles.completedBadge}>
              <MaterialCommunityIcons name="check" size={16} color="#FFF" />
            </View>
          )}
        </View>
        
        <Text style={styles.achievementDesc}>{item.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { 
                width: `${(item.progress / item.target) * 100}%`,
                backgroundColor: item.color
              }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {item.progress}/{item.target}
          </Text>
        </View>
        
        {expandedAchievement === item.id && (
          <View style={styles.expandedContent}>
            <View style={styles.tipContainer}>
              <MaterialCommunityIcons name="lightbulb-on" size={16} color="#B1944D" />
              <Text style={styles.tipText}>{item.tips}</Text>
            </View>
            
            <View style={styles.rewardContainer}>
              <Text style={styles.rewardLabel}>Hadiah:</Text>
              <Text style={styles.rewardValue}>{item.reward}</Text>
              {item.status === 'completed' ? (
                <TouchableOpacity 
                  style={[
                    styles.claimButton,
                    item.rewardClaimed && styles.claimedButton
                  ]}
                  disabled={item.rewardClaimed}
                >
                  <Text style={styles.claimButtonText}>
                    {item.rewardClaimed ? 'Terkumpul' : 'Klaim'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.lockedText}>Selesaikan untuk klaim</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderBadgeItem = ({ item }) => (
    <View style={styles.badgeCard}>
      <View style={[
        styles.badgeIconContainer,
        item.earned ? styles[`${item.tier}Badge`] : styles.lockedBadge
      ]}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={32} 
          color={item.earned ? '#FFF' : '#AAA'} 
        />
      </View>
      <Text style={styles.badgeName}>{item.name}</Text>
      <Text style={styles.badgeTier}>{item.tier}</Text>
      {item.earned ? (
        <Text style={styles.badgeDate}>Diperoleh: {item.date}</Text>
      ) : (
        <Text style={styles.badgeLocked}>Terkunci</Text>
      )}
    </View>
  );

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
          <Text style={styles.headerTitle}>Pencapaian</Text>
          <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={18} color="#FFF" />
            <Text style={styles.streakText}>{userProgress.streakDays}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Level Progress */}
        {renderLevelCard()}
        
        {/* Stats Overview */}
        {renderStats()}
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'progress' && styles.activeTab
            ]}
            onPress={() => setActiveTab('progress')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'progress' && styles.activeTabText
            ]}>
              Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'badges' && styles.activeTab
            ]}
            onPress={() => setActiveTab('badges')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'badges' && styles.activeTabText
            ]}>
              Lencana
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Content based on active tab */}
        {activeTab === 'progress' ? (
          <>
            {/* Achievements Progress */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Pencapaian ({userProgress.completedAchievements}/{userProgress.totalAchievements})
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryButton}
                >
                  <MaterialCommunityIcons 
                    name={category.icon} 
                    size={20} 
                    color="#0F3222" 
                  />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Achievements List */}
            <FlatList
              data={achievements}
              renderItem={renderAchievementItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.achievementsList}
            />
          </>
        ) : (
          <>
            {/* Badges Collection */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Koleksi Lencana</Text>
              <Text style={styles.badgeProgress}>
                {badges.filter(b => b.earned).length}/{badges.length} Dikumpulkan
              </Text>
            </View>
            
            <FlatList
              data={badges}
              renderItem={renderBadgeItem}
              keyExtractor={item => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.badgesRow}
              contentContainerStyle={styles.badgesContainer}
            />
            
            {/* Badge Tiers Explanation */}
            <View style={styles.tiersContainer}>
              <Text style={styles.tiersTitle}>Tingkatan Lencana</Text>
              <View style={styles.tiersRow}>
                <View style={styles.tierItem}>
                  <View style={[styles.tierBadge, styles.bronzeBadge]}>
                    <MaterialCommunityIcons name="medal" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.tierName}>Perunggu</Text>
                </View>
                <View style={styles.tierItem}>
                  <View style={[styles.tierBadge, styles.silverBadge]}>
                    <MaterialCommunityIcons name="trophy" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.tierName}>Perak</Text>
                </View>
                <View style={styles.tierItem}>
                  <View style={[styles.tierBadge, styles.goldBadge]}>
                    <MaterialCommunityIcons name="crown" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.tierName}>Emas</Text>
                </View>
                <View style={styles.tierItem}>
                  <View style={[styles.tierBadge, styles.platinumBadge]}>
                    <MaterialCommunityIcons name="diamond" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.tierName}>Platinum</Text>
                </View>
              </View>
            </View>
          </>
        )}
        
        {/* Special Challenge */}
        <View style={styles.challengeCard}>
          <LinearGradient
            colors={['#B1944D', '#D4AF37']}
            style={styles.challengeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.challengeTitle}>TANTANGAN SPESIAL</Text>
            <Text style={styles.challengeDesc}>
              Selesaikan 50 perjalanan dalam 7 hari untuk mendapatkan bonus Rp 200.000
            </Text>
            <View style={styles.challengeProgress}>
              <Text style={styles.challengeProgressText}>12/50 (3 hari tersisa)</Text>
              <View style={styles.challengeBar}>
                <View style={[styles.challengeFill, { width: '24%' }]} />
              </View>
            </View>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Ikuti Tantangan</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  streakText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  levelCard: {
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  levelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelValue: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  levelTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  progressChart: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  xpContainer: {
    marginTop: 8,
  },
  xpText: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 4,
  },
  xpBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    flex: 1,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  statValue: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  statChange: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#0F3222',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#B1944D',
    fontSize: 14,
  },
  badgeProgress: {
    color: '#888',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: '#0F3222',
    fontSize: 14,
    marginLeft: 8,
  },
  achievementsList: {
    paddingHorizontal: 16,
  },
  achievementCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    borderWidth: 1,
    borderColor: '#B1944D',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  achievementDesc: {
    color: '#888',
    fontSize: 14,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEE',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipText: {
    color: '#0F3222',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    color: '#888',
    fontSize: 14,
    marginRight: 8,
  },
  rewardValue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  claimButton: {
    backgroundColor: '#B1944D',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  claimedButton: {
    backgroundColor: '#4CAF50',
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lockedText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  badgesContainer: {
    paddingHorizontal: 16,
  },
  badgesRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bronzeBadge: {
    backgroundColor: '#CD7F32',
  },
  silverBadge: {
    backgroundColor: '#C0C0C0',
  },
  goldBadge: {
    backgroundColor: '#FFD700',
  },
  platinumBadge: {
    backgroundColor: '#E5E4E2',
  },
  lockedBadge: {
    backgroundColor: '#EEE',
  },
  badgeName: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  badgeTier: {
    color: '#888',
    fontSize: 12,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  badgeDate: {
    color: '#B1944D',
    fontSize: 10,
  },
  badgeLocked: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  tiersContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tiersTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tiersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tierItem: {
    alignItems: 'center',
  },
  tierBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tierName: {
    color: '#888',
    fontSize: 12,
  },
  challengeCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  challengeGradient: {
    padding: 20,
  },
  challengeTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  challengeDesc: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  challengeProgress: {
    marginBottom: 16,
  },
  challengeProgressText: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 4,
  },
  challengeBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  challengeFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  challengeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  challengeButtonText: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NewAchievementScreen;