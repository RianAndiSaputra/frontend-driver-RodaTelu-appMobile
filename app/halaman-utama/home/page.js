import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import Footer from '../../../components/Footer';

const { width, height } = Dimensions.get('window');

const DriverHomeScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('beranda');
  const [isWaitingForOrder, setIsWaitingForOrder] = useState(false);
  const [showOrderNotification, setShowOrderNotification] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [orderTimeout, setOrderTimeout] = useState(15); // 15 seconds to accept order
  
  // Driver data
  const driverData = {
    name: "Budi Santoso",
    vehicleNumber: "BM 1234 XY",
    rating: 4.8,
    totalTrips: 124,
    balance: 1250000,
    profilePhoto: require('../../../assets/images/logo.png')
  };

  // Order data
  const incomingOrder = {
    id: 1,
    customerName: "Nurul Hasanah",
    pickupLocation: "Jl. Malioboro No. 52",
    destination: "Keraton Yogyakarta",
    distance: "2.5 km",
    price: "Rp 35.000",
    time: "10 menit",
    pickupCoords: {
      latitude: -7.7956,
      longitude: 110.3695
    },
    destinationCoords: {
      latitude: -7.8056,
      longitude: 110.3642
    }
  };

  // Simulate getting an order
  useEffect(() => {
    let timer;
    if (isWaitingForOrder) {
      timer = setTimeout(() => {
        setShowOrderNotification(true);
        Vibration.vibrate([0, 500, 200, 500]);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isWaitingForOrder]);

  // Countdown for order acceptance
  useEffect(() => {
    let interval;
    if (showOrderNotification && orderTimeout > 0) {
      interval = setInterval(() => {
        setOrderTimeout(prev => prev - 1);
      }, 1000);
    } else if (orderTimeout === 0) {
      handleOrderExpired();
    }
    return () => clearInterval(interval);
  }, [showOrderNotification, orderTimeout]);

  const startWaitingForOrder = () => {
    setIsWaitingForOrder(true);
    setShowOrderNotification(false);
    setHasActiveOrder(false);
    setOrderTimeout(15);
  };

  const handleOrderExpired = () => {
    setShowOrderNotification(false);
    setIsWaitingForOrder(false);
    setOrderTimeout(15);
  };

  const acceptOrder = () => {
    setShowOrderNotification(false);
    setIsWaitingForOrder(false);
    setHasActiveOrder(true);
    setOrderTimeout(15);
  };

  const rejectOrder = () => {
    handleOrderExpired();
  };

  const continueTrip = () => {
    router.push({
      pathname: '/halaman-utama/navigation/page',
      params: { 
        order: JSON.stringify({
          ...incomingOrder,
          passenger: {
            name: incomingOrder.customerName,
            photo: 'logo.png',
            rating: 4.5,
          },
          vehicleType: 'Becak Motor',
          paymentMethod: 'Cash',
          notes: '',
        })
      },
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image source={driverData.profilePhoto} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.greeting}>Selamat datang,</Text>
          <Text style={styles.driverName}>{driverData.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#B1944D" />
            <Text style={styles.ratingText}>{driverData.rating} ({driverData.totalTrips} trip)</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>
  );

  const renderVehicleInfo = () => (
    <View style={styles.vehicleCard}>
      <FontAwesome5 name="rickshaw" size={24} color="#0F3222" />
      <Text style={styles.vehicleNumber}>{driverData.vehicleNumber}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Saldo Anda</Text>
      <Text style={styles.balanceAmount}>Rp {driverData.balance.toLocaleString('id-ID')}</Text>
      <View style={styles.balanceActions}>
        <TouchableOpacity style={styles.balanceButton}>
          <Text style={styles.balanceButtonText}>Tarik Dana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.balanceButton}>
          <Text style={styles.balanceButtonText}>Riwayat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderDetails = (order, isModal = false) => (
    <>
      <View style={styles.orderDetail}>
        <View style={styles.customerInfo}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.customerImage} 
          />
          <Text style={styles.customerName}>{order.customerName}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationDot} />
          <View style={styles.locationLine} />
          <View style={styles.locationDot} />
        </View>
        
        <View style={styles.locationInfo}>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Penjemputan:</Text>
            <Text style={styles.locationText}>{order.pickupLocation}</Text>
          </View>
          
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Tujuan:</Text>
            <Text style={styles.locationText}>{order.destination}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.orderFooter}>
        <View style={styles.orderMeta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#555555" />
            <Text style={styles.metaText}>{order.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="map-marker-distance" size={16} color="#555555" />
            <Text style={styles.metaText}>{order.distance}</Text>
          </View>
        </View>
        
        <View style={styles.orderPrice}>
          <Text style={styles.priceText}>{order.price}</Text>
        </View>
      </View>
      
      {!isModal && (
        <TouchableOpacity style={styles.orderButton} onPress={continueTrip}>
          <Text style={styles.orderButtonText}>Lanjutkan Perjalanan</Text>
        </TouchableOpacity>
      )}
    </>
  );

  const renderActiveOrder = () => (
    <View style={styles.activeOrderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order Aktif</Text>
        <Text style={styles.orderStatus}>Dalam Perjalanan</Text>
      </View>
      {renderOrderDetails(incomingOrder)}
    </View>
  );

  const renderWaitingForOrder = () => (
    <View style={styles.waitingCard}>
      <View style={styles.waitingIconContainer}>
        <MaterialCommunityIcons name="signal-variant" size={40} color="#B1944D" />
      </View>
      <Text style={styles.waitingTitle}>Menunggu Orderan</Text>
      <Text style={styles.waitingText}>
        Mohon tunggu sebentar, kami sedang mencarikan penumpang untuk Anda
      </Text>
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => setIsWaitingForOrder(false)}
      >
        <Text style={styles.cancelButtonText}>Batalkan Pencarian</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMainMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.startDrivingButton} onPress={startWaitingForOrder}>
        <View style={styles.startDrivingIcon}>
          <MaterialCommunityIcons name="map-marker-path" size={28} color="#FFFFFF" />
        </View>
        <Text style={styles.startDrivingText}>Mulai Narik</Text>
      </TouchableOpacity>
      
      <View style={styles.menuGrid}>
        {[
          { icon: 'trophy', label: 'Pencapaian' },
          { icon: 'chart-line', label: 'Statistik' },
          { icon: 'lightbulb-on', label: 'Tips' }
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#0F3222" />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderOrderNotificationModal = () => (
    <Modal
      visible={showOrderNotification}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Orderan Baru!</Text>
            <Text style={styles.modalTimer}>{orderTimeout} detik</Text>
          </View>
          
          {renderOrderDetails(incomingOrder, true)}
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.rejectButton]} 
              onPress={rejectOrder}
            >
              <Text style={styles.rejectButtonText}>Tolak</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.acceptButton]} 
              onPress={acceptOrder}
            >
              <Text style={styles.acceptButtonText}>Terima</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.fullContainer}>
      <StatusBar backgroundColor="#0F3222" translucent barStyle="light-content" />
      
      {/* Header with proper status bar spacing */}
      <View style={styles.headerContainer}>
        {renderHeader()}
      </View>

      {/* Main content area */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderVehicleInfo()}
          {renderBalanceCard()}
          
          {/* Conditional rendering based on driver state */}
          {hasActiveOrder && renderActiveOrder()}
          {isWaitingForOrder && !hasActiveOrder && renderWaitingForOrder()}
          {!isWaitingForOrder && !hasActiveOrder && renderMainMenu()}
        </ScrollView>
      </SafeAreaView>
      
      {/* Order Notification Modal */}
      {renderOrderNotificationModal()}
      
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
  headerContainer: {
    backgroundColor: '#0F3222',
    paddingTop: StatusBar.currentHeight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#B1944D',
  },
  profileText: {
    marginLeft: 12,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: '#B1944D',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleNumber: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#0F3222',
    marginLeft: 12,
    marginRight: 'auto',
  },
  editButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#B1944D',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceTitle: {
    color: '#555555',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  balanceButton: {
    backgroundColor: 'rgba(15, 50, 34, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  balanceButtonText: {
    color: '#0F3222',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  activeOrderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  orderStatus: {
    color: '#B1944D',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  customerInfo: {
    alignItems: 'center',
    marginRight: 16,
  },
  customerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
  },
  customerName: {
    color: '#0F3222',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B1944D',
  },
  locationLine: {
    width: 2,
    height: 40,
    backgroundColor: 'rgba(177, 148, 77, 0.5)',
    marginVertical: 4,
  },
  locationInfo: {
    flex: 1,
  },
  locationItem: {
    marginBottom: 12,
  },
  locationLabel: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  locationText: {
    color: '#0F3222',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    color: '#555555',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
  },
  orderPrice: {
    justifyContent: 'center',
  },
  priceText: {
    color: '#0F3222',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  orderButton: {
    backgroundColor: '#B1944D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  waitingCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  waitingIconContainer: {
    marginBottom: 16,
  },
  waitingTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  waitingText: {
    color: '#555555',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#B1944D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#B1944D',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  menuContainer: {
    margin: 16,
  },
  startDrivingButton: {
    backgroundColor: '#B1944D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  startDrivingIcon: {
    marginRight: 12,
  },
  startDrivingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    alignItems: 'center',
    width: '30%',
  },
  menuIcon: {
    backgroundColor: 'rgba(15, 50, 34, 0.05)',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  menuText: {
    color: '#0F3222',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  modalTimer: {
    color: '#FF3B30',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  rejectButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  acceptButton: {
    backgroundColor: '#B1944D',
  },
  rejectButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default DriverHomeScreen;