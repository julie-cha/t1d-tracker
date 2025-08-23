import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';

const { width } = Dimensions.get('window');

// Initialize Gemini AI
const GEMINI_API_KEY = 'AIzaSyAk7Pa16U7w85EcS6PqtdA8Qa2ezAhB9iU';

// Create a function to initialize Gemini (for better error handling)
const getGenAI = () => {
  try {
    return new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch (error) {
    console.error('Failed to initialize GoogleGenerativeAI:', error);
    return null;
  }
};

interface BloodGlucoseData {
  time: string;
  value: number;
  timestamp: number;
}

interface ActivityData {
  time: string;
  type: 'meal' | 'exercise' | 'medication' | 'sleep';
  description: string;
  source: 'child' | 'parent';
  timestamp: number;
}

interface ReportDetailProps {
  reportId: string;
  reportDate: string;
  reportType: 'daily' | 'weekly';
  onBack: () => void;
}

// Mock data - in real app, this would come from API
const mockGlucoseData: BloodGlucoseData[] = [
  { time: '06:00', value: 95, timestamp: 6 },
  { time: '07:30', value: 140, timestamp: 7.5 },
  { time: '09:00', value: 110, timestamp: 9 },
  { time: '12:00', value: 160, timestamp: 12 },
  { time: '13:30', value: 120, timestamp: 13.5 },
  { time: '15:00', value: 100, timestamp: 15 },
  { time: '18:00', value: 180, timestamp: 18 },
  { time: '19:30', value: 130, timestamp: 19.5 },
  { time: '21:00', value: 105, timestamp: 21 },
  { time: '23:00', value: 90, timestamp: 23 },
];

const mockActivityData: ActivityData[] = [
  { time: '07:00', type: 'meal', description: 'Breakfast - Oatmeal with berries', source: 'child', timestamp: 7 },
  { time: '07:15', type: 'meal', description: 'Breakfast - Oatmeal and fruit', source: 'parent', timestamp: 7.25 },
  { time: '10:00', type: 'exercise', description: '30min walk', source: 'child', timestamp: 10 },
  { time: '10:00', type: 'exercise', description: 'Morning walk', source: 'parent', timestamp: 10 },
  { time: '12:30', type: 'meal', description: 'Lunch - Sandwich', source: 'child', timestamp: 12.5 },
  { time: '18:30', type: 'meal', description: 'Dinner - Pasta', source: 'child', timestamp: 18.5 },
  { time: '18:30', type: 'meal', description: 'Dinner - Pasta with vegetables', source: 'parent', timestamp: 18.5 },
];

export const ReportDetailScreen: React.FC<ReportDetailProps> = ({
  reportId,
  reportDate,
  reportType,
  onBack,
}) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Calculate metrics
  const averageGlucose = Math.round(
    mockGlucoseData.reduce((sum, item) => sum + item.value, 0) / mockGlucoseData.length
  );

  const timeInRange = Math.round(
    (mockGlucoseData.filter(item => item.value >= 70 && item.value <= 180).length / 
     mockGlucoseData.length) * 100
  );

  const generateAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Prepare data for Gemini API
    const glucoseDataStr = mockGlucoseData.map(d => `${d.time}: ${d.value}mg/dL`).join(', ');
    const activityDataStr = mockActivityData.map(a => 
      `${a.time}: ${a.description} (${a.source})`
    ).join(', ');

    const prompt = `
    Analyze this diabetes management data for ${reportDate}:
    
    Blood Glucose Readings: ${glucoseDataStr}
    
    Activities: ${activityDataStr}
    
    Average Glucose: ${averageGlucose}mg/dL
    Time in Range (70-180): ${timeInRange}%
    
    Please provide:
    1. Analysis of glucose patterns
    2. Impact of activities on blood sugar
    3. Recommendations for better control
    4. Observations about child vs parent activity logging differences
    
    Keep response concise and actionable for a diabetes care app. Use emojis and clear formatting.
    `;

    try {
      const genAI = getGenAI();
      if (!genAI) {
        throw new Error('Failed to initialize Gemini AI');
      }

      console.log('Calling Gemini API with prompt:', prompt.substring(0, 100) + '...');
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const analysis = response.text();
      
      console.log('Gemini API response received:', analysis.substring(0, 100) + '...');
      
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    } catch (error: any) {
      console.error('AI Analysis error:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      
      // Fallback to mock analysis if API fails
      const mockAnalysis = `📊 **Glucose Pattern Analysis:**
Your average glucose of ${averageGlucose}mg/dL is slightly above target. Time in range of ${timeInRange}% shows room for improvement.

🍽️ **Meal Impact:**
Post-meal spikes detected after breakfast (140mg/dL) and dinner (180mg/dL). Consider portion control or timing adjustments.

🏃 **Activity Benefits:**
Morning exercise effectively lowered glucose from 140 to 110mg/dL. Regular physical activity is clearly beneficial.

👥 **Parent-Child Logging:**
Good consistency between child and parent meal logs. Parent provides more detail which helps with analysis.

💡 **Recommendations:**
• Consider 15-20min walk after dinner
• Monitor carbohydrate portions at dinner
• Continue morning exercise routine
• Log meal timing for better pattern recognition

⚠️ *Note: Using fallback analysis due to API connection issue*
🔧 *Error: ${error.message || 'Unknown error'}*`;

      setAiAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    generateAIAnalysis();
  }, []);

  const renderTimeSeriesChart = () => {
    const maxValue = Math.max(...mockGlucoseData.map(d => d.value));
    const minValue = Math.min(...mockGlucoseData.map(d => d.value));
    const range = maxValue - minValue;
    const chartWidth = width - 80;
    const chartHeight = 200;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Blood Glucose Timeline</Text>
        
        {/* Y-axis labels */}
        <View style={styles.yAxisContainer}>
          <Text style={styles.yAxisLabel}>{maxValue}</Text>
          <Text style={styles.yAxisLabel}>{Math.round((maxValue + minValue) / 2)}</Text>
          <Text style={styles.yAxisLabel}>{minValue}</Text>
        </View>

        {/* Chart area */}
        <View style={styles.chartArea}>
          {/* Target range indicator */}
          <View style={[styles.targetRange, {
            top: ((maxValue - 180) / range) * chartHeight,
            height: ((180 - 70) / range) * chartHeight,
          }]} />
          
          {/* Data points and line */}
          {mockGlucoseData.map((point, index) => {
            const x = (index / (mockGlucoseData.length - 1)) * chartWidth;
            const y = ((maxValue - point.value) / range) * chartHeight;
            
            return (
              <View key={index}>
                <View style={[styles.dataPoint, { left: x - 4, top: y - 4 }]} />
                {index < mockGlucoseData.length - 1 && (
                  <View style={[styles.dataLine, {
                    left: x,
                    top: y,
                    width: chartWidth / (mockGlucoseData.length - 1),
                    transform: [{
                      rotate: `${Math.atan2(
                        ((maxValue - mockGlucoseData[index + 1].value) / range) * chartHeight - y,
                        chartWidth / (mockGlucoseData.length - 1)
                      )}rad`
                    }]
                  }]} />
                )}
              </View>
            );
          })}
        </View>

        {/* X-axis labels */}
        <View style={styles.xAxisContainer}>
          {mockGlucoseData.filter((_, i) => i % 2 === 0).map((point, index) => (
            <Text key={index} style={styles.xAxisLabel}>{point.time}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderActivityTimeline = () => {
    return (
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Activity Timeline</Text>
        
        {/* Child activities */}
        <View style={styles.timelineRow}>
          <Text style={styles.timelineLabel}>Child</Text>
          <View style={styles.timelineTrack}>
            {mockActivityData
              .filter(a => a.source === 'child')
              .map((activity, index) => (
                <View
                  key={index}
                  style={[
                    styles.activityMarker,
                    { left: `${(activity.timestamp / 24) * 100}%` },
                    { backgroundColor: getActivityColor(activity.type) }
                  ]}
                />
              ))}
          </View>
        </View>

        {/* Parent activities */}
        <View style={styles.timelineRow}>
          <Text style={styles.timelineLabel}>Parent</Text>
          <View style={styles.timelineTrack}>
            {mockActivityData
              .filter(a => a.source === 'parent')
              .map((activity, index) => (
                <View
                  key={index}
                  style={[
                    styles.activityMarker,
                    { left: `${(activity.timestamp / 24) * 100}%` },
                    { backgroundColor: getActivityColor(activity.type) }
                  ]}
                />
              ))}
          </View>
        </View>

        {/* Activity legend */}
        <View style={styles.activityLegend}>
          {['meal', 'exercise', 'medication', 'sleep'].map(type => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: getActivityColor(type as any) }]} />
              <Text style={styles.legendText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meal': return '#FF6B6B';
      case 'exercise': return '#51CF66';
      case 'medication': return '#4DABF7';
      case 'sleep': return '#9775FA';
      default: return '#999';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {reportType === 'daily' ? 'Daily' : 'Weekly'} Report
        </Text>
        <Text style={styles.headerDate}>{reportDate}</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Glucose</Text>
            <Text style={styles.metricValue}>{averageGlucose}</Text>
            <Text style={styles.metricUnit}>mg/dL</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Time in Range</Text>
            <Text style={styles.metricValue}>{timeInRange}</Text>
            <Text style={styles.metricUnit}>%</Text>
          </View>
        </View>

        {/* Time Series Chart */}
        {renderTimeSeriesChart()}

        {/* Activity Timeline */}
        {renderActivityTimeline()}

        {/* AI Analysis */}
        <View style={styles.analysisSection}>
          <View style={styles.analysisHeader}>
            <Ionicons name="sparkles" size={20} color="#4DABF7" />
            <Text style={styles.analysisTitle}>AI Analysis</Text>
          </View>
          
          {isAnalyzing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4DABF7" />
              <Text style={styles.loadingText}>Analyzing your data...</Text>
            </View>
          ) : (
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>{aiAnalysis}</Text>
              <TouchableOpacity 
                style={styles.refreshButton}
                onPress={generateAIAnalysis}
              >
                <Ionicons name="refresh" size={16} color="#4DABF7" />
                <Text style={styles.refreshText}>Refresh Analysis</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B7B7B',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  metricUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  yAxisContainer: {
    position: 'absolute',
    left: 0,
    top: 60,
    height: 200,
    justifyContent: 'space-between',
    width: 40,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  chartArea: {
    marginLeft: 50,
    height: 200,
    position: 'relative',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  targetRange: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(81, 207, 102, 0.2)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#51CF66',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4DABF7',
    borderWidth: 2,
    borderColor: 'white',
  },
  dataLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#4DABF7',
    transformOrigin: 'left center',
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginTop: 10,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#666',
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 30,
  },
  timelineLabel: {
    width: 60,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  timelineTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    position: 'relative',
  },
  activityMarker: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    top: -4,
    borderWidth: 2,
    borderColor: 'white',
  },
  activityLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  analysisSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  analysisContent: {
    minHeight: 200,
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#4DABF7',
    borderRadius: 8,
  },
  refreshText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4DABF7',
    fontWeight: '500',
  },
});