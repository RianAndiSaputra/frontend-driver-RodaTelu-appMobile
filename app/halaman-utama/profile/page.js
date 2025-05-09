import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Footer from '../../../components/Footer';

const ProfileScreen = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    nama: 'Ahmad Budiman',
    email: 'ahmad.becak@example.com',
    noHp: '081234567890',
    alamat: 'Jl. Becak No. 123, Yogyakarta',
    platNomor: 'AB 1234 CD',
    jenisBecak: 'Becak Motor',
    nik: '1234567890123456'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // Added this line

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Keluar Akun",
      "Apakah Anda yakin ingin keluar?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        { 
          text: "Keluar", 
          onPress: () => router.replace('/login') 
        }
      ]
    );
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Sukses", "Profil berhasil diperbarui");
  };

  return (
    <View style={styles.container}>
      {/* Modern Header with Gradient */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profil Saya</Text>
          {isEditing ? (
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <MaterialIcons name="edit" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <FontAwesome5 name="user-circle" size={80} color="#FFFFFF" />
                </View>
              )}
              <View style={styles.editPhotoIcon}>
                <MaterialIcons name="edit" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.profileName}>{formData.nama}</Text>
          <Text style={styles.profileRole}>Driver Becak</Text>
          
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>4.9</Text>
            <Text style={styles.ratingCount}>(128 review)</Text>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nama Lengkap</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.nama}
                  onChangeText={(text) => handleInputChange('nama', text)}
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.nama}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.email}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nomor HP</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.noHp}
                  onChangeText={(text) => handleInputChange('noHp', text)}
                  keyboardType="phone-pad"
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.noHp}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alamat</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }]}
                  value={formData.alamat}
                  onChangeText={(text) => handleInputChange('alamat', text)}
                  multiline
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.alamat}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Driver Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Driver</Text>
          
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Plat Nomor</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.platNomor}
                  onChangeText={(text) => handleInputChange('platNomor', text)}
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.platNomor}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Jenis Becak</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.jenisBecak}
                  onChangeText={(text) => handleInputChange('jenisBecak', text)}
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.jenisBecak}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NIK</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.nik}
                  onChangeText={(text) => handleInputChange('nik', text)}
                  keyboardType="numeric"
                />
              ) : (
                <View style={styles.inputTextContainer}>
                  <Text style={styles.inputText}>{formData.nik}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengaturan Aplikasi</Text>
          
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="notifications" size={24} color="#0F3222" />
                <Text style={styles.settingText}>Notifikasi</Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#0F3222" }}
                thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            
            <View style={styles.divider} />
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="language" size={24} color="#0F3222" />
                <Text style={styles.settingText}>Bahasa</Text>
              </View>
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>Indonesia</Text>
                <Ionicons name="chevron-forward" size={20} color="#888888" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bantuan & Dukungan</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/halaman-utama/help-center/page')} activeOpacity={0.8}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="help-outline" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Pusat Bantuan</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/halaman-awal/contact')} activeOpacity={0.8}>
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Hubungi Kami</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/halaman-utama/privacy/page')} activeOpacity={0.8}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="privacy-tip" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Kebijakan Privasi</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/halaman-utama/ketentuan/page')} activeOpacity={0.8}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="description" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Syarat & Ketentuan</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={20} color="#F44336" />
          <Text style={styles.logoutButtonText}>Keluar Akun</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2025 Programer Cupu. All rights reserved.
          </Text>
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
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    backgroundColor: '#0F3222',
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#0F3222',
    fontWeight: '600',
    fontSize: 14,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#B1944D',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B1944D',
  },
  editPhotoIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#B1944D',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F3222',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F3222',
    marginLeft: 5,
    marginRight: 3,
  },
  ratingCount: {
    fontSize: 13,
    color: '#666666',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F3222',
    marginBottom: 12,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 20,
  },
  inputGroup: {
    paddingVertical: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 5,
    fontWeight: '500',
  },
  inputTextContainer: {
    paddingVertical: 5,
  },
  inputText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    lineHeight: 22,
  },
  input: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 5,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuIcon: {
    width: 24,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center', // Untuk membuat konten berada di tengah secara horizontal
    paddingHorizontal: 30,
    paddingBottom: 40,
    width: '100%', // agar mengikuti lebar device
  },  
});

export default ProfileScreen;