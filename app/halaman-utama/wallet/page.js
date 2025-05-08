import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../../components/Footer';

const WalletScreen = () => {
  const [activeTab, setActiveTab] = useState('dompet');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header Simplified */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>DOMPET</Text>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hai, Ahmad</Text>
          <Text style={styles.welcomeText}>Selamat datang kembali</Text>
        </View>

        {/* Total Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total Saldo</Text>
          <Text style={styles.balanceAmount}>Rp1.250.000</Text>
          
          {/* Horizontal Action Buttons */}
          <View style={styles.horizontalActions}>
            <TouchableOpacity style={styles.horizontalAction}>
              <View style={styles.horizontalActionIcon}>
                <Ionicons name="add-circle" size={24} color="#B1944D" />
              </View>
              <Text style={styles.horizontalActionText}>Top Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.horizontalAction}>
              <View style={styles.horizontalActionIcon}>
                <Ionicons name="swap-horizontal" size={24} color="#B1944D" />
              </View>
              <Text style={styles.horizontalActionText}>Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.horizontalAction}>
              <View style={styles.horizontalActionIcon}>
                <Ionicons name="remove-circle" size={24} color="#B1944D" />
              </View>
              <Text style={styles.horizontalActionText}>Tarik Dana</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Last Transaction */}
        <View style={styles.transactionSection}>
          <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
          
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="wallet" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionMethod}>Top Up via BCA</Text>
              <Text style={styles.transactionTime}>Hari ini • 09:30</Text>
            </View>
            <Text style={styles.transactionAmount}>+ Rp500.000</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0F3222',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  greetingContainer: {
    paddingHorizontal: 25,
    paddingVertical: 35,
    backgroundColor: '#0F3222',
    borderBottomLeftRadius: 25,  // lengkung kiri bawah
    borderBottomRightRadius: 25, 
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: '5',
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: '15',
  },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -45,
    borderRadius: 12,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceTitle: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    marginTop: '7',
    marginHorizontal: 10,
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  horizontalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  horizontalAction: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  horizontalActionIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  horizontalActionText: {
    color: '#0F3222',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  transactionSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIconContainer: {
    backgroundColor: '#B1944D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMethod: {
    color: '#333333',
    fontWeight: '600',
  },
  transactionTime: {
    color: '#999999',
    fontSize: 12,
    marginTop: 3,
  },
  transactionAmount: {
    color: '#0F3222',
    fontWeight: '700',
  },
});

export default WalletScreen;