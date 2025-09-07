import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActionSheetIOS,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { geminiService } from '../services/geminiService';
import { colors } from '../styles/colors';

interface FoodPhotoCaptureProps {
  onPhotoChange: (uri: string | null) => void;
  onFoodRecognized: (foodName: string) => void;
  photoUri: string | null;
}

export const FoodPhotoCapture: React.FC<FoodPhotoCaptureProps> = ({
  onPhotoChange,
  onFoodRecognized,
  photoUri,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);

  const requestPermissions = async () => {
    // Request camera permissions
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to take photos of food.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Request media library permissions
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaPermission.status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Photo library permission is needed to select photos.',
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  };

  const takePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photoUri = result.assets[0].uri;
        onPhotoChange(photoUri);
        await recognizeFood(photoUri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectFromGallery = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photoUri = result.assets[0].uri;
        onPhotoChange(photoUri);
        await recognizeFood(photoUri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select photo. Please try again.');
      console.error('Gallery error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showImageOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery', 'Remove Photo'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: photoUri ? 3 : undefined,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 1:
              takePhoto();
              break;
            case 2:
              selectFromGallery();
              break;
            case 3:
              if (photoUri) {
                onPhotoChange(null);
              }
              break;
          }
        }
      );
    } else {
      // Android Alert
      const options = [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: selectFromGallery },
      ];

      if (photoUri) {
        options.push({ text: 'Remove Photo', onPress: () => onPhotoChange(null), style: 'destructive' });
      }

      options.push({ text: 'Cancel', style: 'cancel' });

      Alert.alert('Food Photo', 'Choose an option', options);
    }
  };

  const recognizeFood = async (imageUri: string) => {
    setIsRecognizing(true);
    try {
      // Use mock service for now - replace with real service when API key is configured
      const result = await geminiService.mockRecognizeFood(imageUri);
      console.log('Food recognized:', result);
      onFoodRecognized(result.name);
    } catch (error) {
      console.error('Food recognition failed:', error);
      // Don't show error to user - just skip auto-fill
    } finally {
      setIsRecognizing(false);
    }
  };

  const removePhoto = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => onPhotoChange(null), style: 'destructive' as any },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Photo (Optional)</Text>
      
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          {isRecognizing && (
            <View style={styles.recognitionOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.recognitionText}>Recognizing food...</Text>
            </View>
          )}
          <View style={styles.photoActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={showImageOptions}
              disabled={isLoading || isRecognizing}
            >
              <Ionicons name="camera" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.removeButton]}
              onPress={removePhoto}
              disabled={isLoading || isRecognizing}
            >
              <Ionicons name="trash" size={20} color={colors.danger} />
              <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={showImageOptions}
          disabled={isLoading}
        >
          <View style={styles.captureContent}>
            <Ionicons 
              name="camera" 
              size={32} 
              color={isLoading ? colors.textSecondary : colors.primary} 
            />
            <Text style={[styles.captureText, isLoading && styles.captureTextDisabled]}>
              {isLoading ? 'Loading...' : 'Add Food Photo'}
            </Text>
            <Text style={styles.captureSubtext}>
              Take a photo or choose from gallery
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  captureButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.chartBackground,
    borderStyle: 'dashed',
  },
  captureContent: {
    alignItems: 'center',
  },
  captureText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
  captureTextDisabled: {
    color: colors.textSecondary,
  },
  captureSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  photoContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.chartBackground,
  },
  photo: {
    width: '100%',
    height: 200,
    backgroundColor: colors.chartBackground,
  },
  photoActions: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.chartBackground,
    borderRadius: 8,
    gap: 6,
  },
  removeButton: {
    backgroundColor: colors.cardSecondary,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  removeText: {
    color: colors.danger,
  },
  recognitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  recognitionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 8,
  },
});