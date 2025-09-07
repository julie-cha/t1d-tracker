import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

interface DurationPickerProps {
  label: string;
  value: string; // minutes as string
  onDurationChange: (duration: string) => void;
  required?: boolean;
}

export const DurationPicker: React.FC<DurationPickerProps> = ({
  label,
  value,
  onDurationChange,
  required = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(
    value ? parseInt(value) : 30
  );

  // Generate durations in 10-minute intervals (10, 20, 30, ..., 180 = 3 hours)
  const durations = Array.from({ length: 18 }, (_, i) => (i + 1) * 10);

  const handleConfirm = () => {
    onDurationChange(selectedDuration.toString());
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Reset to current value
    if (value) {
      setSelectedDuration(parseInt(value));
    }
    setIsModalVisible(false);
  };

  const displayValue = value 
    ? `${value} minutes`
    : 'Select duration';

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TouchableOpacity
          style={styles.durationButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[styles.durationText, !value && styles.placeholderText]}>
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
              <Text style={styles.modalTitle}>Select Duration</Text>
              <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Duration Display */}
            <View style={styles.durationDisplay}>
              <Text style={styles.selectedDurationText}>
                {selectedDuration} minutes
              </Text>
            </View>

            {/* Picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Minutes</Text>
              <Picker
                selectedValue={selectedDuration}
                onValueChange={(value) => setSelectedDuration(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {durations.map((duration) => (
                  <Picker.Item
                    key={duration}
                    label={`${duration} min`}
                    value={duration}
                  />
                ))}
              </Picker>
            </View>
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
  durationButton: {
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
  durationText: {
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
    height: '60%',
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
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  durationDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.chartBackground,
  },
  selectedDurationText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 10,
    marginTop: 10,
  },
  picker: {
    width: '100%',
    height: 200,
  },
  pickerItem: {
    fontSize: 18,
    color: colors.textPrimary,
  },
});