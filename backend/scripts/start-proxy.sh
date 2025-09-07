#!/bin/bash

# Cloud SQL Proxy 실행 스크립트
# .env 파일에서 설정 읽기

if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

if [ -z "$GCP_PROJECT_ID" ] || [ -z "$GCP_REGION" ] || [ -z "$GCP_SQL_INSTANCE" ]; then
    echo "❌ .env 파일에 GCP 설정이 없습니다."
    echo "GCP_PROJECT_ID, GCP_REGION, GCP_SQL_INSTANCE를 설정해주세요."
    exit 1
fi

INSTANCE_CONNECTION="${GCP_PROJECT_ID}:${GCP_REGION}:${GCP_SQL_INSTANCE}"

echo "🚀 Cloud SQL Proxy 시작..."
echo "Instance: $INSTANCE_CONNECTION"
echo "Local Port: 5432"
echo ""

cloud-sql-proxy --port 5432 $INSTANCE_CONNECTION