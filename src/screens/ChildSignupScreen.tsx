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

interface ChildSignupScreenProps {
  onBack: () => void;
  onSuccess: (childData: any) => void;
}

export const ChildSignupScreen: React.FC<ChildSignupScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const [parentEmail, setParentEmail] = useState('');
  const [parentVerificationCode, setParentVerificationCode] = useState('');
  const [childUsername, setChildUsername] = useState('');
  const [childPassword, setChildPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteEmoji, setFavoriteEmoji] = useState('');
  
  const [step, setStep] = useState(1); // 1: Parent verification, 2: Child setup
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleParentVerification = async () => {
    if (!parentEmail.trim()) {
      Alert.alert('Missing Information', 'Please enter your parent\'s email');
      return;
    }
    if (!parentVerificationCode.trim()) {
      Alert.alert('Missing Information', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to verify parent
    setTimeout(() => {
      setIsLoading(false);
      // In real app, verify the code here
      if (parentVerificationCode === '1234') { // Mock verification
        setStep(2);
      } else {
        Alert.alert('Invalid Code', 'Please check the verification code with your parent');
      }
    }, 1500);
  };

  const handleChildSetup = async () => {
    if (!childUsername.trim()) {
      Alert.alert('Missing Information', 'Please choose a username');
      return;
    }
    if (!childPassword || childPassword.length < 4) {
      Alert.alert('Invalid Password', 'Password must be at least 4 characters');
      return;
    }
    if (childPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const childData = {
        parentEmail: parentEmail.trim().toLowerCase(),
        childUsername: childUsername.trim(),
        favoriteColor: favoriteColor.trim(),
        favoriteEmoji: favoriteEmoji.trim(),
      };
      onSuccess(childData);
    }, 2000);
  };

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <MaterialCommunityIcons name="shield-check" size={48} color={colors.primary} />
        <Text style={styles.stepTitle}>Connect to Your Parent</Text>
        <Text style={styles.stepDescription}>
          Ask your parent for their email and the special code to join their account
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Parent's Email Address *</Text>
        <TextInput
          style={styles.textInput}
          value={parentEmail}
          onChangeText={setParentEmail}
          placeholder="Enter your parent's email"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Verification Code *</Text>
        <TextInput
          style={styles.textInput}
          value={parentVerificationCode}
          onChangeText={setParentVerificationCode}
          placeholder="Enter the code from your parent"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          maxLength={6}
        />
        <Text style={styles.helperText}>
          Your parent can find this code in their account settings
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, isLoading && styles.actionButtonDisabled]}
        onPress={handleParentVerification}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <Text style={styles.actionButtonText}>
          {isLoading ? 'Verifying...' : 'Connect to Parent'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <MaterialCommunityIcons name="lightbulb-outline" size={20} color={colors.warning} />
        <Text style={styles.infoText}>
          <Text style={styles.infoTextBold}>Need help?</Text>{'\n'}
          Ask your parent to go to Settings → Family Code to get your verification code.
        </Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <MaterialCommunityIcons name="account-child" size={48} color={colors.primary} />
        <Text style={styles.stepTitle}>Create Your Account</Text>
        <Text style={styles.stepDescription}>
          Set up your personal login and customize your profile
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Choose a Username *</Text>
        <TextInput
          style={styles.textInput}
          value={childUsername}
          onChangeText={setChildUsername}
          placeholder="Pick a fun username"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Create Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={childPassword}
            onChangeText={setChildPassword}
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
          placeholder="Enter password again"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={true}
        />
      </View>

      {/* Fun Personalization */}
      <View style={styles.personalizationSection}>
        <Text style={styles.sectionTitle}>Make It Yours! 🎨</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Favorite Color</Text>
          <TextInput
            style={styles.textInput}
            value={favoriteColor}
            onChangeText={setFavoriteColor}
            placeholder="e.g., Blue, Pink, Green"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Favorite Emoji</Text>
          <TextInput
            style={styles.textInput}
            value={favoriteEmoji}
            onChangeText={setFavoriteEmoji}
            placeholder="Pick your favorite emoji 😊"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, isLoading && styles.actionButtonDisabled]}
        onPress={handleChildSetup}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <Text style={styles.actionButtonText}>
          {isLoading ? 'Creating Account...' : 'Complete Setup'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={step === 1 ? onBack : () => setStep(1)} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {step === 1 ? 'Join Family Account' : 'Set Up Your Profile'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step {step} of 2</Text>
        </View>

        <View style={styles.content}>
          {step === 1 ? renderStep1() : renderStep2()}
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.chartBackground,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  stepContent: {
    gap: 24,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
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
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  personalizationSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonDisabled: {
    backgroundColor: colors.chartBackground,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoTextBold: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
});