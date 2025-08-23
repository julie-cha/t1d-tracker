# 당뇨 관리 앱 (Diabetes Care App)

## 프로젝트 개요
이 앱은 당뇨병 환자들이 혈당, 식사, 운동, 약물 복용을 체계적으로 관리할 수 있도록 도와주는 모바일 애플리케이션입니다.

## 주요 기능
- 📊 **혈당 기록**: 혈당 수치를 시간대별로 기록하고 추적
- 🍽️ **식사 기록**: 섭취한 음식과 영양소 정보 기록
- 🏃‍♂️ **운동 기록**: 운동 종류, 시간, 강도 기록
- 💊 **약물 관리**: 복용해야 할 약물과 복용 시간 알림
- 📈 **데이터 분석**: 혈당 추이와 건강 지표 분석
- 🎯 **목표 설정**: 개인 건강 목표 설정 및 달성도 추적

## 기술 스택
- React Native (Expo)
- TypeScript
- React Navigation
- AsyncStorage
- React Native Chart Kit

## 설치 및 실행

### 필수 요구사항
- Node.js (v16 이상)
- npm 또는 yarn
- Expo CLI

### 설치 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹에서 실행
npm run web
```

## 프로젝트 구조
```
src/
├── components/     # 재사용 가능한 컴포넌트
├── screens/        # 화면 컴포넌트
├── navigation/     # 네비게이션 설정
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```

## 개발 계획
- [ ] 혈당 입력 및 기록 기능
- [ ] 식사 정보 입력 폼
- [ ] 운동 기록 기능
- [ ] 약물 알림 시스템
- [ ] 데이터 시각화 (차트)
- [ ] 사용자 프로필 관리
- [ ] 데이터 백업 및 동기화

## 라이선스
MIT License
