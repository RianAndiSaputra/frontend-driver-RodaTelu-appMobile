import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
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
import Footer from '../../../components/Footer';

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
      customerPhoto: require('../../../assets/images/logo.png'),
      paymentMethod: 'Tunai'
    },
    // ... (other order data remains the same)
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
      {/* ... (order item rendering remains the same) */}
    </View>
  );

  return (
    <View style={styles.fullContainer}>
      <StatusBar backgroundColor="#0F3222" translucent={true} barStyle="light-content" />
      
      {/* Header with proper spacing for status bar */}
      <LinearGradient
        colors={['#0F3222', '#1A5D1A']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Riwayat Orderan</Text>
          <Text style={styles.headerSubtitle}>{searchedOrders.length} order ditemukan</Text>
        </View>
      </LinearGradient>

      {/* Main content with SafeAreaView */}
      <SafeAreaView style={styles.safeArea}>
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
          style={styles.listContainer}
        />
      </SafeAreaView>
      
      {/* Footer Navigation */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 30,
    borderBottomLeftRadius: 50,  
    borderBottomRightRadius: 50, 
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 15,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  // ... (other styles remain the same)
});

export default HistoryScreen;