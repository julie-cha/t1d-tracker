import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../components/PageHeader';
import { TimePicker } from '../components/TimePicker';
import { FoodPhotoCapture } from '../components/FoodPhotoCapture';
import { SportsSelector } from '../components/SportsSelector';
import { DurationPicker } from '../components/DurationPicker';
import { colors } from '../styles/colors';

interface ActivityInputScreenProps {
  category: string;
  subcategory: string;
  subcategoryTitle: string;
  onBack: () => void;
  onSave: (data: any) => void;
}

export const ActivityInputScreen: React.FC<ActivityInputScreenProps> = ({
  category,
  subcategory,
  subcategoryTitle,
  onBack,
  onSave,
}) => {
  // Common form states
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5)); // HH:MM format
  const [notes, setNotes] = useState('');

  // Food-specific states
  const [carbs, setCarbs] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodPhotoUri, setFoodPhotoUri] = useState<string | null>(null);

  // Activity-specific states
  const [startTime, setStartTime] = useState(new Date().toTimeString().slice(0, 5));
  const [duration, setDuration] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [customActivityName, setCustomActivityName] = useState('');

  // Sleep-specific states
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepQuality, setSleepQuality] = useState<number>(3); // 1-5 scale

  // Insulin-specific states
  const [units, setUnits] = useState('');
  const [injectionSite, setInjectionSite] = useState('');

  // Symptoms-specific states
  const [severity, setSeverity] = useState<number>(3); // 1-5 scale
  const [bgLevel, setBgLevel] = useState('');

  // Mood/Stress-specific states
  const [intensity, setIntensity] = useState<number>(3); // 1-5 scale

  const handleSave = () => {
    const baseData = {
      category,
      subcategory,
      subcategoryTitle,
      timestamp: new Date().toISOString(),
      notes,
    };

    let specificData = {};

    switch (category) {
      case 'food':
        if (!carbs) {
          Alert.alert('Missing Information', 'Please enter carbohydrate amount');
          return;
        }
        specificData = {
          carbs: parseFloat(carbs),
          time,
          foodName: foodName.trim(),
          photoUri: foodPhotoUri,
        };
        break;

      case 'activities':
        if (!duration) {
          Alert.alert('Missing Information', 'Please enter duration');
          return;
        }
        if (subcategory === 'sports' && !selectedSport) {
          Alert.alert('Missing Information', 'Please select a sport type');
          return;
        }
        if (subcategory === 'other' && !customActivityName.trim()) {
          Alert.alert('Missing Information', 'Please enter activity name');
          return;
        }
        specificData = {
          startTime,
          duration: parseInt(duration),
          sport: subcategory === 'sports' ? selectedSport : undefined,
          activityName: subcategory === 'other' ? customActivityName.trim() : undefined,
        };
        break;

      case 'sleep':
        if (!bedTime || !wakeTime) {
          Alert.alert('Missing Information', 'Please enter both bed time and wake time');
          return;
        }
        specificData = {
          bedTime,
          wakeTime,
          quality: sleepQuality,
        };
        break;

      case 'insulin':
        if (!units) {
          Alert.alert('Missing Information', 'Please enter insulin units');
          return;
        }
        specificData = {
          units: parseFloat(units),
          injectionSite,
          time,
        };
        break;

      case 'symptoms':
        specificData = {
          severity,
          bgLevel: bgLevel ? parseFloat(bgLevel) : null,
          time,
        };
        break;

      case 'mood':
      case 'stress':
        specificData = {
          intensity,
          time,
        };
        break;

      default:
        specificData = { time };
    }

    const finalData = { ...baseData, ...specificData };
    console.log('Saving activity data:', finalData);
    onSave(finalData);
  };

  const handleFoodRecognized = (recognizedName: string) => {
    // Only auto-fill if the field is empty
    if (!foodName.trim()) {
      setFoodName(recognizedName);
    }
  };

  const renderFoodForm = () => (
    <>
      <FoodPhotoCapture
        onPhotoChange={setFoodPhotoUri}
        onFoodRecognized={handleFoodRecognized}
        photoUri={foodPhotoUri}
      />
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Food Name</Text>
        <TextInput
          style={styles.textInput}
          value={foodName}
          onChangeText={setFoodName}
          placeholder="Enter food name (e.g., Pizza slice, Apple)"
          placeholderTextColor={colors.textSecondary}
        />
        <Text style={styles.helperText}>
          {foodPhotoUri ? '✨ Auto-filled from photo recognition' : 'Add a photo to auto-detect food name'}
        </Text>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Carbohydrates (g) *</Text>
        <TextInput
          style={styles.textInput}
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
          placeholder="Enter carbs amount"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      <TimePicker
        label="Time"
        value={time}
        onTimeChange={setTime}
      />
    </>
  );

  const renderActivityForm = () => (
    <>
      {subcategory === 'sports' && (
        <SportsSelector
          label="Sport Type"
          value={selectedSport}
          onSportsChange={setSelectedSport}
          required={true}
        />
      )}

      {subcategory === 'other' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Activity Name *</Text>
          <TextInput
            style={styles.textInput}
            value={customActivityName}
            onChangeText={setCustomActivityName}
            placeholder="Enter activity name"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      )}
      
      <TimePicker
        label="Start Time"
        value={startTime}
        onTimeChange={setStartTime}
      />
      
      <DurationPicker
        label="Duration"
        value={duration}
        onDurationChange={setDuration}
        required={true}
      />
    </>
  );

  const renderSleepForm = () => (
    <>
      <TimePicker
        label="Bed Time"
        value={bedTime}
        onTimeChange={setBedTime}
        required={true}
      />
      
      <TimePicker
        label="Wake Time"
        value={wakeTime}
        onTimeChange={setWakeTime}
        required={true}
      />
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sleep Quality (1-5)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                sleepQuality === rating && styles.ratingButtonActive
              ]}
              onPress={() => setSleepQuality(rating)}
            >
              <Text style={[
                styles.ratingText,
                sleepQuality === rating && styles.ratingTextActive
              ]}>
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  const renderInsulinForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Units *</Text>
        <TextInput
          style={styles.textInput}
          value={units}
          onChangeText={setUnits}
          keyboardType="numeric"
          placeholder="Enter units"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Injection Site</Text>
        <TextInput
          style={styles.textInput}
          value={injectionSite}
          onChangeText={setInjectionSite}
          placeholder="e.g., Left arm, Abdomen"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      <TimePicker
        label="Time"
        value={time}
        onTimeChange={setTime}
      />
    </>
  );

  const renderSymptomsForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Severity (1-5)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                severity === rating && styles.ratingButtonActive
              ]}
              onPress={() => setSeverity(rating)}
            >
              <Text style={[
                styles.ratingText,
                severity === rating && styles.ratingTextActive
              ]}>
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Blood Glucose (mg/dL)</Text>
        <TextInput
          style={styles.textInput}
          value={bgLevel}
          onChangeText={setBgLevel}
          keyboardType="numeric"
          placeholder="Optional"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      <TimePicker
        label="Time"
        value={time}
        onTimeChange={setTime}
      />
    </>
  );

  const renderMoodStressForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Intensity (1-5)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                intensity === rating && styles.ratingButtonActive
              ]}
              onPress={() => setIntensity(rating)}
            >
              <Text style={[
                styles.ratingText,
                intensity === rating && styles.ratingTextActive
              ]}>
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TimePicker
        label="Time"
        value={time}
        onTimeChange={setTime}
      />
    </>
  );

  const renderDefaultForm = () => (
    <TimePicker
      label="Time"
      value={time}
      onTimeChange={setTime}
    />
  );

  const renderCategorySpecificForm = () => {
    switch (category) {
      case 'food':
        return renderFoodForm();
      case 'activities':
        return renderActivityForm();
      case 'sleep':
        return renderSleepForm();
      case 'insulin':
        return renderInsulinForm();
      case 'symptoms':
        return renderSymptomsForm();
      case 'mood':
      case 'stress':
        return renderMoodStressForm();
      default:
        return renderDefaultForm();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subcategoryTitle}</Text>
          <View style={styles.placeholder} />
        </View>
      </PageHeader>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Enter details:</Text>
          
          {renderCategorySpecificForm()}
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.notesInput]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any additional notes..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>

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
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.chartBackground,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.chartBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.chartBackground,
  },
  ratingButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  ratingTextActive: {
    color: colors.cardBackground,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  bottomPadding: {
    height: 90,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
});