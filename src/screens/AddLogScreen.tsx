import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../components/PageHeader';
import { ActivityDetailScreen } from './ActivityDetailScreen';
import { colors } from '../styles/colors';

const activityCategories = [
  {
    id: 'food',
    title: 'Food',
    icon: 'restaurant',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'activities',
    title: 'Activities',
    icon: 'run',
    iconLibrary: 'MaterialCommunityIcons',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    icon: 'moon',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'insulin',
    title: 'Insulin',
    icon: 'medical',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'site-change',
    title: 'Site Change',
    icon: 'refresh-circle',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'symptoms',
    title: 'Symptoms',
    icon: 'alert-circle',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'mood',
    title: 'Mood',
    icon: 'heart',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'stress',
    title: 'Stress',
    icon: 'thunderstorm',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'notes',
    title: 'Notes',
    icon: 'document-text',
    iconLibrary: 'Ionicons',
  },
];

export const AddLogScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleActivityPress = (activityId: string) => {
    console.log('Selected activity:', activityId);
    setSelectedCategory(activityId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleFinalSave = (data: any) => {
    console.log('Activity saved successfully:', data);
    // TODO: Save to database/storage
    // Show success message and go back to main categories
    setSelectedCategory(null);
    // Could add a toast or success message here
  };

  // Show activity detail screen if a category is selected
  if (selectedCategory) {
    return (
      <ActivityDetailScreen
        category={selectedCategory as any}
        onBack={handleBackToCategories}
        onFinalSave={handleFinalSave}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Header */}
      <PageHeader>
        <Text style={styles.headerTitle}>Add Log</Text>
      </PageHeader>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          {/* Activity Grid */}
          <View style={styles.activityGrid}>
            {activityCategories.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.activityCard}
                onPress={() => handleActivityPress(activity.id)}
                activeOpacity={0.7}
              >
                <View style={styles.activityIconContainer}>
                  {activity.iconLibrary === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={activity.icon as any}
                      size={28}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name={activity.icon as any}
                      size={28}
                      color={colors.primary}
                    />
                  )}
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
              </TouchableOpacity>
            ))}
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
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  activityCard: {
    width: '30%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  activityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.chartBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  bottomPadding: {
    height: 90,
  },
});