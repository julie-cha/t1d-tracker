import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab: 'home' | 'log' | 'add' | 'review' | 'profile';
  onTabPress: (tab: 'home' | 'log' | 'add' | 'review' | 'profile') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'log', icon: 'stats-chart', label: 'Log' },
    { key: 'add', icon: 'add-circle', label: 'Add' },
    { key: 'review', icon: 'document-text', label: 'Review' },
    { key: 'profile', icon: 'person', label: 'Profile' },
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.key ? '#4A90E2' : '#8E8E93'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    paddingTop: 12,
    paddingBottom: 34,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});