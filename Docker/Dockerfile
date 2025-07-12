FROM node:24

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
RUN npm install -g pnpm
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN npx prisma generate
RUN npm run build

RUN chmod +x *.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
