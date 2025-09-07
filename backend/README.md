# Diabetes Care App Backend

## 기술 스택
- Node.js + Express
- TypeScript
- Google Cloud SQL (PostgreSQL)
- Prisma ORM
- JWT 인증

## Google Cloud SQL 설정

### 1. 사전 준비
- Google Cloud 계정 및 프로젝트 생성
- gcloud CLI 설치: https://cloud.google.com/sdk/docs/install
- 결제 계정 연결 (무료 크레딧 $300 제공)

### 2. Cloud SQL 인스턴스 생성
```bash
# 자동 설정 스크립트 실행
./scripts/setup-cloud-sql.sh

# 또는 수동으로 설정
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Cloud SQL 인스턴스 생성
gcloud sql instances create diabetes-care-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-east1 \
  --root-password=YOUR_PASSWORD

# 데이터베이스 생성
gcloud sql databases create diabetes_care_db \
  --instance=diabetes-care-db
```

### 3. Cloud SQL Proxy 설치
```bash
# macOS
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.darwin.amd64
chmod +x cloud-sql-proxy
sudo mv cloud-sql-proxy /usr/local/bin/

# Linux
wget https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.linux.amd64 -O cloud-sql-proxy
chmod +x cloud-sql-proxy
sudo mv cloud-sql-proxy /usr/local/bin/
```

### 4. 환경 변수 설정
```bash
cp .env.example .env

# .env 파일 수정:
# GCP_PROJECT_ID=your-project-id
# GCP_SQL_INSTANCE=diabetes-care-db
# GCP_REGION=us-east1
# DATABASE_URL의 password 수정
```

### 5. 개발 환경 실행

**터미널 1 - Cloud SQL Proxy 실행:**
```bash
./scripts/start-proxy.sh
# 또는
cloud-sql-proxy --port 5432 PROJECT_ID:REGION:INSTANCE_NAME
```

**터미널 2 - 애플리케이션 실행:**
```bash
# 의존성 설치
npm install

# Prisma 설정
npx prisma generate
npx prisma migrate dev --name init

# 서버 실행
npm run dev
```

## API 엔드포인트

### 인증
- POST `/api/auth/register` - 회원가입
- POST `/api/auth/login` - 로그인
- GET `/api/auth/me` - 현재 사용자 정보

### 혈당 기록
- POST `/api/glucose` - 혈당 기록 추가
- GET `/api/glucose` - 혈당 기록 조회
- GET `/api/glucose/statistics` - 혈당 통계
- GET `/api/glucose/:id` - 특정 기록 조회
- PUT `/api/glucose/:id` - 기록 수정
- DELETE `/api/glucose/:id` - 기록 삭제

### 식사 기록
- POST `/api/meals` - 식사 기록 추가
- GET `/api/meals` - 식사 기록 조회
- GET `/api/meals/:id` - 특정 기록 조회
- PUT `/api/meals/:id` - 기록 수정
- DELETE `/api/meals/:id` - 기록 삭제

### 활동 기록
- POST `/api/activities` - 활동 기록 추가
- GET `/api/activities` - 활동 기록 조회
- GET `/api/activities/:id` - 특정 기록 조회
- PUT `/api/activities/:id` - 기록 수정
- DELETE `/api/activities/:id` - 기록 삭제

## Prisma Studio (DB 관리 GUI)
```bash
npm run prisma:studio
```