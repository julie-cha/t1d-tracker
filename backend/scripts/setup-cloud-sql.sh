#!/bin/bash

# Google Cloud SQL Setup Script

echo "Google Cloud SQL 설정 스크립트"
echo "================================"

# 1. gcloud CLI 설치 확인
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI가 설치되어 있지 않습니다."
    echo "👉 https://cloud.google.com/sdk/docs/install 에서 설치해주세요."
    exit 1
fi

# 2. 프로젝트 설정
echo "1. Google Cloud 프로젝트 설정"
gcloud auth login
gcloud config set project $GCP_PROJECT_ID

# 3. Cloud SQL Admin API 활성화
echo "2. Cloud SQL Admin API 활성화"
gcloud services enable sqladmin.googleapis.com

# 4. Cloud SQL 인스턴스 생성 (이미 있으면 스킵)
echo "3. Cloud SQL PostgreSQL 인스턴스 생성"
echo "   (이미 있으면 Enter를 누르세요)"
read -p "새 인스턴스를 생성하시겠습니까? (y/n): " CREATE_INSTANCE

if [ "$CREATE_INSTANCE" = "y" ]; then
    gcloud sql instances create diabetes-care-db \
        --database-version=POSTGRES_15 \
        --tier=db-f1-micro \
        --region=us-east1 \
        --root-password=your-strong-password \
        --database-flags=max_connections=100
fi

# 5. 데이터베이스 생성
echo "4. 데이터베이스 생성"
gcloud sql databases create diabetes_care_db \
    --instance=diabetes-care-db

# 6. Cloud SQL Proxy 설치
echo "5. Cloud SQL Proxy 설치"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.darwin.amd64
    chmod +x cloud-sql-proxy
    sudo mv cloud-sql-proxy /usr/local/bin/
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    wget https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.linux.amd64 -O cloud-sql-proxy
    chmod +x cloud-sql-proxy
    sudo mv cloud-sql-proxy /usr/local/bin/
fi

echo "✅ 설정 완료!"
echo ""
echo "다음 명령어로 Cloud SQL Proxy를 실행하세요:"
echo "cloud-sql-proxy --port 5432 PROJECT_ID:REGION:INSTANCE_NAME"