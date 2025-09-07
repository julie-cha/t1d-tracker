import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

interface WelcomeScreenProps {
  onParentSignup: () => void;
  onChildSignup: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onParentSignup,
  onChildSignup,
  onLogin,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons 
            name="heart-pulse" 
            size={80} 
            color={colors.primary} 
          />
          <Text style={styles.appName}>Diabetes Care</Text>
          <Text style={styles.appTagline}>Together we manage better</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Your Health Journey</Text>
          <Text style={styles.welcomeDescription}>
            A diabetes management app designed for families.{'\n'}
            Parents and children work together to track and manage diabetes care.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.parentButton]} 
            onPress={onParentSignup}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="account-supervisor" size={24} color={colors.cardBackground} />
              <View style={styles.buttonText}>
                <Text style={styles.buttonTitle}>I'm a Parent</Text>
                <Text style={styles.buttonSubtitle}>Set up account for my child</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.cardBackground} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.childButton]} 
            onPress={onChildSignup}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="account-child" size={24} color={colors.primary} />
              <View style={styles.buttonText}>
                <Text style={[styles.buttonTitle, styles.childButtonTitle]}>I'm a Child</Text>
                <Text style={[styles.buttonSubtitle, styles.childButtonSubtitle]}>Join my parent's account</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={onLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.loginButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Help Text */}
        <View style={styles.helpSection}>
          <MaterialCommunityIcons name="information-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.helpText}>
            Parents should create an account first, then help their child join
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 16,
  },
  appTagline: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  actionButton: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  parentButton: {
    backgroundColor: colors.primary,
  },
  childButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  buttonText: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardBackground,
    marginBottom: 4,
  },
  childButtonTitle: {
    color: colors.primary,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: colors.cardBackground,
    opacity: 0.8,
  },
  childButtonSubtitle: {
    color: colors.textSecondary,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
  },
});