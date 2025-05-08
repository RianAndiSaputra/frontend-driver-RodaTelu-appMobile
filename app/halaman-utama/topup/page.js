import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const TopUpScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('ewallet');
  const [phoneNumber, setPhoneNumber] = useState('081234567890');

  const balance = 1250000;
  const quickAmounts = [10000, 20000, 50000, 100000, 200000, 500000];
  const paymentMethods = [
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: 'wallet',
      options: [
        { id: 'gopay', name: 'Gopay', logo: require('../../../assets/images/logo.png') },
        { id: 'ovo', name: 'OVO', logo: require('../../../assets/images/logo.png') },
        { id: 'dana', name: 'DANA', logo: require('../../../assets/images/logo.png') },
      ]
    },
    {
      id: 'bank',
      name: 'Transfer Bank',
      icon: 'bank',
      options: [
        { id: 'bca', name: 'BCA', logo: require('../../../assets/images/logo.png') },
        { id: 'mandiri', name: 'Mandiri', logo: require('../../../assets/images/logo.png') },
        { id: 'bri', name: 'BRI', logo: require('../../../assets/images/logo.png') },
      ]
    },
    {
      id: 'convenience',
      name: 'Minimarket',
      icon: 'store',
      options: [
        { id: 'alfamart', name: 'Alfamart', logo: require('../../../assets/images/logo.png') },
        { id: 'indomaret', name: 'Indomaret', logo: require('../../../assets/images/logo.png') },
      ]
    }
  ];

  const promos = [
    {
      id: '1',
      title: 'Cashback 10%',
      description: 'Maksimal Rp 20.000 untuk topup pertama via Gopay',
      code: 'GOPAY10'
    },
    {
      id: '2',
      title: 'Gratis Biaya Admin',
      description: 'Topup via OVO tanpa biaya admin',
      code: 'OVOGRATIS'
    }
  ];

  const handleTopUp = () => {
    // Top-up logic here
    alert(`Top up sebesar Rp ${amount} sedang diproses`);
  };

  const renderPaymentOption = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.paymentOption,
        selectedMethod === item.id && styles.selectedPaymentOption
      ]}
      onPress={() => setSelectedMethod(item.id)}
    >
      <MaterialCommunityIcons 
        name={item.icon} 
        size={24} 
        color={selectedMethod === item.id ? '#B1944D' : '#555'} 
      />
      <Text style={[
        styles.paymentOptionText,
        selectedMethod === item.id && styles.selectedPaymentOptionText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPromoItem = ({ item }) => (
    <View style={styles.promoCard}>
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoDesc}>{item.description}</Text>
        <Text style={styles.promoCode}>Kode: {item.code}</Text>
      </View>
      <TouchableOpacity style={styles.usePromoButton}>
        <Text style={styles.usePromoText}>Pakai</Text>
      </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Isi Saldo</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Saat Ini</Text>
          <Text style={styles.balanceAmount}>Rp {balance.toLocaleString('id-ID')}</Text>
        </View>

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jumlah Top Up</Text>
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
                style={[
                  styles.quickAmountButton,
                  amount === amt.toString() && styles.selectedQuickAmount
                ]}
                onPress={() => setAmount(amt.toString())}
              >
                <Text style={[
                  styles.quickAmountText,
                  amount === amt.toString() && styles.selectedQuickAmountText
                ]}>
                  {amt.toLocaleString('id-ID')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentOption}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paymentOptions}
          />

          {/* Selected Payment Options */}
          {selectedMethod === 'ewallet' && (
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentSubtitle}>Pilih E-Wallet</Text>
              <View style={styles.ewalletOptions}>
                {paymentMethods.find(m => m.id === 'ewallet').options.map(option => (
                  <TouchableOpacity key={option.id} style={styles.ewalletOption}>
                    <Image source={option.logo} style={styles.ewalletLogo} />
                    <Text style={styles.ewalletName}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.phoneInputContainer}>
                <Text style={styles.phoneLabel}>Nomor HP</Text>
                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          {selectedMethod === 'bank' && (
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentSubtitle}>Pilih Bank</Text>
              <View style={styles.bankOptions}>
                {paymentMethods.find(m => m.id === 'bank').options.map(option => (
                  <TouchableOpacity key={option.id} style={styles.bankOption}>
                    <Image source={option.logo} style={styles.bankLogo} />
                    <Text style={styles.bankName}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.noteText}>
                Transfer manual ke Virtual Account yang akan diberikan
              </Text>
            </View>
          )}

          {selectedMethod === 'convenience' && (
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentSubtitle}>Pilih Minimarket</Text>
              <View style={styles.storeOptions}>
                {paymentMethods.find(m => m.id === 'convenience').options.map(option => (
                  <TouchableOpacity key={option.id} style={styles.storeOption}>
                    <Image source={option.logo} style={styles.storeLogo} />
                    <Text style={styles.storeName}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.noteText}>
                Bayar di kasir dengan menunjukkan kode pembayaran
              </Text>
            </View>
          )}
        </View>

        {/* Promos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promo Top Up</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={promos}
            renderItem={renderPromoItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.promosList}
          />
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jumlah Top Up</Text>
            <Text style={styles.summaryValue}>Rp {amount ? parseInt(amount).toLocaleString('id-ID') : '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Biaya Admin</Text>
            <Text style={styles.summaryValue}>Rp 2.500</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.totalLabel]}>Total Bayar</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              Rp {amount ? (parseInt(amount) + 2500).toLocaleString('id-ID') : '2.500'}
            </Text>
          </View>
        </View>

        {/* Top Up Button */}
        <TouchableOpacity 
          style={[
            styles.topUpButton,
            !amount && styles.disabledButton
          ]}
          onPress={handleTopUp}
          disabled={!amount}
        >
          <Text style={styles.topUpButtonText}>Top Up Sekarang</Text>
        </TouchableOpacity>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <MaterialCommunityIcons name="information" size={16} color="#B1944D" />
          <Text style={styles.infoText}>
            Proses top up akan selesai dalam 1-5 menit. Jika ada kendala, hubungi CS kami.
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#B1944D',
    fontSize: 14,
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
  selectedQuickAmount: {
    backgroundColor: '#B1944D',
  },
  quickAmountText: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedQuickAmountText: {
    color: '#FFF',
  },
  paymentOptions: {
    paddingBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedPaymentOption: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    borderWidth: 1,
    borderColor: '#B1944D',
  },
  paymentOptionText: {
    color: '#555',
    fontSize: 14,
    marginLeft: 8,
  },
  selectedPaymentOptionText: {
    color: '#0F3222',
    fontWeight: '600',
  },
  paymentDetails: {
    marginTop: 16,
  },
  paymentSubtitle: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  ewalletOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  ewalletOption: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: '3%',
  },
  ewalletLogo: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  ewalletName: {
    color: '#0F3222',
    fontSize: 12,
    textAlign: 'center',
  },
  phoneInputContainer: {
    marginTop: 8,
  },
  phoneLabel: {
    color: '#555',
    fontSize: 12,
    marginBottom: 4,
  },
  phoneInput: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    color: '#0F3222',
  },
  bankOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  bankOption: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: '3%',
  },
  bankLogo: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  bankName: {
    color: '#0F3222',
    fontSize: 12,
    textAlign: 'center',
  },
  storeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  storeOption: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: '5%',
  },
  storeLogo: {
    width: 70,
    height: 40,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  storeName: {
    color: '#0F3222',
    fontSize: 12,
    textAlign: 'center',
  },
  noteText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  promosList: {
    paddingTop: 8,
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoDesc: {
    color: '#555',
    fontSize: 12,
    marginBottom: 4,
  },
  promoCode: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: '600',
  },
  usePromoButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'center',
  },
  usePromoText: {
    color: '#B1944D',
    fontSize: 12,
    fontWeight: 'bold',
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
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topUpButton: {
    backgroundColor: '#B1944D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  topUpButtonText: {
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

export default TopUpScreen;