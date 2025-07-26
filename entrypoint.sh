#!/bin/sh
set -e

echo "Applying migrations..."
npx prisma migrate deploy

echo "Running seeds..."
npx prisma db seed

if [ "$NODE_ENV" = "development" ]; then
  echo "Starting Next.js in development mode..."
  npm run dev
else
  echo "Starting Next.js in production mode..."
  npm start
fi