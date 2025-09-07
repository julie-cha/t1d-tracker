import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

interface SportsSelectorProps {
  label: string;
  value: string;
  onSportsChange: (sport: string) => void;
  required?: boolean;
}

const SPORTS_LIST = [
  'Soccer',
  'Basketball',
  'Baseball',
  'Tennis',
  'Swimming', 
  'Running',
  'Cycling',
  'Volleyball',
  'Badminton',
  'Table Tennis',
  'Golf',
  'Taekwondo',
  'Judo',
  'Gymnastics',
  'Track and Field',
  'Ice Skating',
  'Skiing',
  'Skateboarding',
  'Climbing',
  'Yoga',
  'Dance',
  'Martial Arts',
  'Wrestling',
  'Boxing',
  'Other (Custom)',
];

export const SportsSelector: React.FC<SportsSelectorProps> = ({
  label,
  value,
  onSportsChange,
  required = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Filter sports based on search text
  const allSports = SPORTS_LIST.filter(sport => sport !== 'Other (Custom)');
  const filteredSports = searchText.length > 0 
    ? allSports.filter(sport => sport.toLowerCase().includes(searchText.toLowerCase()))
    : allSports;

  const handleSportSelect = (sport: string) => {
    onSportsChange(sport);
    setIsModalVisible(false);
    setSearchText('');
  };

  const handleCustomSubmit = () => {
    const customSport = searchText.trim();
    if (customSport) {
      onSportsChange(customSport);
      setIsModalVisible(false);
      setSearchText('');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchText('');
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
    // Pre-fill with current value if it exists
    if (value) {
      setSearchText(value);
    }
  };

  const displayValue = value || 'Select sport';

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={handleModalOpen}
        >
          <Text style={[styles.selectorText, !value && styles.placeholderText]}>
            {displayValue}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Select Sport</Text>
                <TouchableOpacity 
                  onPress={handleCustomSubmit}
                  style={styles.doneButton}
                  disabled={!searchText.trim()}
                >
                  <Text style={[
                    styles.doneText,
                    !searchText.trim() && styles.doneTextDisabled
                  ]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Search Input */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Ionicons name="search" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Type sport name or search list..."
                    placeholderTextColor={colors.textSecondary}
                    autoFocus={true}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')}>
                      <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
                {searchText.trim() && !filteredSports.some(sport => 
                  sport.toLowerCase() === searchText.toLowerCase()
                ) && (
                  <Text style={styles.customHint}>
                    Press "Done" to use "{searchText}" as custom sport
                  </Text>
                )}
              </View>

              {/* Sports List */}
              <ScrollView 
                style={styles.sportsList} 
                contentContainerStyle={styles.sportsListContent}
                showsVerticalScrollIndicator={false}
              >
                {filteredSports.map((sport, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sportItem,
                      sport === value && styles.sportItemSelected,
                    ]}
                    onPress={() => handleSportSelect(sport)}
                  >
                    <Text style={[
                      styles.sportText,
                      sport === value && styles.sportTextSelected,
                    ]}>
                      {sport}
                    </Text>
                    {sport === value && (
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
                {searchText.trim() && filteredSports.length === 0 && (
                  <View style={styles.noResultsContainer}>
                    <Ionicons name="search" size={40} color={colors.textSecondary} />
                    <Text style={styles.noResultsText}>No sports found</Text>
                    <Text style={styles.noResultsSubtext}>
                      Type your custom sport name above
                    </Text>
                  </View>
                )}
              </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: colors.danger,
  },
  selectorButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.chartBackground,
  },
  selectorText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.chartBackground,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 60, // Same as cancel button width
  },
  sportsList: {
    flex: 1,
  },
  sportsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  sportItemSelected: {
    backgroundColor: colors.chartBackground,
  },
  customSportItem: {
    backgroundColor: colors.cardSecondary,
    marginTop: 8,
  },
  sportText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  sportTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  customSportText: {
    fontWeight: '500',
    color: colors.textSecondary,
  },
  customInputContainer: {
    padding: 20,
  },
  customInputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  customTextInput: {
    backgroundColor: colors.chartBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  customInputActions: {
    flexDirection: 'row',
    gap: 12,
  },
  customBackButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.chartBackground,
  },
  customBackText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  customSubmitButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  customSubmitButtonDisabled: {
    backgroundColor: colors.chartBackground,
  },
  customSubmitText: {
    fontSize: 16,
    color: colors.cardBackground,
    fontWeight: '600',
  },
  customSubmitTextDisabled: {
    color: colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.chartBackground,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.chartBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  customHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  doneButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  doneTextDisabled: {
    color: colors.textSecondary,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});