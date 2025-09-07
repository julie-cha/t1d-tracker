import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

interface GlucoseChartProps {
  data?: number[];
}

// Generate 24 hours of data with 10-minute intervals (144 data points)
const generateHourlyData = () => {
  const data = [];
  const labels = [];
  
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      // Generate sample glucose data (80-140 mg/dL range)
      const baseValue = 100 + Math.sin(hour / 24 * Math.PI * 2) * 20;
      const variation = (Math.random() - 0.5) * 30;
      data.push(Math.max(80, Math.min(140, Math.round(baseValue + variation))));
      
      // Create labels for every hour
      if (minute === 0) {
        // Fix hour display logic
        let displayHour;
        if (hour === 0) {
          displayHour = 12;
        } else if (hour <= 12) {
          displayHour = hour;
        } else {
          displayHour = hour - 12;
        }
        
        const ampm = hour < 12 ? 'AM' : 'PM';
        const labelText = `${displayHour}${ampm}`;
        labels.push(labelText);
      } else {
        labels.push('');
      }
    }
  }
  
  return { data, labels };
};

// Event types with icons and colors
const eventTypes = {
  meal: { icon: 'restaurant', color: '#FFB74D', library: 'MaterialIcons' },
  snack: { icon: 'cookie', color: '#FF8A80', library: 'MaterialIcons' },
  exercise: { icon: 'running', color: '#6B8EF8', library: 'FontAwesome5' },
  insulin: { icon: 'syringe', color: '#9C27B0', library: 'FontAwesome5' },
  sleep: { icon: 'bed', color: '#607D8B', library: 'Ionicons' },
  water: { icon: 'water', color: '#4FC3F7', library: 'Ionicons' },
  medicine: { icon: 'medical', color: '#81C784', library: 'Ionicons' },
  stress: { icon: 'alert-circle', color: '#FFB300', library: 'Ionicons' },
  checkup: { icon: 'heart', color: '#E91E63', library: 'Ionicons' },
};

// Sample events data (time in hours from midnight, type, user)
const sampleEvents = {
  child: [
    { time: 7, type: 'meal', label: 'Breakfast' },
    { time: 10, type: 'snack', label: 'Snack' },
    { time: 12.5, type: 'meal', label: 'Lunch' },
    { time: 15, type: 'exercise', label: 'Running' },
    { time: 18.5, type: 'meal', label: 'Dinner' },
    { time: 22, type: 'sleep', label: 'Sleep' },
  ],
  parent: [
    { time: 8.5, type: 'insulin', label: 'Insulin' },
    { time: 11, type: 'checkup', label: 'Blood Check' },
    { time: 16, type: 'water', label: 'Water' },
    { time: 17, type: 'stress', label: 'Stress noted' },
    { time: 21, type: 'medicine', label: 'Medicine' },
  ],
};

