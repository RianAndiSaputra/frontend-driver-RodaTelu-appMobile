import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const TransactionHistoryScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Semua' },
    { id: 'income', name: 'Pemasukan' },
    { id: 'withdrawal', name: 'Penarikan' },
    { id: 'bonus', name: 'Bonus' },
  ];

  const transactions = [
    {
      id: '1',
      type: 'income',
      amount: 35000,
      date: '12 Jun 2023, 08:30',
      description: 'Order dari Nurul Hasanah',
      status: 'completed',
      icon: 'cash'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: -200000,
      date: '10 Jun 2023, 14:15',
      description: 'Penarikan ke BCA',
      status: 'completed',
      icon: 'bank-transfer-out'
    },
    {
      id: '3',
      type: 'bonus',
      amount: 50000,
      date: '5 Jun 2023, 09:00',
      description: 'Bonus Level 2',
      status: 'completed',
      icon: 'gift'
    },
    {
      id: '4',
      type: 'income',
      amount: 42000,
      date: '4 Jun 2023, 12:45',
      description: 'Order dari Budi Santoso',
      status: 'completed',
      icon: 'cash'
    },
    {
      id: '5',
      type: 'withdrawal',
      amount: -150000,
      date: '1 Jun 2023, 16:30',
      description: 'Penarikan ke Gopay',
      status: 'pending',
      icon: 'wallet-outline'
    },
    {
      id: '6',
      type: 'income',
      amount: 28000,
      date: '31 Mei 2023, 15:20',
      description: 'Order dari Ani Fitriani',
      status: 'completed',
      icon: 'cash'
    },
    {
      id: '7',
      type: 'bonus',
      amount: 100000,
      date: '28 Mei 2023, 10:00',
      description: 'Bonus 100 Perjalanan',
      status: 'completed',
      icon: 'trophy'
    },
  ];

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeFilter);

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionIcon}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={24} 
          color={
            item.type === 'income' ? '#4CAF50' :
            item.type === 'withdrawal' ? '#F44336' : '#B1944D'
          } 
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        {item.status === 'pending' && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Diproses</Text>
          </View>
        )}
      </View>
      <Text style={[
        styles.transactionAmount,
        item.type === 'income' || item.type === 'bonus' 
          ? styles.incomeAmount 
          : styles.withdrawalAmount
      ]}>
        {item.type === 'income' || item.type === 'bonus' ? '+' : ''}
        {item.amount.toLocaleString('id-ID')}
      </Text>
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
          <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Balance Summary */}
        <View style={styles.balanceSummary}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Saldo Saat Ini</Text>
            <Text style={styles.balanceValue}>Rp 1.250.000</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Pemasukan</Text>
            <Text style={styles.balanceValue}>Rp 2.450.000</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilter
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <FlatList
            data={filteredTransactions}
            renderItem={renderTransactionItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.transactionsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>Tidak ada transaksi</Text>
            <Text style={styles.emptySubtext}>Anda belum memiliki transaksi untuk filter ini</Text>
          </View>
        )}

        {/* Export Button */}
        <TouchableOpacity style={styles.exportButton}>
          <MaterialCommunityIcons name="file-export" size={20} color="#B1944D" />
          <Text style={styles.exportText}>Ekspor Riwayat</Text>
        </TouchableOpacity>
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
  balanceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceItem: {
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
  balanceLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#0F3222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#0F3222',
  },
  filterText: {
    color: '#555',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFF',
  },
  transactionsList: {
    paddingTop: 8,
  },
  transactionCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    color: '#0F3222',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
  },
  pendingBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  pendingText: {
    color: '#FF9800',
    fontSize: 10,
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  withdrawalAmount: {
    color: '#F44336',
  },
  emptyState: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  exportText: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TransactionHistoryScreen;