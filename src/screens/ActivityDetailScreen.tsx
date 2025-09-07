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
import { ActivityInputScreen } from './ActivityInputScreen';
import { colors } from '../styles/colors';

// 각 카테고리별 서브메뉴 정의
const activitySubMenus = {
  food: {
    title: 'Food',
    items: [
      { id: 'breakfast', title: 'Breakfast', icon: 'sunny', iconLibrary: 'Ionicons', description: 'Morning meal' },
      { id: 'lunch', title: 'Lunch', icon: 'partly-sunny', iconLibrary: 'Ionicons', description: 'Midday meal' },
      { id: 'dinner', title: 'Dinner', icon: 'moon', iconLibrary: 'Ionicons', description: 'Evening meal' },
      { id: 'snack', title: 'Snack', icon: 'ice-cream', iconLibrary: 'Ionicons', description: 'Between meals' },
      { id: 'drink', title: 'Drink', icon: 'wine', iconLibrary: 'Ionicons', description: 'Beverages' },
      { id: 'candy', title: 'Candy', icon: 'gift', iconLibrary: 'Ionicons', description: 'Sweets & chocolate' },
    ]
  },
  activities: {
    title: 'Activities', 
    items: [
      { id: 'walking', title: 'Walking', icon: 'walk', iconLibrary: 'Ionicons', description: 'Light walking' },
      { id: 'running', title: 'Running', icon: 'run', iconLibrary: 'MaterialCommunityIcons', description: 'Running exercise' },
      { id: 'sports', title: 'Sports', icon: 'football', iconLibrary: 'Ionicons', description: 'Team sports' },
      { id: 'swimming', title: 'Swimming', icon: 'swim', iconLibrary: 'MaterialCommunityIcons', description: 'Water activities' },
      { id: 'cycling', title: 'Cycling', icon: 'bicycle', iconLibrary: 'Ionicons', description: 'Bike riding' },
      { id: 'playground', title: 'Playground', icon: 'play', iconLibrary: 'Ionicons', description: 'Playing outside' },
      { id: 'other', title: 'Other', icon: 'ellipsis-horizontal', iconLibrary: 'Ionicons', description: 'Custom activity' },
    ]
  },
  sleep: {
    title: 'Sleep',
    items: [
      { id: 'bedtime', title: 'Bedtime', icon: 'bed', iconLibrary: 'Ionicons', description: 'Going to bed' },
      { id: 'wakeup', title: 'Wake Up', icon: 'alarm', iconLibrary: 'Ionicons', description: 'Morning wake up' },
      { id: 'nap', title: 'Nap', icon: 'cloud', iconLibrary: 'Ionicons', description: 'Daytime nap' },
    ]
  },
  insulin: {
    title: 'Insulin',
    items: [
      { id: 'rapid-acting', title: 'Rapid Acting', icon: 'flash', iconLibrary: 'Ionicons', description: 'Fast insulin' },
      { id: 'long-acting', title: 'Long Acting', icon: 'time', iconLibrary: 'Ionicons', description: 'Basal insulin' },
    ]
  },
  'site-change': {
    title: 'Site Change',
    items: [
      { id: 'cgm-sensor', title: 'CGM Sensor', icon: 'radio', iconLibrary: 'Ionicons', description: 'Glucose monitor' },
      { id: 'insulin-pump', title: 'Insulin Pump', icon: 'hardware-chip', iconLibrary: 'Ionicons', description: 'Pump site change' },
      { id: 'injection-site', title: 'Injection Site', icon: 'locate', iconLibrary: 'Ionicons', description: 'New injection spot' },
    ]
  },
  symptoms: {
    title: 'Symptoms',
    items: [
      { id: 'low-bg', title: 'Low Blood Sugar', icon: 'arrow-down-circle', iconLibrary: 'Ionicons', description: 'Hypoglycemia' },
      { id: 'high-bg', title: 'High Blood Sugar', icon: 'arrow-up-circle', iconLibrary: 'Ionicons', description: 'Hyperglycemia' },
      { id: 'nausea', title: 'Nausea', icon: 'sad', iconLibrary: 'Ionicons', description: 'Feeling sick' },
      { id: 'headache', title: 'Headache', icon: 'thunderstorm', iconLibrary: 'Ionicons', description: 'Head pain' },
      { id: 'fatigue', title: 'Fatigue', icon: 'battery-dead', iconLibrary: 'Ionicons', description: 'Feeling tired' },
      { id: 'thirsty', title: 'Thirsty', icon: 'water', iconLibrary: 'Ionicons', description: 'Need water' },
    ]
  },
  mood: {
    title: 'Mood',
    items: [
      { id: 'happy', title: 'Happy', icon: 'happy', iconLibrary: 'Ionicons', description: 'Feeling good' },
      { id: 'sad', title: 'Sad', icon: 'sad', iconLibrary: 'Ionicons', description: 'Feeling down' },
      { id: 'angry', title: 'Angry', icon: 'flame', iconLibrary: 'Ionicons', description: 'Feeling mad' },
      { id: 'worried', title: 'Worried', icon: 'cloud', iconLibrary: 'Ionicons', description: 'Feeling anxious' },
      { id: 'excited', title: 'Excited', icon: 'star', iconLibrary: 'Ionicons', description: 'Feeling energetic' },
      { id: 'tired', title: 'Tired', icon: 'moon', iconLibrary: 'Ionicons', description: 'Feeling sleepy' },
    ]
  },
  stress: {
    title: 'Stress',
    items: [
      { id: 'school', title: 'School', icon: 'school', iconLibrary: 'Ionicons', description: 'School pressure' },
      { id: 'homework', title: 'Homework', icon: 'book', iconLibrary: 'Ionicons', description: 'Homework stress' },
      { id: 'friends', title: 'Friends', icon: 'people', iconLibrary: 'Ionicons', description: 'Friend issues' },
      { id: 'family', title: 'Family', icon: 'home', iconLibrary: 'Ionicons', description: 'Family problems' },
      { id: 'medical', title: 'Medical', icon: 'medical', iconLibrary: 'Ionicons', description: 'Doctor visits' },
      { id: 'other', title: 'Other', icon: 'ellipsis-horizontal', iconLibrary: 'Ionicons', description: 'Other stress' },
    ]
  },
  notes: {
    title: 'Notes',
    items: [
      { id: 'blood-glucose', title: 'Blood Glucose', icon: 'analytics', iconLibrary: 'Ionicons', description: 'BG reading' },
      { id: 'doctor-visit', title: 'Doctor Visit', icon: 'medical', iconLibrary: 'Ionicons', description: 'Medical appointment' },
      { id: 'medication', title: 'Medication', icon: 'medical', iconLibrary: 'Ionicons', description: 'Other medicine' },
      { id: 'general', title: 'General Note', icon: 'create', iconLibrary: 'Ionicons', description: 'Free text note' },
    ]
  },
};

