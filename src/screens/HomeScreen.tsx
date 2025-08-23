import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profilePic}>
            <Text style={styles.profileInitial}>M</Text>
          </View>
          <Text style={styles.profileName}>Mochi</Text>
        </View>

        <View style={styles.glucoseSection}>
          <Text style={styles.glucoseValue}>99 mg/dL</Text>
          <Text style={styles.timeStamp}>5 min ago</Text>
        </View>

        <View style={styles.streakSection}>
          <View style={styles.streakRow}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.streakNumber}>10</Text>
          </View>
          <Text style={styles.streakLabel}>Streak</Text>
        </View>
      </View>

      <View style={styles.logCard}>
        <Text style={styles.logTitle}>Today's log</Text>
        <View style={styles.logStats}>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Text style={styles.statNumber}>1</Text>
            </View>
            <Text style={styles.statLabel}>Mismatched</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Text style={styles.statNumber}>2</Text>
            </View>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>
      </View>

      <View style={styles.messageCard}>
        <Text style={styles.messageText}>
          Whoa soccer superstar!{'\n'}
          Do you want to take a second to see how{'\n'}
          your body is doing?{'\n'}
          sentence 4{'\n'}
          sentence 5
        </Text>
        <View style={styles.messageArrow} />
      </View>

      <View style={styles.characterSection}>
        <View style={styles.characterContainer}>
          <View style={styles.cloudCharacter}>
            <View style={styles.cloudTop} />
            <View style={styles.cloudBottom} />
            <View style={styles.cloudFace}>
              <View style={styles.cloudEyeLeft} />
              <View style={styles.cloudEyeRight} />
              <View style={styles.cloudMouth} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble" size={24} color="#666" />
        </TouchableOpacity>
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
    backgroundColor: '#7B7B7B',
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 10,
    minHeight: 120,
  },
  profileSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  profileName: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  glucoseSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  glucoseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  timeStamp: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  streakSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 80,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    marginTop: 2,
  },
  logCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  logStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  messageCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    position: 'relative',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  messageArrow: {
    position: 'absolute',
    bottom: -10,
    left: 30,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E0E0E0',
  },
  characterSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  characterContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudCharacter: {
    width: 100,
    height: 80,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudTop: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#C0C0C0',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  cloudBottom: {
    width: 80,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#C0C0C0',
    position: 'absolute',
    bottom: 0,
  },
  cloudFace: {
    position: 'absolute',
    width: 80,
    height: 50,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudEyeLeft: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    position: 'absolute',
    left: 22,
    top: 15,
  },
  cloudEyeRight: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    position: 'absolute',
    right: 22,
    top: 15,
  },
  cloudMouth: {
    width: 12,
    height: 2,
    backgroundColor: '#333',
    borderRadius: 1,
    position: 'absolute',
    bottom: 20,
    transform: [{ rotate: '15deg' }],
  },
  chatButton: {
    position: 'absolute',
    right: -20,
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});