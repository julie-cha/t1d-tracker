import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../components/PageHeader';
import { GlucoseChart } from '../components/GlucoseChart';
import { colors } from '../styles/colors';


export const LogScreen: React.FC = () => {
  const [selectedDate] = useState('Today');
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Header */}
      <PageHeader>
        <TouchableOpacity
          style={styles.headerDateSelector}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Text style={styles.headerDateText}>{selectedDate}</Text>
          <Ionicons
            name={showCalendar ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </PageHeader>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          {showCalendar && (
            <View style={styles.calendarDropdown}>
              <Text style={styles.calendarPlaceholder}>Calendar will be here</Text>
            </View>
          )}

      </View>
      
      {/* Full Width Chart */}
      <GlucoseChart />
      
      <View style={styles.scrollContainer}>


        {/* Activity Details Section */}
        <View style={styles.activityDetailsSection}>
          <Text style={styles.sectionTitle}>Activity Details</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTime}>2:30 PM</Text>
              <View style={styles.mismatchIndicator}>
                <Text style={styles.mismatchText}>Mismatch</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              Child: Had snack{'\n'}
              Parent: No activity recorded
            </Text>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTime}>5:00 PM</Text>
              <View style={styles.matchIndicator}>
                <Text style={styles.matchText}>Match</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              Child: Exercise - Running{'\n'}
              Parent: Exercise - Running
            </Text>
          </View>
        </View>

          {/* Bottom padding for tab bar */}
          <View style={styles.bottomPadding} />
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
  scrollContainer: {
    paddingHorizontal: 20,
  },
  headerDateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerDateText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 10,
  },
  calendarDropdown: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarPlaceholder: {
    textAlign: 'center',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  timelineSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  timelineCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 40,
  },
  rowLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  activityTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.chartBackground,
    borderRadius: 3,
    position: 'relative',
  },
  activityItem: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -5,
  },
  activityFood: {
    backgroundColor: colors.warning,
  },
  activityExercise: {
    backgroundColor: colors.primary,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 80,
    marginTop: 10,
  },
  timeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activityDetailsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  bottomPadding: {
    height: 90,
  },
  activityCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  mismatchIndicator: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mismatchText: {
    fontSize: 13,
    color: colors.warning,
    fontWeight: '600',
  },
  matchIndicator: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  matchText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});