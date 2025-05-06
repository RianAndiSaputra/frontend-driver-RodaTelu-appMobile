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
import Footer from '../../components/Footer';

const { width, height } = Dimensions.get('window');

const DriverHomeScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('beranda');
  const [isWaitingForOrder, setIsWaitingForOrder] = useState(false);
  const [showOrderNotification, setShowOrderNotification] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [orderTimeout, setOrderTimeout] = useState(15); // 15 seconds to accept order
  
  // Data dummy driver
  const driverData = {
    name: "Budi Santoso",
    vehicleNumber: "BM 1234 XY",
    rating: 4.8,
    totalTrips: 124,
    balance: 1250000,
    profilePhoto: require('../../assets/images/logo.png')
  };

  // Data dummy order
  const incomingOrder = {
    customerName: "Nurul Hasanah",
    pickupLocation: "Jl. Malioboro No. 52",
    destination: "Keraton Yogyakarta",
    distance: "2.5 km",
    price: "Rp 35.000",
    time: "10 menit"
  };

  // Timer for order notification
  useEffect(() => {
    let timer;
    if (isWaitingForOrder) {
      // Simulate getting an order after 3 seconds
      timer = setTimeout(() => {
        setShowOrderNotification(true);
        Vibration.vibrate([0, 500, 200, 500]); // Vibrate pattern
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isWaitingForOrder]);

  // Countdown timer for order acceptance
  useEffect(() => {
    let interval;
    if (showOrderNotification && orderTimeout > 0) {
      interval = setInterval(() => {
        setOrderTimeout(prev => prev - 1);
      }, 1000);
    } else if (orderTimeout === 0) {
      // Order expired
      setShowOrderNotification(false);
      setIsWaitingForOrder(false);
      setOrderTimeout(15);
    }
    return () => clearInterval(interval);
  }, [showOrderNotification, orderTimeout]);

  const startWaitingForOrder = () => {
    setIsWaitingForOrder(true);
  };

  const acceptOrder = () => {
    setShowOrderNotification(false);
    setIsWaitingForOrder(false);
    setHasActiveOrder(true);
    setOrderTimeout(15);
  };

  const rejectOrder = () => {
    setShowOrderNotification(false);
    setIsWaitingForOrder(false);
    setOrderTimeout(15);
  };

  const continueTrip = () => {
    // Define order object with required properties for navigation page
    const order = {
      id: 1,
      pickupLocation: {
        latitude: -7.7956,
        longitude: 110.3695,
        address: incomingOrder.pickupLocation,
      },
      passenger: {
        name: incomingOrder.customerName,
        photo: 'logo.png',
        rating: 4.5,
      },
      vehicleType: 'Becak Motor',
      paymentMethod: 'Cash',
      notes: '',
    };
    // Navigate to the navigation page with order parameter
    router.push({
      pathname: '/halaman-utama/navigation',
      params: { order: JSON.stringify(order) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0F3222" barStyle="light-content" />
      
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={driverData.profilePhoto} style={styles.profileImage} />
            <View style={styles.profileText}>
              <Text style={styles.greeting}>Selamat datang,</Text>
              <Text style={styles.driverName}>{driverData.name}</Text>
              <View style={styles.ratingContainer}>
                <MaterialCommunityIcons name="star" size={width * 0.04} color="#B1944D" />
                <Text style={styles.ratingText}>{driverData.rating} ({driverData.totalTrips} trip)</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={width * 0.06} color="#FFFFFF" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        
        {/* Nomor Kendaraan */}
        <View style={styles.vehicleCard}>
          <FontAwesome5 name="rickshaw" size={width * 0.06} color="#0F3222" />
          <Text style={styles.vehicleNumber}>{driverData.vehicleNumber}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Saldo */}
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
        
        {/* Order Aktif - Only show when there's an active order */}
        {hasActiveOrder && (
          <View style={styles.activeOrderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>Order Aktif</Text>
              <Text style={styles.orderStatus}>Dalam Perjalanan</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <View style={styles.customerInfo}>
                <Image 
                  source={require('../../assets/images/logo.png')} 
                  style={styles.customerImage} 
                />
                <Text style={styles.customerName}>{incomingOrder.customerName}</Text>
              </View>
              
              <View style={styles.locationContainer}>
                <View style={styles.locationDot} />
                <View style={styles.locationLine} />
                <View style={styles.locationDot} />
              </View>
              
              <View style={styles.locationInfo}>
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Penjemputan:</Text>
                  <Text style={styles.locationText}>{incomingOrder.pickupLocation}</Text>
                </View>
                
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Tujuan:</Text>
                  <Text style={styles.locationText}>{incomingOrder.destination}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.orderFooter}>
              <View style={styles.orderMeta}>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="clock-outline" size={width * 0.04} color="#555555" />
                  <Text style={styles.metaText}>{incomingOrder.time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="map-marker-distance" size={width * 0.04} color="#555555" />
                  <Text style={styles.metaText}>{incomingOrder.distance}</Text>
                </View>
              </View>
              
              <View style={styles.orderPrice}>
                <Text style={styles.priceText}>{incomingOrder.price}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.orderButton} onPress={continueTrip}>
              <Text style={styles.orderButtonText}>Lanjutkan Perjalanan</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Waiting for Order Status */}
        {isWaitingForOrder && !hasActiveOrder && (
          <View style={styles.waitingCard}>
            <View style={styles.waitingIconContainer}>
              <MaterialCommunityIcons name="signal-variant" size={width * 0.1} color="#B1944D" />
            </View>
            <Text style={styles.waitingTitle}>Menunggu Orderan</Text>
            <Text style={styles.waitingText}>Mohon tunggu sebentar, kami sedang mencarikan penumpang untuk Anda</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsWaitingForOrder(false)}>
              <Text style={styles.cancelButtonText}>Batalkan Pencarian</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Menu Utama - Only show when not waiting and no active order */}
        {!isWaitingForOrder && !hasActiveOrder && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.startDrivingButton} onPress={startWaitingForOrder}>
              <View style={styles.startDrivingIcon}>
                <MaterialCommunityIcons name="map-marker-path" size={width * 0.07} color="#FFFFFF" />
              </View>
              <Text style={styles.startDrivingText}>Mulai Narik</Text>
            </TouchableOpacity>
            
            <View style={styles.menuGrid}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <MaterialCommunityIcons name="trophy" size={width * 0.06} color="#0F3222" />
                </View>
                <Text style={styles.menuText}>Pencapaian</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <MaterialCommunityIcons name="chart-line" size={width * 0.06} color="#0F3222" />
                </View>
                <Text style={styles.menuText}>Statistik</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <MaterialCommunityIcons name="lightbulb-on" size={width * 0.06} color="#0F3222" />
                </View>
                <Text style={styles.menuText}>Tips</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Order Notification Modal */}
      <Modal
        visible={showOrderNotification}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { width: width * 0.95 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Orderan Baru!</Text>
              <Text style={styles.modalTimer}>{orderTimeout} detik</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <View style={styles.customerInfo}>
                <Image 
                  source={require('../../assets/images/logo.png')} 
                  style={styles.customerImage} 
                />
                <Text style={styles.customerName}>{incomingOrder.customerName}</Text>
              </View>
              
              <View style={styles.locationContainer}>
                <View style={styles.locationDot} />
                <View style={styles.locationLine} />
                <View style={styles.locationDot} />
              </View>
              
              <View style={styles.locationInfo}>
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Penjemputan:</Text>
                  <Text style={styles.locationText}>{incomingOrder.pickupLocation}</Text>
                </View>
                
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Tujuan:</Text>
                  <Text style={styles.locationText}>{incomingOrder.destination}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.orderFooter}>
              <View style={styles.orderMeta}>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="clock-outline" size={width * 0.04} color="#555555" />
                  <Text style={styles.metaText}>{incomingOrder.time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="map-marker-distance" size={width * 0.04} color="#555555" />
                  <Text style={styles.metaText}>{incomingOrder.distance}</Text>
                </View>
              </View>
              
              <View style={styles.orderPrice}>
                <Text style={styles.priceText}>{incomingOrder.price}</Text>
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.rejectButton} onPress={rejectOrder}>
                <Text style={styles.rejectButtonText}>Tolak</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={acceptOrder}>
                <Text style={styles.acceptButtonText}>Terima</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for footer
  },
  header: {
    backgroundColor: '#0F3222',
    padding: width * 0.06,
    paddingTop: StatusBar.currentHeight + width * 0.02 || width * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },  
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    borderWidth: 2,
    borderColor: '#B1944D',
  },
  profileText: {
    marginLeft: width * 0.03,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
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
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  notificationButton: {
    padding: width * 0.02,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: width * 0.01,
    right: width * 0.01,
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: '#FF3B30',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.04,
    marginTop: -width * 0.05,
    borderRadius: width * 0.03,
    padding: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleNumber: {
    fontSize: width * 0.045,
    fontFamily: 'Montserrat-Bold',
    color: '#0F3222',
    marginLeft: width * 0.03,
    marginRight: 'auto',
  },
  editButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.015,
    borderRadius: width * 0.02,
  },
  editButtonText: {
    color: '#B1944D',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-SemiBold',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    margin: width * 0.04,
    borderRadius: width * 0.03,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceTitle: {
    color: '#555555',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-Regular',
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: width * 0.06,
    fontFamily: 'Montserrat-Bold',
    marginTop: width * 0.02,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: width * 0.04,
    justifyContent: 'space-between',
  },
  balanceButton: {
    backgroundColor: 'rgba(15, 50, 34, 0.05)',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    width: '48%',
    alignItems: 'center',
  },
  balanceButtonText: {
    color: '#0F3222',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-SemiBold',
  },
  activeOrderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.04,
    borderRadius: width * 0.03,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  orderTitle: {
    color: '#0F3222',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
  },
  orderStatus: {
    color: '#B1944D',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-SemiBold',
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  customerInfo: {
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  customerImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: '#F0F0F0',
  },
  customerName: {
    color: '#0F3222',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  locationDot: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: '#B1944D',
  },
  locationLine: {
    width: 2,
    height: height * 0.05,
    backgroundColor: 'rgba(177, 148, 77, 0.5)',
    marginVertical: height * 0.005,
  },
  locationInfo: {
    flex: 1,
  },
  locationItem: {
    marginBottom: height * 0.015,
  },
  locationLabel: {
    color: '#888888',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
  },
  locationText: {
    color: '#0F3222',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-Medium',
    marginTop: height * 0.005,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  orderMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  metaText: {
    color: '#555555',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
    marginLeft: width * 0.01,
  },
  orderPrice: {
    justifyContent: 'center',
  },
  priceText: {
    color: '#0F3222',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
  },
  orderButton: {
    backgroundColor: '#B1944D',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-SemiBold',
  },
  menuContainer: {
    margin: width * 0.04,
    flex: 1,
  },
  startDrivingButton: {
    backgroundColor: '#0F3222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.03,
    marginBottom: height * 0.025,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startDrivingIcon: {
    marginRight: width * 0.03,
  },
  startDrivingText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontFamily: 'Montserrat-Bold',
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  menuItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  menuIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  menuText: {
    color: '#0F3222',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Medium',
  },
  waitingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.04,
    borderRadius: width * 0.03,
    padding: width * 0.06,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  waitingIconContainer: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  waitingTitle: {
    color: '#0F3222',
    fontSize: width * 0.045,
    fontFamily: 'Montserrat-Bold',
    marginBottom: height * 0.01,
  },
  waitingText: {
    color: '#555555',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    borderRadius: width * 0.02,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-SemiBold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    padding: width * 0.05,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  modalTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTimer: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  rejectButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  rejectButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#B1944D',
    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverHomeScreen;