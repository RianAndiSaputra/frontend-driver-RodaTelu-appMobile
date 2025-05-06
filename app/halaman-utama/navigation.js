import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../../config';

const { width, height } = Dimensions.get('window');

const DriverNavigationScreen = () => {
  // Get order param from search params
  const params = useLocalSearchParams();
  let order = {};
  try {
    order = JSON.parse(params.order);
  } catch {
    order = params.order || {};
  }

  // Map photo string identifier to actual image source
  const photoMapping = {
    'logo.png': require('../../assets/images/logo.png'),
  };

  // Replace photo string with actual image source if applicable
  if (order.passenger && typeof order.passenger.photo === 'string') {
    order.passenger.photo = photoMapping[order.passenger.photo] || null;
  }
  
  // Refs
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  
  // State
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination] = useState({
    latitude: order.pickupLocation?.latitude,
    longitude: order.pickupLocation?.longitude,
  });
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isNavigating, setIsNavigating] = useState(true);
  const [arrived, setArrived] = useState(false);
  const [eta, setEta] = useState('Menghitung...');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showAlternateRoutes, setShowAlternateRoutes] = useState(false);
  const [alternateRoutes, setAlternateRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [trafficInfo, setTrafficInfo] = useState({
    congestionLevel: 'sedang',
    speed: 30,
  });

  // Snap points untuk bottom sheet
  const snapPoints = ['25%', '50%', '75%'];

  // Dapatkan lokasi saat ini
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Track lokasi realtime
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentLocation({ latitude, longitude });
          
          // Periksa apakah sudah sampai tujuan
          if (calculateDistance(latitude, longitude, destination.latitude, destination.longitude) < 50) {
            setArrived(true);
            setIsNavigating(false);
          }
          
          // Update map view
          if (mapRef.current && isNavigating) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  // Hitung jarak antara dua titik
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * 
      Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Jarak dalam meter
    return distance;
  };

  // Handle ketika rute siap
  const handleReady = (result) => {
    setDistance(result.distance);
    setDuration(result.duration);
    setRouteCoordinates(result.coordinates);
    setEta(formatDuration(result.duration));
  };

  // Format durasi menjadi menit
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration);
    return `${minutes} menit`;
  };

  // Cari rute alternatif
  const findAlternateRoutes = async () => {
    try {
      // Simulasi rute alternatif (dalam implementasi nyata, gunakan API Directions)
      const mockAlternateRoutes = [
        {
          distance: distance * 1.2,
          duration: duration * 1.3,
          coordinates: [
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: currentLocation.latitude + 0.01, longitude: currentLocation.longitude + 0.01 },
            { latitude: destination.latitude, longitude: destination.longitude },
          ],
        },
        {
          distance: distance * 0.9,
          duration: duration * 0.8,
          coordinates: [
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: currentLocation.latitude - 0.01, longitude: currentLocation.longitude - 0.01 },
            { latitude: destination.latitude, longitude: destination.longitude },
          ],
        },
      ];
      
      setAlternateRoutes(mockAlternateRoutes);
      setShowAlternateRoutes(true);
    } catch (error) {
      console.error('Error finding alternate routes:', error);
    }
  };

  // Pilih rute alternatif
  const selectAlternateRoute = (index) => {
    setSelectedRoute(index);
    setShowAlternateRoutes(false);
  };

  // Handle ketika sampai di lokasi
  const handleArrived = () => {
    setArrived(true);
    setIsNavigating(false);
    // Kirim notifikasi ke penumpang bahwa driver sudah sampai
  };

  // Render marker lokasi saat ini
  const renderCurrentMarker = () => (
    <Marker coordinate={currentLocation} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.currentMarker}>
        <View style={styles.currentMarkerInner}>
          <MaterialIcons name="directions-bike" size={24} color="#FFFFFF" />
        </View>
      </View>
    </Marker>
  );

  // Render marker lokasi penumpang
  const renderDestinationMarker = () => (
    <Marker coordinate={destination} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.destinationMarker}>
        <FontAwesome name="user" size={16} color="#FFFFFF" />
      </View>
    </Marker>
  );

  // Render info lalu lintas
  const renderTrafficInfo = () => (
    <View style={styles.trafficInfoContainer}>
      <View style={styles.trafficInfo}>
        <Ionicons 
          name={trafficInfo.congestionLevel === 'tinggi' ? 'alert-circle' : 'information-circle'} 
          size={20} 
          color={trafficInfo.congestionLevel === 'tinggi' ? '#FF3B30' : '#FFCC00'} 
        />
        <Text style={styles.trafficText}>
          Lalu lintas {trafficInfo.congestionLevel} (kecepatan {trafficInfo.speed} km/jam)
        </Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Peta */}
        {currentLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={true}
            showsTraffic={true}
            toolbarEnabled={false}
          >
            {/* Rute utama */}
            {isNavigating && currentLocation && (
              <MapViewDirections
                origin={currentLocation}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={5}
                strokeColor="#0F3222"
                optimizeWaypoints={true}
                onReady={handleReady}
                mode="DRIVING"
              />
            )}
            
            {/* Rute alternatif */}
            {showAlternateRoutes && alternateRoutes.map((route, index) => (
              <Polyline
                key={`alternate-${index}`}
                coordinates={route.coordinates}
                strokeColor="#B1944D"
                strokeWidth={4}
                lineDashPattern={[5, 5]}
                onPress={() => selectAlternateRoute(index)}
              />
            ))}
            
            {/* Marker lokasi saat ini */}
            {renderCurrentMarker()}
            
            {/* Marker lokasi penumpang */}
            {renderDestinationMarker()}
          </MapView>
        )}
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F3222" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Navigasi ke Lokasi Penjemputan</Text>
            <Text style={styles.headerSubtitle}>Order #{order.id}</Text>
          </View>
          
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#0F3222" />
          </TouchableOpacity>
        </View>
        
        {/* Info ETA */}
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>Perkiraan Sampai</Text>
          <Text style={styles.etaTime}>{eta}</Text>
          <Text style={styles.distanceText}>{distance.toFixed(1)} km</Text>
        </View>
        
        {/* Info lalu lintas */}
        {renderTrafficInfo()}
        
        {/* Tombol aksi */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => mapRef.current?.animateToRegion({
              ...currentLocation,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            })}
          >
            <MaterialIcons name="my-location" size={24} color="#0F3222" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={findAlternateRoutes}
          >
            <MaterialIcons name="alt-route" size={24} color="#0F3222" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsNavigating(!isNavigating)}
          >
            <MaterialIcons 
              name={isNavigating ? 'pause' : 'play-arrow'} 
              size={24} 
              color="#0F3222" 
            />
          </TouchableOpacity>
        </View>
        
        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.passengerInfo}>
              <Image 
                source={order.passenger && order.passenger.photo ? order.passenger.photo : require('../../assets/images/logo.png')} 
                style={styles.passengerPhoto} 
              />
              <View style={styles.passengerDetails}>
                <Text style={styles.passengerName}>{order.passenger ? order.passenger.name : 'Penumpang'}</Text>
                <Text style={styles.passengerRating}>
                  <FontAwesome name="star" size={14} color="#FFD700" /> {order.passenger ? order.passenger.rating : '-'}
                </Text>
              </View>
            </View>
            
            <View style={styles.pickupInfo}>
              <View style={styles.locationDot}>
                <View style={[styles.dot, styles.greenDot]} />
                <View style={styles.verticalLine} />
                <View style={[styles.dot, styles.redDot]} />
              </View>
              
              <View style={styles.locationDetails}>
                <View style={styles.locationItem}>
                  <Text style={styles.locationTitle}>Lokasi Anda</Text>
                  <Text style={styles.locationAddress} numberOfLines={2}>
                    {currentLocation ? 'Sedang memperbarui...' : 'Mendeteksi lokasi...'}
                  </Text>
                </View>
                
                <View style={styles.locationItem}>
                  <Text style={styles.locationTitle}>Lokasi Penjemputan</Text>
                  <Text style={styles.locationAddress} numberOfLines={2}>
                    {order.pickupLocation ? order.pickupLocation.address : '-'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.orderDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Jenis Becak</Text>
                <Text style={styles.detailValue}>{order.vehicleType || '-'}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Pembayaran</Text>
                <Text style={styles.detailValue}>{order.paymentMethod || '-'}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Catatan</Text>
                <Text style={styles.detailValue}>
                  {order.notes || 'Tidak ada catatan'}
                </Text>
              </View>
            </View>
            
            {arrived ? (
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Konfirmasi Penjemputan</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.arrivedButton}
                onPress={handleArrived}
              >
                <Text style={styles.arrivedButtonText}>Saya Sudah Sampai</Text>
              </TouchableOpacity>
            )}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  menuButton: {
    padding: 5,
  },
  etaContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  etaText: {
    fontSize: 12,
    color: '#666',
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F3222',
    marginVertical: 5,
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
  },
  trafficInfoContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 210 : 190,
    left: 20,
    right: 20,
  },
  trafficInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  trafficText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  actionButtons: {
    position: 'absolute',
    bottom: height * 0.3,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButton: {
    padding: 10,
  },
  currentMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  currentMarkerInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B1944D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#DDD',
    width: 40,
    height: 5,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passengerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
  },
  passengerRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pickupInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  locationDot: {
    alignItems: 'center',
    marginRight: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  redDot: {
    backgroundColor: '#FF3B30',
  },
  verticalLine: {
    width: 2,
    height: 40,
    backgroundColor: '#DDD',
    marginVertical: 5,
  },
  locationDetails: {
    flex: 1,
  },
  locationItem: {
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  locationAddress: {
    fontSize: 14,
    color: '#333',
  },
  orderDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  arrivedButton: {
    backgroundColor: '#0F3222',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  arrivedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverNavigationScreen;
