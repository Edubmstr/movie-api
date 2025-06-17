# Schritt 1: Basis-Image mit Node.js
FROM node:22-alpine AS builder

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Nur package.json und tsconfig.json kopieren für schnellen Layer-Cache
COPY package.json tsconfig.json ./

# Dependencies installieren
RUN npm install

# Quellcode kopieren
COPY src ./src

# TypeScript kompilieren
RUN npm run build

# Schritt 2: Production-Image (klein & sicher)
FROM node:22-alpine

WORKDIR /app

# Nur benötigte Dateien aus dem Builder übernehmen
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Nur Runtime-Dependencies installieren
RUN npm install --omit=dev

# App starten
CMD ["node", "dist/index.js"]

