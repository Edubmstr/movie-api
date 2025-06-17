# First Step: Builder image
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

# Step 2: Production Image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev

CMD ["node", "dist/index.js"]

