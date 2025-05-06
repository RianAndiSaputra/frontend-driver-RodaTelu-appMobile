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
import Footer from '../../components/Footer';

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitle}>Profil & Pengaturan</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <FontAwesome5 name="user-circle" size={80} color="#0F3222" />
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
          <Text style={styles.sectionTitle}>Akun Saya</Text>
          
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
                <Text style={styles.inputText}>{formData.nama}</Text>
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
                <Text style={styles.inputText}>{formData.email}</Text>
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
                <Text style={styles.inputText}>{formData.noHp}</Text>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alamat</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.alamat}
                  onChangeText={(text) => handleInputChange('alamat', text)}
                  multiline
                />
              ) : (
                <Text style={styles.inputText}>{formData.alamat}</Text>
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
                <Text style={styles.inputText}>{formData.platNomor}</Text>
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
                <Text style={styles.inputText}>{formData.jenisBecak}</Text>
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
                <Text style={styles.inputText}>{formData.nik}</Text>
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
                trackColor={{ false: "#767577", true: "#B1944D" }}
                thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons name="theme-light-dark" size={24} color="#0F3222" />
                <Text style={styles.settingText}>Tema Gelap</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem}>
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
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="help-outline" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Pusat Bantuan</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Hubungi Kami</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="privacy-tip" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Kebijakan Privasi</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="description" size={24} color="#0F3222" />
              </View>
              <Text style={styles.menuText}>Syarat & Ketentuan</Text>
              <Ionicons name="chevron-forward" size={20} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Simpan Perubahan</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Batal</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={18} color="#F44336" />
            <Text style={[styles.buttonText, styles.logoutButtonText]}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Footer */}
      <Footer activeTab="profile" setActiveTab={(tab) => console.log(tab)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F3222',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#B1944D',
  },
  editPhotoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#B1944D',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F3222',
    marginLeft: 5,
    marginRight: 3,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginLeft: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    paddingVertical: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 5,
  },
  inputText: {
    fontSize: 16,
    color: '#333333',
  },
  input: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#B1944D',
  },
  saveButton: {
    backgroundColor: '#0F3222',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  logoutButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#666666',
  },
  logoutButtonText: {
    color: '#F44336',
  },
});

export default ProfileScreen;