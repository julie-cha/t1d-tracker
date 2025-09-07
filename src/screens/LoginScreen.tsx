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

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: (userData: any) => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSuccess,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'parent' | 'child'>('parent');

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Missing Information', 'Please enter your email or username');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Missing Information', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      const userData = {
        email: email.trim(),
        userType,
        // In real app, get actual user data from server
      };
      onSuccess(userData);
    }, 2000);
  };

  const renderUserTypeToggle = () => (
    <View style={styles.userTypeContainer}>
      <Text style={styles.userTypeLabel}>I am signing in as:</Text>
      <View style={styles.userTypeToggle}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'parent' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('parent')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="account-supervisor"
            size={20}
            color={userType === 'parent' ? colors.cardBackground : colors.primary}
          />
          <Text
            style={[
              styles.userTypeButtonText,
              userType === 'parent' && styles.userTypeButtonTextActive,
            ]}
          >
            Parent
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'child' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('child')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="account-child"
            size={20}
            color={userType === 'child' ? colors.cardBackground : colors.primary}
          />
          <Text
            style={[
              styles.userTypeButtonText,
              userType === 'child' && styles.userTypeButtonTextActive,
            ]}
          >
            Child
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <MaterialCommunityIcons name="heart-pulse" size={64} color={colors.primary} />
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            <Text style={styles.welcomeDescription}>
              Sign in to continue managing your diabetes care journey together
            </Text>
          </View>

          {renderUserTypeToggle()}

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {userType === 'parent' ? 'Email Address' : 'Username or Email'}
              </Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder={
                  userType === 'parent' 
                    ? 'Enter your email address'
                    : 'Enter your username or email'
                }
                placeholderTextColor={colors.textSecondary}
                keyboardType={userType === 'parent' ? 'email-address' : 'default'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
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

            <TouchableOpacity
              onPress={onForgotPassword}
              style={styles.forgotPasswordButton}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpSection}>
            <View style={styles.helpItem}>
              <MaterialCommunityIcons name="account-supervisor" size={20} color={colors.primary} />
              <Text style={styles.helpText}>
                <Text style={styles.helpTextBold}>Parents:</Text> Use the email you registered with
              </Text>
            </View>
            <View style={styles.helpItem}>
              <MaterialCommunityIcons name="account-child" size={20} color={colors.primary} />
              <Text style={styles.helpText}>
                <Text style={styles.helpTextBold}>Children:</Text> Use the username you created
              </Text>
            </View>
          </View>

          <View style={styles.supportSection}>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.supportText}>
              Need help signing in? Ask your parent or contact support
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
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  userTypeContainer: {
    marginBottom: 32,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  userTypeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  userTypeButtonActive: {
    backgroundColor: colors.primary,
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  userTypeButtonTextActive: {
    color: colors.cardBackground,
  },
  formSection: {
    marginBottom: 32,
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
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: colors.chartBackground,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  helpSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  helpTextBold: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  supportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  supportText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});