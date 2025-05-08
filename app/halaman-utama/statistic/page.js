import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
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
import { BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const StatisticsScreen = () => {
  const router = useRouter();

  // Weekly earnings data
  const weeklyEarnings = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        data: [350000, 420000, 380000, 510000, 490000, 620000, 580000],
        colors: [
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
          (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
        ]
      }
    ]
  };

  // Payment method data
  const paymentData = [
    {
      name: "Tunai",
      population: 65,
      color: "#B1944D",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "QRIS",
      population: 35,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ];

  // Stats data
  const stats = [
    { id: '1', label: 'Total Perjalanan', value: '124', icon: 'map-marker-path', trend: 'up' },
    { id: '2', label: 'KM Ditempuh', value: '856 km', icon: 'map-marker-distance', trend: 'up' },
    { id: '3', label: 'Pendapatan', value: 'Rp 4.250.000', icon: 'cash', trend: 'up' },
    { id: '4', label: 'Rating', value: '4.8', icon: 'star', trend: 'steady' },
    { id: '5', label: 'Pelanggan Setia', value: '8', icon: 'heart', trend: 'up' },
    { id: '6', label: 'Waktu Online', value: '56 jam', icon: 'clock', trend: 'down' },
  ];

  // Recent trips
  const recentTrips = [
    { id: '1', time: '08:30', earnings: 'Rp 35.000', rating: 5 },
    { id: '2', time: '12:45', earnings: 'Rp 42.000', rating: 4 },
    { id: '3', time: '15:20', earnings: 'Rp 28.000', rating: 5 },
    { id: '4', time: '18:15', earnings: 'Rp 50.000', rating: 5 },
  ];

  const renderStatItem = ({ item }) => (
    <View style={styles.statItem}>
      <View style={styles.statIcon}>
        <MaterialCommunityIcons name={item.icon} size={20} color="#B1944D" />
      </View>
      <View style={styles.statTextContainer}>
        <Text style={styles.statLabel}>{item.label}</Text>
        <Text style={styles.statValue}>{item.value}</Text>
      </View>
      <View style={styles.trendIcon}>
        {item.trend === 'up' && <MaterialCommunityIcons name="trending-up" size={20} color="#4CAF50" />}
        {item.trend === 'down' && <MaterialCommunityIcons name="trending-down" size={20} color="#F44336" />}
        {item.trend === 'steady' && <MaterialCommunityIcons name="trending-neutral" size={20} color="#FFC107" />}
      </View>
    </View>
  );

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <View style={styles.tripTime}>
        <Text style={styles.tripTimeText}>{item.time}</Text>
      </View>
      <View style={styles.tripEarnings}>
        <Text style={styles.tripEarningsText}>{item.earnings}</Text>
      </View>
      <View style={styles.tripRating}>
        <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
        <Text style={styles.tripRatingText}>{item.rating}</Text>
      </View>
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
          <Text style={styles.headerTitle}>Statistik</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Hari Ini</Text>
            <Text style={styles.summaryValue}>Rp 285.000</Text>
            <Text style={styles.summaryChange}>+12% dari kemarin</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Minggu Ini</Text>
            <Text style={styles.summaryValue}>Rp 1.850.000</Text>
            <Text style={styles.summaryChange}>+8% dari minggu lalu</Text>
          </View>
        </View>

        {/* Earnings Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pendapatan Mingguan</Text>
          <BarChart
            data={weeklyEarnings}
            width={width - 64}
            height={220}
            yAxisLabel="Rp "
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(177, 148, 77, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#B1944D"
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <View style={styles.paymentContainer}>
            <PieChart
              data={paymentData}
              width={width - 64}
              height={160}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistik Utama</Text>
          <FlatList
            data={stats}
            renderItem={renderStatItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.statsGrid}
            contentContainerStyle={styles.statsContainer}
          />
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perjalanan Terakhir</Text>
          <FlatList
            data={recentTrips}
            renderItem={renderTripItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.tripsList}
          />
        </View>

        {/* Best Times */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Waktu Terbaik</Text>
          <View style={styles.timeSlotContainer}>
            <View style={styles.timeSlot}>
              <Text style={styles.timeSlotLabel}>Pagi</Text>
              <Text style={styles.timeSlotValue}>08:00 - 10:00</Text>
              <Text style={styles.timeSlotEarnings}>Rp 125.000</Text>
            </View>
            <View style={styles.timeSlot}>
              <Text style={styles.timeSlotLabel}>Sore</Text>
              <Text style={styles.timeSlotValue}>16:00 - 18:00</Text>
              <Text style={styles.timeSlotEarnings}>Rp 185.000</Text>
            </View>
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryChange: {
    color: '#4CAF50',
    fontSize: 12,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentContainer: {
    alignItems: 'center',
  },
  statsContainer: {
    paddingTop: 8,
  },
  statsGrid: {
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  statIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTextContainer: {
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
  trendIcon: {
    marginLeft: 8,
  },
  tripsList: {
    paddingTop: 8,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tripTime: {
    width: 60,
  },
  tripTimeText: {
    color: '#0F3222',
    fontSize: 14,
  },
  tripEarnings: {
    flex: 1,
  },
  tripEarningsText: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
  },
  tripRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripRatingText: {
    color: '#0F3222',
    fontSize: 14,
    marginLeft: 4,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  timeSlotLabel: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeSlotValue: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  timeSlotEarnings: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StatisticsScreen;