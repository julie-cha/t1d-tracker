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
import { colors } from '../styles/colors';

interface OptionItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

const symptomsOptions: OptionItem[] = [
  { id: 'low-bg', title: 'Low Blood Sugar', icon: 'arrow-down-circle', description: 'Hypoglycemia', color: '#FF8A80' },
  { id: 'high-bg', title: 'High Blood Sugar', icon: 'arrow-up-circle', description: 'Hyperglycemia', color: '#FFB74D' },
  { id: 'nausea', title: 'Nausea', icon: 'sad', description: 'Feeling sick', color: '#81C784' },
  { id: 'headache', title: 'Headache', icon: 'thunderstorm', description: 'Head pain', color: '#9575CD' },
  { id: 'fatigue', title: 'Fatigue', icon: 'battery-dead', description: 'Feeling tired', color: '#A1887F' },
  { id: 'thirsty', title: 'Thirsty', icon: 'water', description: 'Need water', color: '#4FC3F7' },
];

const moodOptions: OptionItem[] = [
  { id: 'happy', title: 'Happy', icon: 'happy', description: 'Feeling good', color: '#FFD54F' },
  { id: 'sad', title: 'Sad', icon: 'sad', description: 'Feeling down', color: '#81C784' },
  { id: 'angry', title: 'Angry', icon: 'flame', description: 'Feeling mad', color: '#FF8A80' },
  { id: 'worried', title: 'Worried', icon: 'cloud', description: 'Feeling anxious', color: '#90A4AE' },
  { id: 'excited', title: 'Excited', icon: 'star', description: 'Feeling energetic', color: '#FFB74D' },
  { id: 'tired', title: 'Tired', icon: 'moon', description: 'Feeling sleepy', color: '#9575CD' },
];

interface MultipleChoiceScreenProps {
  category: 'symptoms' | 'mood';
  onBack: () => void;
  onSave: (selectedOptions: string[]) => void;
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
  category,
  onBack,
  onSave,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  const options = category === 'symptoms' ? symptomsOptions : moodOptions;
  const title = category === 'symptoms' ? 'Symptoms' : 'Mood';

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleSave = () => {
    if (selectedOptions.length > 0) {
      onSave(selectedOptions);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Header */}
      <PageHeader>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.placeholder} />
        </View>
      </PageHeader>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>
            Select all that apply:
          </Text>
          
          {/* Options Grid */}
          <View style={styles.optionsGrid}>
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected
                  ]}
                  onPress={() => handleOptionToggle(option.id)}
                  activeOpacity={0.7}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <View style={styles.selectionIndicator}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                  
                  <View style={[styles.optionIconContainer, { backgroundColor: option.color + '20' }]}>
                    <Ionicons
                      name={option.icon as any}
                      size={32}
                      color={option.color}
                    />
                  </View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Save Button */}
          {selectedOptions.length > 0 && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                Save ({selectedOptions.length} selected)
              </Text>
            </TouchableOpacity>
          )}

          {/* Bottom padding */}
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
    width: 34,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  optionCard: {
    width: '47%',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  optionIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  bottomPadding: {
    height: 40,
  },
});