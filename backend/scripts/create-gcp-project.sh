#!/bin/bash

# Google Cloud 프로젝트 생성 스크립트
# 미국 동부 (us-east1) 리전 사용

echo "========================================"
echo "Google Cloud 프로젝트 생성 가이드"
echo "Region: US East (us-east1)"
echo "========================================"
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. gcloud CLI 확인
echo -e "${YELLOW}Step 1: gcloud CLI 확인${NC}"
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI가 설치되어 있지 않습니다.${NC}"
    echo "👉 https://cloud.google.com/sdk/docs/install 에서 설치해주세요."
    exit 1
fi
echo -e "${GREEN}✅ gcloud CLI 설치 확인${NC}"
echo ""

# 2. 로그인
echo -e "${YELLOW}Step 2: Google Cloud 로그인${NC}"
echo "브라우저가 열리면 Google 계정으로 로그인하세요."
read -p "계속하려면 Enter를 누르세요..."
gcloud auth login
echo ""

# 3. 프로젝트 ID 입력
echo -e "${YELLOW}Step 3: 프로젝트 정보 입력${NC}"
read -p "프로젝트 ID (예: diabetes-care-app-12345): " PROJECT_ID
read -p "프로젝트 이름 (예: Diabetes Care App): " PROJECT_NAME

# 4. 프로젝트 생성
echo -e "${YELLOW}Step 4: 프로젝트 생성${NC}"
gcloud projects create $PROJECT_ID --name="$PROJECT_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 프로젝트 생성 완료${NC}"
else
    echo -e "${RED}❌ 프로젝트 생성 실패 (이미 존재하거나 ID가 사용중일 수 있습니다)${NC}"
    read -p "기존 프로젝트를 사용하시겠습니까? (y/n): " USE_EXISTING
    if [ "$USE_EXISTING" != "y" ]; then
        exit 1
    fi
fi

# 5. 프로젝트 설정
echo -e "${YELLOW}Step 5: 프로젝트 설정${NC}"
gcloud config set project $PROJECT_ID
echo -e "${GREEN}✅ 프로젝트 설정 완료${NC}"
echo ""

# 6. 결제 계정 연결 안내
echo -e "${YELLOW}Step 6: 결제 계정 연결${NC}"
echo -e "${RED}⚠️  중요: 결제 계정을 연결해야 Cloud SQL을 사용할 수 있습니다.${NC}"
echo "1. https://console.cloud.google.com/billing 접속"
echo "2. 프로젝트에 결제 계정 연결"
echo "3. 신규 가입시 $300 무료 크레딧 제공"
read -p "결제 계정을 연결했으면 Enter를 누르세요..."
echo ""

# 7. 필요한 API 활성화
echo -e "${YELLOW}Step 7: 필요한 API 활성화${NC}"
echo "Cloud SQL Admin API 활성화 중..."
gcloud services enable sqladmin.googleapis.com
echo "Compute Engine API 활성화 중..."
gcloud services enable compute.googleapis.com
echo "App Engine Admin API 활성화 중..."
gcloud services enable appengine.googleapis.com
echo -e "${GREEN}✅ API 활성화 완료${NC}"
echo ""

# 8. Cloud SQL 인스턴스 생성
echo -e "${YELLOW}Step 8: Cloud SQL 인스턴스 생성${NC}"
read -p "Cloud SQL 인스턴스를 생성하시겠습니까? (y/n): " CREATE_SQL

if [ "$CREATE_SQL" = "y" ]; then
    read -s -p "PostgreSQL root 비밀번호 입력: " DB_PASSWORD
    echo ""
    
    echo "Cloud SQL 인스턴스 생성 중... (약 5분 소요)"
    gcloud sql instances create diabetes-care-db \
        --database-version=POSTGRES_15 \
        --tier=db-f1-micro \
        --region=us-east1 \
        --root-password=$DB_PASSWORD \
        --database-flags=max_connections=100
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Cloud SQL 인스턴스 생성 완료${NC}"
        
        # 데이터베이스 생성
        echo "데이터베이스 생성 중..."
        gcloud sql databases create diabetes_care_db \
            --instance=diabetes-care-db
        echo -e "${GREEN}✅ 데이터베이스 생성 완료${NC}"
    else
        echo -e "${RED}❌ Cloud SQL 인스턴스 생성 실패${NC}"
    fi
fi
echo ""

# 9. 환경 변수 파일 업데이트
echo -e "${YELLOW}Step 9: 환경 변수 설정${NC}"
if [ -f "../.env" ]; then
    sed -i.bak "s/GCP_PROJECT_ID=.*/GCP_PROJECT_ID=$PROJECT_ID/" ../.env
    sed -i.bak "s/GCP_SQL_INSTANCE=.*/GCP_SQL_INSTANCE=diabetes-care-db/" ../.env
    echo -e "${GREEN}✅ .env 파일 업데이트 완료${NC}"
else
    echo -e "${YELLOW}⚠️  .env 파일을 수동으로 업데이트하세요:${NC}"
    echo "   GCP_PROJECT_ID=$PROJECT_ID"
    echo "   GCP_SQL_INSTANCE=diabetes-care-db"
    echo "   GCP_REGION=us-east1"
fi
echo ""

# 10. Cloud SQL Proxy 설치
echo -e "${YELLOW}Step 10: Cloud SQL Proxy 설치${NC}"
if ! command -v cloud-sql-proxy &> /dev/null; then
    echo "Cloud SQL Proxy 설치 중..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.darwin.amd64
        chmod +x cloud-sql-proxy
        sudo mv cloud-sql-proxy /usr/local/bin/
    else
        wget https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.linux.amd64 -O cloud-sql-proxy
        chmod +x cloud-sql-proxy
        sudo mv cloud-sql-proxy /usr/local/bin/
    fi
    echo -e "${GREEN}✅ Cloud SQL Proxy 설치 완료${NC}"
else
    echo -e "${GREEN}✅ Cloud SQL Proxy 이미 설치됨${NC}"
fi
echo ""

# 완료 메시지
echo "========================================"
echo -e "${GREEN}🎉 Google Cloud 프로젝트 설정 완료!${NC}"
echo "========================================"
echo ""
echo "프로젝트 정보:"
echo "  Project ID: $PROJECT_ID"
echo "  Region: us-east1"
echo "  Instance: diabetes-care-db"
echo ""
echo "다음 단계:"
echo "1. 터미널 1에서 Cloud SQL Proxy 실행:"
echo "   ./start-proxy.sh"
echo ""
echo "2. 터미널 2에서 개발 서버 실행:"
echo "   cd .."
echo "   npm run dev"
echo ""
echo "Google Cloud Console:"
echo "https://console.cloud.google.com/sql/instances?project=$PROJECT_ID"