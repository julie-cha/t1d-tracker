import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

interface TimePickerProps {
  label: string;
  value: string; // HH:MM format
  onTimeChange: (time: string) => void;
  required?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onTimeChange,
  required = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(
    value ? parseInt(value.split(':')[0]) : new Date().getHours()
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? parseInt(value.split(':')[1]) : Math.floor(new Date().getMinutes() / 5) * 5
  );

  // Generate hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Generate minutes in 5-minute intervals (0, 5, 10, 15, ..., 55)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const formatDisplay = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const handleConfirm = () => {
    const timeString = formatTime(selectedHour, selectedMinute);
    onTimeChange(timeString);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Reset to current value
    if (value) {
      const [hour, minute] = value.split(':').map(Number);
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
    setIsModalVisible(false);
  };

  const displayValue = value 
    ? formatDisplay(parseInt(value.split(':')[0]), parseInt(value.split(':')[1]))
    : 'Select time';

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[styles.timeText, !value && styles.placeholderText]}>
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
            <SafeAreaView>
              {/* Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Select Time</Text>
                <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                  <Text style={styles.confirmText}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* Time Display */}
              <View style={styles.timeDisplay}>
                <Text style={styles.selectedTimeText}>
                  {formatDisplay(selectedHour, selectedMinute)}
                </Text>
              </View>

              {/* Pickers */}
              <View style={styles.pickersContainer}>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Hour</Text>
                  <Picker
                    selectedValue={selectedHour}
                    onValueChange={(value) => setSelectedHour(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {hours.map((hour) => (
                      <Picker.Item
                        key={hour}
                        label={hour === 0 ? '12 AM' : hour <= 12 ? `${hour} ${hour === 12 ? 'PM' : 'AM'}` : `${hour - 12} PM`}
                        value={hour}
                      />
                    ))}
                  </Picker>
                </View>

                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Minute</Text>
                  <Picker
                    selectedValue={selectedMinute}
                    onValueChange={(value) => setSelectedMinute(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {minutes.map((minute) => (
                      <Picker.Item
                        key={minute}
                        label={minute.toString().padStart(2, '0')}
                        value={minute}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </SafeAreaView>
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
  timeButton: {
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
  timeText: {
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
    maxHeight: '70%',
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
  timeDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.chartBackground,
  },
  selectedTimeText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  pickersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
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