import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const DriverRegistrationScreen = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    postalCode: '',
    ktpNumber: '',
    ktpImage: null,
    simImage: null,
    stnkImage: null,
    skckImage: null,
    healthCertificateImage: null,
    profilePhoto: null,
    vehicleType: 'becak',
    vehicleNumber: '',
    vehicleColor: '',
    vehicleYear: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: ''
  });

  const [errors, setErrors] = useState({});

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setFormData({
      ...formData,
      birthDate: currentDate.toLocaleDateString('id-ID')
    });
  };

  const pickImage = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        [field]: result.assets[0].uri
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email tidak valid';
    if (!formData.phone) newErrors.phone = 'Nomor HP wajib diisi';
    if (!formData.birthDate) newErrors.birthDate = 'Tanggal lahir wajib diisi';
    if (!formData.address) newErrors.address = 'Alamat wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.ktpNumber) newErrors.ktpNumber = 'Nomor KTP wajib diisi';
    if (!formData.ktpImage) newErrors.ktpImage = 'Foto KTP wajib diupload';
    if (!formData.simImage) newErrors.simImage = 'Foto SIM wajib diupload';
    if (!formData.skckImage) newErrors.skckImage = 'Foto SKCK wajib diupload';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.vehicleNumber) newErrors.vehicleNumber = 'Nomor kendaraan wajib diisi';
    if (!formData.vehicleColor) newErrors.vehicleColor = 'Warna kendaraan wajib diisi';
    if (!formData.vehicleYear) newErrors.vehicleYear = 'Tahun kendaraan wajib diisi';
    if (!formData.stnkImage) newErrors.stnkImage = 'Foto STNK wajib diupload';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateStep1()) return;
    if (activeStep === 2 && !validateStep2()) return;
    if (activeStep === 3 && !validateStep3()) return;
    
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      router.push('/halaman-awal/verifikasi');
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepContainer}>
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <View style={[
              styles.stepCircle,
              activeStep >= step ? styles.activeStep : styles.inactiveStep
            ]}>
              <Text style={[
                styles.stepText,
                activeStep >= step ? styles.activeStepText : styles.inactiveStepText
              ]}>
                {step}
              </Text>
            </View>
            {step < 4 && (
              <View style={[
                styles.stepLine,
                activeStep > step ? styles.activeLine : styles.inactiveLine
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const renderStep1 = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Data Pribadi</Text>
        
        <View style={styles.photoUploadContainer}>
          <TouchableOpacity 
            style={styles.photoUploadButton}
            onPress={() => pickImage('profilePhoto')}
          >
            {formData.profilePhoto ? (
              <Image source={{ uri: formData.profilePhoto }} style={styles.uploadedPhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload Foto Profil</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.profilePhoto && <Text style={styles.errorText}>{errors.profilePhoto}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nama Lengkap</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Masukkan nama lengkap"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Masukkan email aktif"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nomor HP</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Contoh: 081234567890"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tanggal Lahir</Text>
          <TouchableOpacity 
            style={[styles.input, styles.dateInput, errors.birthDate && styles.inputError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={formData.birthDate ? styles.dateText : styles.placeholderText}>
              {formData.birthDate || 'Pilih tanggal lahir'}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color="#0F3222" />
          </TouchableOpacity>
          {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Alamat Lengkap</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, errors.address && styles.inputError]}
            placeholder="Masukkan alamat lengkap"
            multiline
            numberOfLines={3}
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>
        
        <View style={styles.rowInput}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Kota</Text>
            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="Kota"
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Kode Pos</Text>
            <TextInput
              style={[styles.input, errors.postalCode && styles.inputError]}
              placeholder="Kode Pos"
              keyboardType="number-pad"
              value={formData.postalCode}
              onChangeText={(text) => handleInputChange('postalCode', text)}
            />
            {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
          </View>
        </View>
      </View>
    );
  };

  const renderStep2 = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Dokumen Identitas</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nomor KTP</Text>
          <TextInput
            style={[styles.input, errors.ktpNumber && styles.inputError]}
            placeholder="Masukkan nomor KTP"
            keyboardType="number-pad"
            value={formData.ktpNumber}
            onChangeText={(text) => handleInputChange('ktpNumber', text)}
          />
          {errors.ktpNumber && <Text style={styles.errorText}>{errors.ktpNumber}</Text>}
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Foto KTP</Text>
          <Text style={styles.documentUploadSubtitle}>Pastikan foto jelas dan terbaca</Text>
          <TouchableOpacity 
            style={styles.documentUploadButton}
            onPress={() => pickImage('ktpImage')}
          >
            {formData.ktpImage ? (
              <Image source={{ uri: formData.ktpImage }} style={styles.uploadedDocument} />
            ) : (
              <View style={styles.documentPlaceholder}>
                <MaterialCommunityIcons name="card-account-details" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload Foto KTP</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.ktpImage && <Text style={styles.errorText}>{errors.ktpImage}</Text>}
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Foto SIM</Text>
          <Text style={styles.documentUploadSubtitle}>SIM C atau SIM yang berlaku</Text>
          <TouchableOpacity 
            style={styles.documentUploadButton}
            onPress={() => pickImage('simImage')}
          >
            {formData.simImage ? (
              <Image source={{ uri: formData.simImage }} style={styles.uploadedDocument} />
            ) : (
              <View style={styles.documentPlaceholder}>
                <MaterialCommunityIcons name="card-account-details-outline" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload Foto SIM</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.simImage && <Text style={styles.errorText}>{errors.simImage}</Text>}
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Surat Keterangan Catatan Kepolisian (SKCK)</Text>
          <Text style={styles.documentUploadSubtitle}>SKCK yang masih berlaku</Text>
          <TouchableOpacity 
            style={styles.documentUploadButton}
            onPress={() => pickImage('skckImage')}
          >
            {formData.skckImage ? (
              <Image source={{ uri: formData.skckImage }} style={styles.uploadedDocument} />
            ) : (
              <View style={styles.documentPlaceholder}>
                <MaterialCommunityIcons name="file-document" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload SKCK</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.skckImage && <Text style={styles.errorText}>{errors.skckImage}</Text>}
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Surat Keterangan Sehat</Text>
          <Text style={styles.documentUploadSubtitle}>Dari dokter atau puskesmas</Text>
          <TouchableOpacity 
            style={styles.documentUploadButton}
            onPress={() => pickImage('healthCertificateImage')}
          >
            {formData.healthCertificateImage ? (
              <Image source={{ uri: formData.healthCertificateImage }} style={styles.uploadedDocument} />
            ) : (
              <View style={styles.documentPlaceholder}>
                <MaterialCommunityIcons name="hospital-box" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload Surat Sehat</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderStep3 = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Data Kendaraan</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Jenis Kendaraan</Text>
          <View style={[styles.input, styles.disabledInput]}>
            <Text>Becak</Text>
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nomor Kendaraan</Text>
          <TextInput
            style={[styles.input, errors.vehicleNumber && styles.inputError]}
            placeholder="Contoh: BM 1234 XY"
            value={formData.vehicleNumber}
            onChangeText={(text) => handleInputChange('vehicleNumber', text)}
          />
          {errors.vehicleNumber && <Text style={styles.errorText}>{errors.vehicleNumber}</Text>}
        </View>
        
        <View style={styles.rowInput}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Warna Kendaraan</Text>
            <TextInput
              style={[styles.input, errors.vehicleColor && styles.inputError]}
              placeholder="Contoh: Merah"
              value={formData.vehicleColor}
              onChangeText={(text) => handleInputChange('vehicleColor', text)}
            />
            {errors.vehicleColor && <Text style={styles.errorText}>{errors.vehicleColor}</Text>}
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Tahun Kendaraan</Text>
            <TextInput
              style={[styles.input, errors.vehicleYear && styles.inputError]}
              placeholder="Contoh: 2020"
              keyboardType="number-pad"
              value={formData.vehicleYear}
              onChangeText={(text) => handleInputChange('vehicleYear', text)}
            />
            {errors.vehicleYear && <Text style={styles.errorText}>{errors.vehicleYear}</Text>}
          </View>
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Foto STNK</Text>
          <Text style={styles.documentUploadSubtitle}>Pastikan foto jelas dan terbaca</Text>
          <TouchableOpacity 
            style={styles.documentUploadButton}
            onPress={() => pickImage('stnkImage')}
          >
            {formData.stnkImage ? (
              <Image source={{ uri: formData.stnkImage }} style={styles.uploadedDocument} />
            ) : (
              <View style={styles.documentPlaceholder}>
                <MaterialCommunityIcons name="file-document" size={40} color="#0F3222" />
                <Text style={styles.uploadText}>Upload Foto STNK</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.stnkImage && <Text style={styles.errorText}>{errors.stnkImage}</Text>}
        </View>
        
        <View style={styles.documentUploadContainer}>
          <Text style={styles.documentUploadTitle}>Foto Kendaraan</Text>
          <Text style={styles.documentUploadSubtitle}>Foto tampak depan, samping, dan belakang</Text>
          <View style={styles.vehiclePhotosContainer}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity 
                key={item}
                style={styles.vehiclePhotoButton}
                onPress={() => pickImage(`vehiclePhoto${item}`)}
              >
                <MaterialCommunityIcons name="camera" size={24} color="#0F3222" />
                <Text style={styles.vehiclePhotoText}>Foto {item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderStep4 = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Informasi Rekening</Text>
        <Text style={styles.sectionSubtitle}>Digunakan untuk pembayaran penghasilan Anda</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nama Bank</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: BCA, BRI, Mandiri"
            value={formData.bankName}
            onChangeText={(text) => handleInputChange('bankName', text)}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nomor Rekening</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nomor rekening"
            keyboardType="number-pad"
            value={formData.accountNumber}
            onChangeText={(text) => handleInputChange('accountNumber', text)}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nama Pemilik Rekening</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama sesuai rekening"
            value={formData.accountHolderName}
            onChangeText={(text) => handleInputChange('accountHolderName', text)}
          />
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Dengan mendaftar, saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi Becak Malioboro
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0F3222" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Mitra Driver</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderStepIndicator()}
          
          {activeStep === 1 && renderStep1()}
          {activeStep === 2 && renderStep2()}
          {activeStep === 3 && renderStep3()}
          {activeStep === 4 && renderStep4()}
          
          <View style={styles.buttonContainer}>
            {activeStep > 1 && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Kembali</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {activeStep === 4 ? 'Selesai & Daftar' : 'Lanjut'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0F3222',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#0F3222',
  },
  inactiveStep: {
    backgroundColor: '#E0E0E0',
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  inactiveStepText: {
    color: '#888888',
  },
  stepLine: {
    height: 2,
    width: 40,
  },
  activeLine: {
    backgroundColor: '#0F3222',
  },
  inactiveLine: {
    backgroundColor: '#E0E0E0',
  },
  formSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F3222',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    marginBottom: 16,
  },
  photoUploadContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoUploadButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F3222',
    overflow: 'hidden',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#0F3222',
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#FF3B30',
    marginTop: 4,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
  },
  disabledInput: {
    backgroundColor: '#EEEEEE',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentUploadContainer: {
    marginBottom: 24,
  },
  documentUploadTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 4,
  },
  documentUploadSubtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
    marginBottom: 12,
  },
  documentUploadButton: {
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0F3222',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  documentPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedDocument: {
    width: '100%',
    height: '100%',
  },
  vehiclePhotosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehiclePhotoButton: {
    width: '30%',
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0F3222',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehiclePhotoText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#0F3222',
    marginTop: 4,
  },
  termsContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#555555',
  },
  nextButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#0F3222',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
});

export default DriverRegistrationScreen;