# Google Cloud 배포 가이드

## 개발 환경 (Local + Cloud SQL)

### 1. Cloud SQL Proxy로 로컬 개발
```bash
# 터미널 1: Proxy 실행
./scripts/start-proxy.sh

# 터미널 2: 개발 서버
npm run dev
```

## 프로덕션 배포 (App Engine)

### 1. 초기 설정
```bash
# gcloud 초기화
gcloud init
gcloud auth application-default login

# App Engine 활성화
gcloud app create --region=us-east1
```

### 2. 환경 변수 설정
```bash
# app.yaml 수정
# PROJECT_ID, REGION, INSTANCE_NAME 입력

# .env.production 수정
# 실제 값으로 업데이트
```

### 3. 빌드 및 배포
```bash
# TypeScript 빌드
npm run build

# 데이터베이스 마이그레이션 (최초 1회)
npm run prisma:migrate:prod

# App Engine 배포
gcloud app deploy

# 로그 확인
gcloud app logs tail -s default
```

### 4. Cloud SQL 접속 권한 설정
```bash
# App Engine 기본 서비스 계정에 Cloud SQL 클라이언트 역할 부여
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:PROJECT_ID@appspot.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

## 유용한 명령어

```bash
# 배포된 앱 열기
gcloud app browse

# 로그 보기
gcloud app logs tail

# Cloud SQL 인스턴스 정보
gcloud sql instances describe diabetes-care-db

# 직접 SQL 접속
gcloud sql connect diabetes-care-db --user=postgres
```

## 비용 관리 팁

1. **개발 환경**: Cloud SQL Proxy 사용 시에만 비용 발생
2. **자동 중지**: 개발 완료 후 인스턴스 중지
   ```bash
   gcloud sql instances patch diabetes-care-db --activation-policy=NEVER
   ```
3. **재시작**:
   ```bash
   gcloud sql instances patch diabetes-care-db --activation-policy=ALWAYS
   ```

## 예상 비용 (미국 동부 기준)
- Cloud SQL (db-f1-micro): ~$7/월
- App Engine (F1 instance): 무료 할당량 내 운영 가능
- 네트워크: 최소 비용

총 예상: 월 $10 이하