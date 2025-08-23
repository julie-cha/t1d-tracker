import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const LogScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Today');
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Date Selector */}
        <View style={styles.dateSection}>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Text style={styles.dateText}>{selectedDate}</Text>
            <Ionicons
              name={showCalendar ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
          
          {showCalendar && (
            <View style={styles.calendarDropdown}>
              <Text style={styles.calendarPlaceholder}>Calendar will be here</Text>
            </View>
          )}
        </View>

        {/* Blood Glucose Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Blood Glucose</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>Glucose Chart</Text>
            </View>
          </View>
        </View>

        {/* Activity Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Activity Timeline</Text>
          
          {/* Child Row */}
          <View style={styles.timelineRow}>
            <Text style={styles.rowLabel}>Child</Text>
            <View style={styles.activityTrack}>
              <View style={[styles.activityItem, { left: '20%' }]} />
              <View style={[styles.activityItem, { left: '50%' }]} />
            </View>
          </View>
          
          {/* Parent Row */}
          <View style={styles.timelineRow}>
            <Text style={styles.rowLabel}>Parent</Text>
            <View style={styles.activityTrack}>
              <View style={[styles.activityItem, { left: '25%' }]} />
              <View style={[styles.activityItem, { left: '45%' }]} />
            </View>
          </View>
          
          {/* Time labels */}
          <View style={styles.timeLabels}>
            <Text style={styles.timeLabel}>6AM</Text>
            <Text style={styles.timeLabel}>12PM</Text>
            <Text style={styles.timeLabel}>6PM</Text>
            <Text style={styles.timeLabel}>12AM</Text>
          </View>
        </View>

        {/* Spacer for bottom overlay */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Activity Details Overlay */}
      <View style={styles.activityOverlay}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Activity Details</Text>
          
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B7B7B',
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSection: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  calendarDropdown: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginTop: 8,
    padding: 20,
  },
  calendarPlaceholder: {
    textAlign: 'center',
    color: '#666',
  },
  chartSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  chartContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 20,
    height: 150,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    fontSize: 16,
    color: '#666',
  },
  timelineSection: {
    marginBottom: 100,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 40,
  },
  rowLabel: {
    width: 60,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  activityTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    position: 'relative',
  },
  activityItem: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 6,
    top: -4,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 60,
    marginTop: 10,
  },
  timeLabel: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  spacer: {
    height: 200,
  },
  activityOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
    maxHeight: '50%',
    zIndex: 1,
    paddingBottom: 90,
  },
  overlayContent: {
    padding: 20,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
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
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mismatchText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  matchIndicator: {
    backgroundColor: '#51CF66',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});