interface ActivityDetailScreenProps {
  category: keyof typeof activitySubMenus;
  onBack: () => void;
  onFinalSave: (data: any) => void;
}

export const ActivityDetailScreen: React.FC<ActivityDetailScreenProps> = ({
  category,
  onBack,
  onFinalSave,
}) => {
  const [selectedItem, setSelectedItem] = useState<{id: string, title: string} | null>(null);
  const categoryData = activitySubMenus[category];

  const handleItemPress = (itemId: string, itemTitle: string) => {
    console.log(`Selected: ${category} -> ${itemId}`);
    setSelectedItem({ id: itemId, title: itemTitle });
  };

  const handleBackToItems = () => {
    setSelectedItem(null);
  };

  const handleInputSave = (data: any) => {
    console.log('Final activity data:', data);
    onFinalSave(data);
  };

  // Show input screen if an item is selected
  if (selectedItem) {
    return (
      <ActivityInputScreen
        category={category}
        subcategory={selectedItem.id}
        subcategoryTitle={selectedItem.title}
        onBack={handleBackToItems}
        onSave={handleInputSave}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Header */}
      <PageHeader>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryData.title}</Text>
          <View style={styles.placeholder} />
        </View>
      </PageHeader>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Select specific activity:</Text>
          
          {/* Sub-menu Grid */}
          <View style={styles.itemGrid}>
            {categoryData.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => handleItemPress(item.id, item.title)}
                activeOpacity={0.7}
              >
                <View style={styles.itemIconContainer}>
                  {item.iconLibrary === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={28}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name={item.icon as any}
                      size={28}
                      color={colors.primary}
                    />
                  )}
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  placeholder: {
    width: 34, // Same as back button to center title
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  itemCard: {
    width: '47%',
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
  itemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.chartBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  bottomPadding: {
    height: 90,
  },
});