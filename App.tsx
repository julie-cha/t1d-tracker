import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { LogScreen } from './src/screens/LogScreen';
import { AddLogScreen } from './src/screens/AddLogScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { BottomNavigation } from './src/components/BottomNavigation';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'log' | 'add' | 'review' | 'profile'>('home');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'log':
        return <LogScreen />;
      case 'add':
        return <AddLogScreen />;
      case 'review':
        return <ReviewScreen />;
      case 'profile':
        return <View style={styles.placeholder}><></></View>;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderActiveScreen()}
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B7B7B',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B7B7B',
  },
});