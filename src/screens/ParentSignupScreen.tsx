import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

interface ParentSignupScreenProps {
  onBack: () => void;
  onSuccess: (parentData: any) => void;
}

export const ParentSignupScreen: React.FC<ParentSignupScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  // Parent information
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Child information
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [diabetesType, setDiabetesType] = useState('');
  const [diagnosisYear, setDiagnosisYear] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!parentName.trim()) {
      Alert.alert('Missing Information', 'Please enter your name');
      return;
    }
    if (!parentEmail.trim()) {
      Alert.alert('Missing Information', 'Please enter your email');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    if (!childName.trim()) {
      Alert.alert('Missing Information', 'Please enter your child\'s name');
      return;
    }
    if (!childAge.trim()) {
      Alert.alert('Missing Information', 'Please enter your child\'s age');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const parentData = {
        parentName: parentName.trim(),
        parentEmail: parentEmail.trim().toLowerCase(),
        parentPhone: parentPhone.trim(),
        childName: childName.trim(),
        childAge: parseInt(childAge),
        diabetesType,
        diagnosisYear: diagnosisYear ? parseInt(diagnosisYear) : null,
      };
      onSuccess(parentData);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parent Account Setup</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionDescription}>
            Create your account and add your child's information to get started
          </Text>

          {/* Parent Information Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account-supervisor" size={24} color={colors.primary} />
              <Text style={styles.sectionTitle}>Your Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.textInput}
                value={parentName}
                onChangeText={setParentName}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.textInput}
                value={parentEmail}
                onChangeText={setParentEmail}
                placeholder="Enter your email address"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={parentPhone}
                onChangeText={setParentPhone}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password *</Text>
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={true}
              />
            </View>
          </View>

          {/* Child Information Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account-child" size={24} color={colors.primary} />
              <Text style={styles.sectionTitle}>Your Child's Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Child's Name *</Text>
              <TextInput
                style={styles.textInput}
                value={childName}
                onChangeText={setChildName}
                placeholder="Enter your child's name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age *</Text>
              <TextInput
                style={styles.textInput}
                value={childAge}
                onChangeText={setChildAge}
                placeholder="Enter age"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Diabetes Type</Text>
              <TextInput
                style={styles.textInput}
                value={diabetesType}
                onChangeText={setDiabetesType}
                placeholder="e.g., Type 1, Type 2"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Year of Diagnosis</Text>
              <TextInput
                style={styles.textInput}
                value={diagnosisYear}
                onChangeText={setDiagnosisYear}
                placeholder="e.g., 2020"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <Text style={styles.signupButtonText}>Creating Account...</Text>
            ) : (
              <Text style={styles.signupButtonText}>Create Family Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="information-outline" size={20} color={colors.primary} />
            <Text style={styles.infoText}>
              After creating your account, you'll help your child set up their own login credentials.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    padding: 20,
  },
  sectionDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.chartBackground,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.chartBackground,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 17,
  },
  signupButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonDisabled: {
    backgroundColor: colors.chartBackground,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});