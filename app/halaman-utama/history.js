import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Footer from '../../components/Footer';

const { width, height } = Dimensions.get('window');

const HistoryScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('history');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeDateFilter, setActiveDateFilter] = useState('today');

  // Data dummy untuk history order
  const [orders, setOrders] = useState([
    {
      id: '1',
      customerName: 'Nurul Hasanah',
      date: 'Hari Ini',
      time: '08:30',
      pickupLocation: 'Jl. Malioboro No. 52',
      destination: 'Keraton Yogyakarta',
      price: 35000,
      status: 'completed',
      rating: 5,
      vehicleType: 'Becak Motor',
      distance: '2.5 km',
      duration: '10 menit',
      customerPhoto: require('../../assets/images/logo.png'),
      paymentMethod: 'Tunai'
    },
    {
      id: '2',
      customerName: 'Budi Santoso',
      date: 'Hari Ini',
      time: '14:15',
      pickupLocation: 'Jl. Solo No. 12',
      destination: 'Bandara Adisutjipto',
      price: 75000,
      status: 'completed',
      rating: 4,
      vehicleType: 'Becak Motor',
      distance: '8.2 km',
      duration: '25 menit',
      customerPhoto: require('../../assets/images/logo.png'),
      paymentMethod: 'QRIS'
    },
    {
      id: '3',
      customerName: 'Ani Fitriani',
      date: 'Kemarin',
      time: '18:45',
      pickupLocation: 'Pasar Beringharjo',
      destination: 'Universitas Gadjah Mada',
      price: 25000,
      status: 'cancelled',
      rating: null,
      vehicleType: 'Becak Motor',
      distance: '1.8 km',
      duration: '7 menit',
      customerPhoto: require('../../assets/images/logo.png'),
      paymentMethod: 'Tunai'
    },
    {
      id: '4',
      customerName: 'Rudi Hartono',
      date: '14 Jun',
      time: '09:20',
      pickupLocation: 'Hotel Phoenix',
      destination: 'Stasiun Tugu',
      price: 30000,
      status: 'completed',
      rating: 5,
      vehicleType: 'Becak Motor',
      distance: '3.1 km',
      duration: '12 menit',
      customerPhoto: require('../../assets/images/logo.png'),
      paymentMethod: 'QRIS'
    },
  ]);

  // Filter data
  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const searchedOrders = filteredOrders.filter(order => {
    return (
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.customerInfo}>
          <Image source={item.customerPhoto} style={styles.customerImage} />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <View style={styles.orderMeta}>
              <Text style={styles.orderDate}>{item.date} • {item.time}</Text>
              <View style={[
                styles.statusBadge,
                item.status === 'completed' ? styles.completedBadge : styles.cancelledBadge
              ]}>
                <Text style={styles.statusText}>
                  {item.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <View style={styles.locationDotStart} />
            <Text style={styles.locationText}>{item.pickupLocation}</Text>
          </View>
          
          <View style={styles.locationLine} />
          
          <View style={styles.locationRow}>
            <View style={styles.locationDotEnd} />
            <Text style={styles.locationText}>{item.destination}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderFooter}>
        <View style={styles.paymentContainer}>
          {item.paymentMethod === 'QRIS' ? (
            <FontAwesome5 name="qrcode" size={16} color="#B1944D" />
          ) : (
            <FontAwesome5 name="money-bill-wave" size={16} color="#B1944D" />
          )}
          <Text style={styles.paymentText}>{item.paymentMethod}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="map-marker-distance" size={16} color="#888888" />
            <Text style={styles.statText}>{item.distance}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#888888" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Rp{item.price.toLocaleString('id-ID')}</Text>
          {item.status === 'completed' && item.rating && (
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0F3222" barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0F3222', '#1A5D1A']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Riwayat Orderan</Text>
        <Text style={styles.headerSubtitle}>{searchedOrders.length} order ditemukan</Text>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari riwayat orderan..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
              <Ionicons name="close-circle" size={20} color="#888888" />
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {['all', 'completed', 'cancelled'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter === 'all' && 'Semua'}
                {filter === 'completed' && 'Selesai'}
                {filter === 'cancelled' && 'Dibatalkan'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateFilterContainer}
        >
          {['today', 'yesterday', 'week', 'month'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.dateFilterButton,
                activeDateFilter === filter && styles.activeDateFilter
              ]}
              onPress={() => setActiveDateFilter(filter)}
            >
              <Text style={[
                styles.dateFilterText,
                activeDateFilter === filter && styles.activeDateFilterText
              ]}>
                {filter === 'today' && 'Hari Ini'}
                {filter === 'yesterday' && 'Kemarin'}
                {filter === 'week' && 'Minggu Ini'}
                {filter === 'month' && 'Bulan Ini'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Order List */}
      <FlatList
        data={searchedOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0F3222']}
            tintColor="#0F3222"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons 
              name="clipboard-text-outline" 
              size={width * 0.2} 
              color="#E0E0E0" 
            />
            <Text style={styles.emptyText}>Tidak ada riwayat orderan</Text>
            <Text style={styles.emptySubText}>Anda belum memiliki riwayat orderan untuk filter ini</Text>
          </View>
        }
      />
      
      {/* Footer Navigation */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  searchFilterContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333333',
  },
  clearSearchButton: {
    padding: 5,
  },
  filterContainer: {
    paddingBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#0F3222',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  dateFilterContainer: {
    paddingBottom: 5,
  },
  dateFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  activeDateFilter: {
    backgroundColor: '#0F3222',
  },
  dateFilterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555555',
  },
  activeDateFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F3222',
    marginBottom: 5,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 13,
    color: '#888888',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  cancelledBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedText: {
    color: '#4CAF50',
  },
  cancelledText: {
    color: '#F44336',
  },
  orderDetails: {
    marginBottom: 15,
  },
  locationContainer: {
    marginLeft: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationDotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  locationDotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
    marginRight: 10,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.3)',
    marginLeft: 5,
    marginVertical: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 13,
    color: '#0F3222',
    marginLeft: 5,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statText: {
    fontSize: 13,
    color: '#555555',
    marginLeft: 5,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888888',
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});

export default HistoryScreen;