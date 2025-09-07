import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface PageHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5FF',
  },
});