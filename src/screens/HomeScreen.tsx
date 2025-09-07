import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profilePic}>
            <Text style={styles.profileInitial}>M</Text>
          </View>
        </View>

        {/* Glucose Section */}
        <View style={styles.glucoseSection}>
          <View style={styles.glucoseContainer}>
            <Text style={styles.glucoseValue}>99</Text>
            <Text style={styles.glucoseUnit}>mg/dL</Text>
          </View>
          <Text style={styles.timeStamp}>5 min ago</Text>
        </View>

        {/* Streak Section */}
        <View style={styles.streakSection}>
          <View style={styles.streakRow}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.streakNumber}>10</Text>
          </View>
          <Text style={styles.streakLabel}>Streak</Text>
        </View>
      </View>


      <View style={styles.characterSection}>
        {/* Speech bubble above character */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>
            📝 Let's log some data!{'\n'}
            Time to record your activities!
          </Text>
          <View style={styles.speechArrow} />
        </View>
        
        {/* Character below speech bubble */}
        <View style={styles.cuteBird}>
            {/* Bird Body */}
            <View style={styles.birdBody} />
            
            {/* Bird Head */}
            <View style={styles.birdHead}>
              {/* Eyes */}
              <View style={styles.birdEyeLeft} />
              <View style={styles.birdEyeRight} />
              
              {/* Eye pupils */}
              <View style={styles.birdPupilLeft} />
              <View style={styles.birdPupilRight} />
              
              {/* Beak */}
              <View style={styles.birdBeak} />
              
              {/* Cheeks */}
              <View style={styles.birdCheekLeft} />
              <View style={styles.birdCheekRight} />
            </View>
            
            {/* Wings */}
            <View style={styles.birdWingLeft} />
            <View style={styles.birdWingRight} />
          </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="notifications" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="shirt" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    minHeight: 80,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  profileSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  glucoseSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  streakSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  profileName: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  glucoseContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  glucoseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  glucoseUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  timeStamp: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  speechBubble: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: 'center',
  },
  speechText: {
    fontSize: 18,
    color: colors.textPrimary,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 8,
  },
  previousNotificationsText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 4,
    fontWeight: '500',
  },
  speechArrow: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.cardBackground,
  },
  characterSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  cuteBird: {
    width: 180,
    height: 180,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  birdBody: {
    width: 120,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    position: 'absolute',
    bottom: 15,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  birdHead: {
    width: 95,
    height: 95,
    backgroundColor: '#FFFFFF',
    borderRadius: 48,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  birdEyeLeft: {
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    position: 'absolute',
    left: 20,
    top: 25,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  birdEyeRight: {
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    position: 'absolute',
    right: 20,
    top: 25,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  birdPupilLeft: {
    width: 11,
    height: 11,
    backgroundColor: '#333333',
    borderRadius: 6,
    position: 'absolute',
    left: 26,
    top: 31,
    zIndex: 3,
  },
  birdPupilRight: {
    width: 11,
    height: 11,
    backgroundColor: '#333333',
    borderRadius: 6,
    position: 'absolute',
    right: 26,
    top: 31,
    zIndex: 3,
  },
  birdBeak: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFB74D',
    position: 'absolute',
    bottom: 25,
  },
  birdCheekLeft: {
    width: 16,
    height: 12,
    backgroundColor: '#FFE0E0',
    borderRadius: 8,
    position: 'absolute',
    left: 10,
    top: 45,
  },
  birdCheekRight: {
    width: 16,
    height: 12,
    backgroundColor: '#FFE0E0',
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    top: 45,
  },
  birdWingLeft: {
    width: 35,
    height: 48,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    position: 'absolute',
    left: 12,
    bottom: 35,
    zIndex: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    transform: [{ rotate: '-15deg' }],
  },
  birdWingRight: {
    width: 35,
    height: 48,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    position: 'absolute',
    right: 12,
    bottom: 35,
    zIndex: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    transform: [{ rotate: '15deg' }],
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});