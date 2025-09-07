import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { PageHeader } from '../components/PageHeader';
import { ReportDetailScreen } from './ReportDetailScreen';

interface ReportData {
  id: string;
  date: string;
  type: 'daily' | 'weekly';
  title: string;
  summary: string;
  childChecked: boolean;
  parentChecked: boolean;
  childEmoji?: string;
  parentEmoji?: string;
}

const mockReports: ReportData[] = [
  {
    id: '1',
    date: '2025-08-17',
    type: 'daily',
    title: 'Daily Report - August 17',
    summary: 'Blood glucose levels were stable today with 2 minor spikes after meals. Activity levels were good with 30 minutes of exercise.',
    childChecked: true,
    parentChecked: false,
    childEmoji: '😊',
  },
  {
    id: '2',
    date: '2025-08-16',
    type: 'daily',
    title: 'Daily Report - August 16',
    summary: 'Great glucose control throughout the day. No significant spikes detected. Excellent adherence to meal timing.',
    childChecked: true,
    parentChecked: true,
    childEmoji: '😄',
    parentEmoji: '👍',
  },
  {
    id: '3',
    date: '2025-08-11',
    type: 'weekly',
    title: 'Weekly Report - Aug 11-17',
    summary: 'This week showed improved glucose management with 85% time in range. Physical activity increased by 20% compared to last week.',
    childChecked: false,
    parentChecked: false,
  },
];

const emojiOptions = ['😊', '😄', '🙂', '😐', '😟', '😢', '👍', '👎', '❤️', '💪'];

export const ReviewScreen: React.FC = () => {
  const [reportType, setReportType] = useState<'daily' | 'weekly'>('daily');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerFor, setEmojiPickerFor] = useState<'child' | 'parent'>('child');
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [detailReport, setDetailReport] = useState<ReportData | null>(null);

  const filteredReports = mockReports.filter(report => report.type === reportType);

  const handleEmojiSelect = (emoji: string) => {
    if (selectedReport) {
      // In a real app, this would update the backend
      console.log(`Selected ${emoji} for ${emojiPickerFor} on report ${selectedReport.id}`);
    }
    setShowEmojiPicker(false);
  };

  const openEmojiPicker = (report: ReportData, userType: 'child' | 'parent') => {
    setSelectedReport(report);
    setEmojiPickerFor(userType);
    setShowEmojiPicker(true);
  };

  const getStatusColor = (childChecked: boolean, parentChecked: boolean) => {
    if (childChecked && parentChecked) return '#51CF66';
    if (childChecked || parentChecked) return '#FFD43B';
    return '#FF6B6B';
  };

  const openReportDetail = (report: ReportData) => {
    setDetailReport(report);
    setShowReportDetail(true);
  };

  const closeReportDetail = () => {
    setShowReportDetail(false);
    setDetailReport(null);
  };

  if (showReportDetail && detailReport) {
    return (
      <ReportDetailScreen
        reportId={detailReport.id}
        reportDate={detailReport.date}
        reportType={detailReport.type}
        onBack={closeReportDetail}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Header */}
      <PageHeader>
        <Text style={styles.headerTitle}>Health Reports</Text>
      </PageHeader>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, reportType === 'daily' && styles.toggleButtonActive]}
            onPress={() => setReportType('daily')}
          >
            <Text style={[styles.toggleText, reportType === 'daily' && styles.toggleTextActive]}>
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, reportType === 'weekly' && styles.toggleButtonActive]}
            onPress={() => setReportType('weekly')}
          >
            <Text style={[styles.toggleText, reportType === 'weekly' && styles.toggleTextActive]}>
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Header - Only show for daily reports */}
        {reportType === 'daily' && (
          <View style={styles.calendarSection}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-back" size={20} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>August 2025</Text>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-forward" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            {/* Mini Calendar Dots */}
            <View style={styles.calendarDots}>
              {[11, 12, 13, 14, 15, 16, 17].map((day) => {
                const hasReport = mockReports.some(r => r.date.includes(`-${day.toString().padStart(2, '0')}`));
                const report = mockReports.find(r => r.date.includes(`-${day.toString().padStart(2, '0')}`));
                const statusColor = report ? getStatusColor(report.childChecked, report.parentChecked) : '#DDD';
                
                return (
                  <View key={day} style={styles.calendarDay}>
                    <Text style={styles.calendarDayText}>{day}</Text>
                    {hasReport && <View style={[styles.calendarDot, { backgroundColor: statusColor }]} />}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Reports List */}
        {filteredReports.map((report) => (
          <TouchableOpacity 
            key={report.id} 
            style={styles.reportCard}
            onPress={() => openReportDetail(report)}
          >
            {/* Warning Indicator */}
            {!report.childChecked || !report.parentChecked ? (
              <View style={styles.warningBanner}>
                <Ionicons name="warning" size={16} color="#FF6B6B" />
                <Text style={styles.warningText}>
                  {!report.childChecked && !report.parentChecked 
                    ? 'Both child and parent need to review' 
                    : !report.childChecked 
                    ? 'Child needs to review' 
                    : 'Parent needs to review'}
                </Text>
              </View>
            ) : null}

            {/* Report Content */}
            <View style={styles.reportHeader}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(report.childChecked, report.parentChecked) }]} />
            </View>
            
            <Text style={styles.reportSummary}>{report.summary}</Text>

            {/* Check Status */}
            <View style={styles.checkSection}>
              <View style={styles.checkRow}>
                <View style={styles.checkUser}>
                  <Ionicons name="person" size={16} color="#666" />
                  <Text style={styles.checkUserText}>Child</Text>
                </View>
                <TouchableOpacity
                  style={[styles.emojiButton, report.childChecked && styles.emojiButtonChecked]}
                  onPress={() => openEmojiPicker(report, 'child')}
                >
                  {report.childEmoji ? (
                    <Text style={styles.emojiText}>{report.childEmoji}</Text>
                  ) : (
                    <Ionicons name="add" size={20} color="#666" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.checkRow}>
                <View style={styles.checkUser}>
                  <Ionicons name="people" size={16} color="#666" />
                  <Text style={styles.checkUserText}>Parent</Text>
                </View>
                <TouchableOpacity
                  style={[styles.emojiButton, report.parentChecked && styles.emojiButtonChecked]}
                  onPress={() => openEmojiPicker(report, 'parent')}
                >
                  {report.parentEmoji ? (
                    <Text style={styles.emojiText}>{report.parentEmoji}</Text>
                  ) : (
                    <Ionicons name="add" size={20} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Emoji Picker Modal */}
      <Modal visible={showEmojiPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.emojiPickerContainer}>
            <View style={styles.emojiPickerHeader}>
              <Text style={styles.emojiPickerTitle}>
                How did this make you feel?
              </Text>
              <TouchableOpacity onPress={() => setShowEmojiPicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.emojiGrid}>
              {emojiOptions.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.emojiOption}
                  onPress={() => handleEmojiSelect(emoji)}
                >
                  <Text style={styles.emojiOptionText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.textWhite,
  },
  calendarSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  calendarDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    alignItems: 'center',
    width: 40,
  },
  calendarDayText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
    fontWeight: '500',
  },
  calendarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  reportsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reportCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 8,
    fontWeight: '500',
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  reportSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  checkSection: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  checkUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkUserText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  emojiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiButtonChecked: {
    backgroundColor: '#E8F5E8',
    borderColor: '#51CF66',
  },
  emojiText: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  emojiPickerContainer: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  emojiPickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emojiPickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emojiOption: {
    width: '18%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  emojiOptionText: {
    fontSize: 32,
  },
});