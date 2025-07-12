#!/bin/sh
set -e

echo "Applying migrations..."
npx prisma migrate deploy

echo "Running seeds..."
npx prisma db seed

echo "Starting Next.js..."
npm start