export const GlucoseChart: React.FC<GlucoseChartProps> = () => {
  const { data, labels } = generateHourlyData();
  const chartScrollRef = useRef<ScrollView>(null);
  const eventScrollRef = useRef<ScrollView>(null);
  const isScrollingSyncRef = useRef(false);
  
  // State for current time - updates every minute
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      console.log('Current time update:', {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        timeString: now.toLocaleTimeString('ko-KR', { hour12: false })
      });
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Get current time (using local device time)
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  
  console.log('Debug - Current Time:', {
    currentTime: currentTime.toLocaleString('ko-KR'),
    currentHour: currentHour,
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes()
  });
  
  // 현재 시간 + 1시간의 여유 공간 추가
  const currentDataIndex = Math.floor(currentHour * 6) + 1;
  const extraHourPoints = 6; // 1시간 = 6 데이터 포인트 (10분 간격)
  const displayDataIndex = Math.min(144, currentDataIndex + extraHourPoints); // 최대 144개 (24시간)
  
  // 차트 데이터: 현재 시간까지의 실제 데이터 + 미래 1시간은 최소값
  const actualData = data.slice(0, currentDataIndex);
  // 미래 데이터는 차트 최하단 값(80)으로 설정하여 평평한 선 생성
  const futureData = Array(extraHourPoints).fill(80); 
  
  const chartDataPoints = [...actualData, ...futureData];
  const chartLabels = labels.slice(0, displayDataIndex); // 라벨은 1시간 더 표시
  
  // 차트 너비는 전체 24시간 기준으로 유지 (스크롤 가능하게)

  // Chart calculations
  const chartWidth = screenWidth * 4;
  
  // react-native-chart-kit의 실제 패딩 값 (라이브러리 소스 분석)
  const CHART_PADDING_LEFT = 60; // 실제 차트 왼쪽 패딩
  const CHART_PADDING_RIGHT = 60; // 실제 차트 오른쪽 패딩
  const actualDataWidth = chartWidth - CHART_PADDING_LEFT - CHART_PADDING_RIGHT;
  
  // 전체 표시되는 데이터 포인트 수 (현재 시간 + 1시간)
  const totalDisplayPoints = chartDataPoints.length;
  
  // 현재 시간의 인덱스 (여유 공간 제외한 실제 데이터의 마지막)
  const currentTimeIndex = currentDataIndex - 1; // 0-based index
  
  // 데이터 포인트 간격 계산
  const dataPointSpacing = actualDataWidth / Math.max(1, totalDisplayPoints - 1);
  
  // 현재 시간 위치 계산 (전체 표시 영역 중에서)
  const currentTimePosition = CHART_PADDING_LEFT + (currentTimeIndex * dataPointSpacing);
  
  console.log('Final Position Debug:', {
    currentHour: currentHour.toFixed(2),
    totalDisplayPoints: totalDisplayPoints,
    currentTimeIndex: currentTimeIndex,
    actualDataWidth: actualDataWidth,
    dataPointSpacing: dataPointSpacing.toFixed(2),
    currentTimePosition: Math.round(currentTimePosition),
    expectedTime: `${Math.floor(currentHour)}:${Math.round((currentHour % 1) * 60).toString().padStart(2, '0')}`,
    positionPercent: ((currentTimePosition / chartWidth) * 100).toFixed(1) + '%'
  });

  // Auto scroll to current time on mount (only once)
  useEffect(() => {
    if (!hasAutoScrolled && chartScrollRef.current && eventScrollRef.current && !isNaN(currentTimePosition) && currentTimePosition > 0) {
      const scrollPosition = Math.max(0, currentTimePosition - screenWidth / 2);
      console.log('Auto scrolling to position:', scrollPosition);
      
      setTimeout(() => {
        chartScrollRef.current?.scrollTo({ x: scrollPosition, animated: true });
        eventScrollRef.current?.scrollTo({ x: scrollPosition, animated: true });
        setHasAutoScrolled(true);
      }, 1000);
    }
  }, [currentTimePosition, hasAutoScrolled]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartDataPoints,
        strokeWidth: 2,
      }
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(107, 142, 248, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(127, 140, 141, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '1',
      stroke: '#4A90E2',
      fill: '#4A90E2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#999999',
      strokeWidth: 0.5,
    },
    fillShadowGradientOpacity: 0,
    strokeWidth: 2,
    // 커스텀 getColor 함수로 미래 영역 투명 처리
    getStrokeColor: (dataPoint, index) => {
      return index >= currentDataIndex ? 'transparent' : '#6B8EF8';
    },
  };

  // Render event icon
  const renderEventIcon = (event: any) => {
    const eventConfig = eventTypes[event.type as keyof typeof eventTypes];
    const IconComponent = 
      eventConfig.library === 'MaterialIcons' ? MaterialIcons :
      eventConfig.library === 'FontAwesome5' ? FontAwesome5 : Ionicons;
    
    return (
      <IconComponent 
        name={eventConfig.icon as any}
        size={20} 
        color={eventConfig.color}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Glucose Chart Section */}
      <View style={styles.container}>
        <View style={styles.yAxisContainer}>
          <View style={styles.yAxisLabels}>
            <Text style={styles.yAxisLabel}>140</Text>
            <Text style={styles.yAxisLabel}>120</Text>
            <Text style={styles.yAxisLabel}>100</Text>
            <Text style={styles.yAxisLabel}>80</Text>
          </View>
          <Text style={styles.yAxisTitle}>mg/dL</Text>
        </View>
        <ScrollView 
          ref={chartScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
          onScroll={(event) => {
            // 무한 루프 방지
            if (isScrollingSyncRef.current) return;
            
            const scrollX = event.nativeEvent.contentOffset.x;
            if (eventScrollRef.current) {
              isScrollingSyncRef.current = true;
              eventScrollRef.current.scrollTo({ x: scrollX, animated: false });
              setTimeout(() => {
                isScrollingSyncRef.current = false;
              }, 50);
            }
          }}
          scrollEventThrottle={16}
        >
          <View>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLabels={false}
              segments={4}
              yAxisLabel=""
              yAxisSuffix=""
              formatYLabel={() => ""}
              withDots={false} // 모든 점 비활성화
              getDotColor={(dataPoint, dataPointIndex) => {
                // 현재 시간 이후의 점은 투명하게
                return dataPointIndex >= currentDataIndex ? 'transparent' : '#4A90E2';
              }}
            />
            
            {/* Current Time Indicator - SVG로 점선 구현 */}
            {!isNaN(currentTimePosition) && (
              <View
                style={[
                  styles.currentTimeIndicator,
                  { left: currentTimePosition }
                ]}
              >
                {/* 점선을 위한 여러 개의 짧은 선 */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dashSegment,
                      { top: i * 8 } // 8px 간격으로 배치
                    ]}
                  />
                ))}
                <View style={styles.timeTextContainer}>
                  <Text style={styles.currentTimeLabel}>
                    {`${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`}
                  </Text>
                  <Text style={styles.debugLabel}>
                    {currentHour.toFixed(1)}h | Pos: {Math.round(currentTimePosition)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      
      {/* Event Timeline Section */}
      <View style={styles.eventContainer}>
        <View style={styles.eventYAxisContainer}>
          <View style={styles.eventUserLabels}>
            <View style={styles.userLabelRow}>
              <Text style={styles.emoji}>👦</Text>
            </View>
            <View style={styles.userDivider} />
            <View style={styles.userLabelRow}>
              <Text style={styles.emoji}>👨</Text>
            </View>
          </View>
        </View>
        <ScrollView
          ref={eventScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.eventScrollContainer}
          onScroll={(event) => {
            // 무한 루프 방지
            if (isScrollingSyncRef.current) return;
            
            const scrollX = event.nativeEvent.contentOffset.x;
            if (chartScrollRef.current) {
              isScrollingSyncRef.current = true;
              chartScrollRef.current.scrollTo({ x: scrollX, animated: false });
              setTimeout(() => {
                isScrollingSyncRef.current = false;
              }, 50);
            }
          }}
          scrollEventThrottle={16}
        >
          <View style={[styles.eventTimeline, { width: chartWidth }]}>
            {/* Child Events Row */}
            <View style={styles.eventRow}>
              {sampleEvents.child.map((event, index) => {
                // 차트와 동일한 위치 계산 방식 사용
                const eventDataIndex = Math.floor(event.time * 6); // 시간 -> 데이터 인덱스
                const dataPointSpacing = actualDataWidth / Math.max(1, 144 - 1);
                const position = CHART_PADDING_LEFT + (eventDataIndex * dataPointSpacing);
                
                return (
                  <View
                    key={`child-${index}`}
                    style={[
                      styles.eventMarker,
                      { left: position - 14 } // 아이콘 중앙 정렬
                    ]}
                  >
                    <View style={styles.eventIcon}>
                      {renderEventIcon(event)}
                    </View>
                  </View>
                );
              })}
            </View>
            
            {/* Divider Line */}
            <View style={styles.rowDivider} />
            
            {/* Parent Events Row */}
            <View style={styles.eventRow}>
              {sampleEvents.parent.map((event, index) => {
                // 차트와 동일한 위치 계산 방식 사용
                const eventDataIndex = Math.floor(event.time * 6); // 시간 -> 데이터 인덱스
                const dataPointSpacing = actualDataWidth / Math.max(1, 144 - 1);
                const position = CHART_PADDING_LEFT + (eventDataIndex * dataPointSpacing);
                
                return (
                  <View
                    key={`parent-${index}`}
                    style={[
                      styles.eventMarker,
                      { left: position - 14 } // 아이콘 중앙 정렬
                    ]}
                  >
                    <View style={styles.eventIcon}>
                      {renderEventIcon(event)}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 10,
  },
  yAxisContainer: {
    width: 45,
    height: 180,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  yAxisTitle: {
    fontSize: 9,
    color: '#7F8C8D',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  yAxisLabels: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  yAxisLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  chart: {
    borderRadius: 0,
    marginLeft: -45, // Overlap with yAxis to align properly
  },
  eventContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 100,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  eventYAxisContainer: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  eventUserLabels: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLabelRow: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDivider: {
    height: 1,
    width: 30,
    backgroundColor: '#E0E0E0',
  },
  emoji: {
    fontSize: 16,
  },
  eventScrollContainer: {
    flex: 1,
  },
  eventTimeline: {
    height: 100,
    position: 'relative',
    marginLeft: -45, // Align with chart
  },
  eventRow: {
    height: 45,
    position: 'relative',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginVertical: 4,
  },
  eventMarker: {
    position: 'absolute',
    top: 7,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  currentTimeIndicator: {
    position: 'absolute',
    top: 15,  // 차트 데이터 영역 시작점
    height: 145,  // X축 라벨 훨씬 위까지만 (180 - 35)
    width: 1,
    alignItems: 'center',
  },
  dashSegment: {
    position: 'absolute',
    width: 1,
    height: 4,  // 짧은 선 세그먼트
    backgroundColor: '#999999',
    opacity: 0.5,
  },
  timeTextContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: -5,  // 선 위쪽에 위치
    position: 'absolute',
    top: -20,  // 차트 위에 표시
  },
  currentTimeLabel: {
    fontSize: 11,
    color: '#999999',  // 회색으로 변경
    fontWeight: '600',
  },
  debugLabel: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
  },
});