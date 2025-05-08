import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const WithdrawFundsScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [bankAccount, setBankAccount] = useState({
    name: 'Budi Santoso',
    number: '1234567890',
    bank: 'BCA'
  });

  const balance = 1250000;
  const withdrawalMethods = [
    { id: 'bank', name: 'Transfer Bank', icon: 'bank', fee: 'Rp 2.500' },
    { id: 'ewallet', name: 'E-Wallet', icon: 'wallet', fee: 'Rp 1.000' },
    { id: 'cash', name: 'Tunai Langsung', icon: 'cash', fee: 'Gratis' },
  ];

  const quickAmounts = [50000, 100000, 200000, 500000, 1000000];

  const handleWithdraw = () => {
    // Withdrawal logic here
    alert(`Penarikan dana sebesar Rp ${amount} sedang diproses`);
  };

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
          <Text style={styles.headerTitle}>Tarik Dana</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Tersedia</Text>
          <Text style={styles.balanceAmount}>Rp {balance.toLocaleString('id-ID')}</Text>
          <View style={styles.balanceNote}>
            <MaterialCommunityIcons name="information" size={16} color="#B1944D" />
            <Text style={styles.noteText}>Penarikan diproses 1x24 jam pada hari kerja</Text>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jumlah Penarikan</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currency}>Rp</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Masukkan jumlah"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#AAA"
            />
          </View>
          
          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            {quickAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={styles.quickAmountButton}
                onPress={() => setAmount(amt.toString())}
              >
                <Text style={styles.quickAmountText}>Rp {amt.toLocaleString('id-ID')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Withdrawal Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Penarikan</Text>
          <View style={styles.methodsContainer}>
            {withdrawalMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.selectedMethod
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodIcon}>
                  <MaterialCommunityIcons name={method.icon} size={24} color="#0F3222" />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodFee}>Biaya: {method.fee}</Text>
                </View>
                {selectedMethod === method.id && (
                  <View style={styles.selectedIndicator}>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bank Account Info (shown when bank transfer selected) */}
        {selectedMethod === 'bank' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rekening Tujuan</Text>
            <View style={styles.bankAccountCard}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.bankLogo} 
              />
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{bankAccount.bank}</Text>
                <Text style={styles.accountNumber}>{bankAccount.number}</Text>
                <Text style={styles.accountName}>{bankAccount.name}</Text>
              </View>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Ubah</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* E-Wallet Info (shown when e-wallet selected) */}
        {selectedMethod === 'ewallet' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>E-Wallet Tujuan</Text>
            <View style={styles.ewalletCard}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.ewalletLogo} 
              />
              <View style={styles.ewalletInfo}>
                <Text style={styles.ewalletName}>Gopay</Text>
                <Text style={styles.ewalletNumber}>081234567890</Text>
              </View>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Ubah</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jumlah Penarikan</Text>
            <Text style={styles.summaryValue}>Rp {amount ? parseInt(amount).toLocaleString('id-ID') : '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Biaya Admin</Text>
            <Text style={styles.summaryValue}>
              {selectedMethod === 'bank' ? 'Rp 2.500' : 
               selectedMethod === 'ewallet' ? 'Rp 1.000' : 'Gratis'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.totalLabel]}>Total Diterima</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              Rp {amount ? (
                selectedMethod === 'bank' ? (parseInt(amount) - 2500 ):
                selectedMethod === 'ewallet' ? (parseInt(amount) - 1000) :
                parseInt(amount)
              ).toLocaleString('id-ID') : '0'}
            </Text>
          </View>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity 
          style={[
            styles.withdrawButton,
            !amount && styles.disabledButton
          ]}
          onPress={handleWithdraw}
          disabled={!amount}
        >
          <Text style={styles.withdrawButtonText}>Tarik Dana Sekarang</Text>
        </TouchableOpacity>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <MaterialCommunityIcons name="information" size={16} color="#B1944D" />
          <Text style={styles.infoText}>
            Pastikan data penarikan sudah benar. Dana akan masuk dalam 1x24 jam pada hari kerja.
          </Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  balanceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  noteText: {
    color: '#B1944D',
    fontSize: 12,
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1944D',
    paddingBottom: 8,
    marginBottom: 16,
  },
  currency: {
    color: '#0F3222',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    color: '#0F3222',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    width: '30%',
    alignItems: 'center',
  },
  quickAmountText: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: '600',
  },
  methodsContainer: {
    marginTop: 8,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
  },
  selectedMethod: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    borderWidth: 1,
    borderColor: '#B1944D',
  },
  methodIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
  },
  methodFee: {
    color: '#888',
    fontSize: 12,
  },
  selectedIndicator: {
    marginLeft: 8,
  },
  bankAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountNumber: {
    color: '#555',
    fontSize: 12,
  },
  accountName: {
    color: '#555',
    fontSize: 12,
  },
  ewalletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  ewalletLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  ewalletInfo: {
    flex: 1,
  },
  ewalletName: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ewalletNumber: {
    color: '#555',
    fontSize: 12,
  },
  changeButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  changeButtonText: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#555',
    fontSize: 14,
  },
  summaryValue: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: '#B1944D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  withdrawButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    borderRadius: 8,
  },
  infoText: {
    color: '#B1944D',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
});

export default WithdrawFundsScreen;