FROM node:24

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml ./
RUN npm ci && npm install -g pnpm && pnpm install

COPY .. .

RUN npx prisma generate

RUN chmod +x *.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
