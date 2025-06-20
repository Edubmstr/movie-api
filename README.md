# 🎬 hono-movie-api – Dockerized TypeScript App

Beispielsprojekt für eine containerized Applikation mit Hilfe von Docker.

---

## 🐳 Dockerfile

```Dockerfile
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
```

### 🔍 Erklärung

- **Mehrstufiger Build**: Erst Build mit TypeScript, dann sauberes Runtime-Image.
- **`--omit=dev`**: Installiert nur Runtime-Dependencies.
- **Klein & sicher**: Keine Dev-Tools, kein TypeScript, nur kompiliertes JavaScript.

---

## 🧰 Grundlegende Docker-Befehle

| Befehl                                 | Beschreibung                                                  |
|----------------------------------------|---------------------------------------------------------------|
| `docker ps`                            | Zeigt aktuell laufende Container                              |
| `docker ps -a`                         | Zeigt **alle** Container (inkl. beendete)                     |
| `docker images`                        | Listet alle Images im lokalen Docker-Cache                    |
| `docker stats`                         | Live-Statistiken (CPU, RAM etc.) zu laufenden Containern      |
| `docker logs <container-id>`          | Zeigt Logs eines bestimmten Containers                        |
| `docker rm <container-id>`            | Löscht einen Container                                        |
| `docker rmi <image-id>`               | Entfernt ein Docker-Image                                     |
| `docker stop <container-id>`          | Stoppt einen laufenden Container                              |
| `docker exec -it <container-id> sh`   | Öffnet eine Shell im Container (interaktiv)                   |

---

## 🏗️ Docker Image bauen

### ✅ BuildKit (empfohlen)

```bash
docker buildx build --load -t hono-movie-api:latest .
```

- Nutzt die moderne BuildKit-Engine
- `--load`: Macht das Image nach dem Build lokal verfügbar
- Ideal für Multi-Arch und CI/CD

### 🧱 Klassischer Build

```bash
docker build -t hono-movie-api:latest .
```

- Klassische Methode
- Baut nur für die aktuelle Plattform

---

## 🚀 Container starten

### 1. **Im Vordergrund starten**

```bash
docker run -p 3000:3000 hono-movie-api
```

- Bindet Port 3000 des Hosts an den Container
- Zeigt Logs direkt im Terminal

---

### 2. **Im Hintergrund starten (detached)**

```bash
docker run -d -p 3000:3000 hono-movie-api
```

- Läuft im Hintergrund (detached mode)
- Logs abrufbar mit: `docker logs <container-id>`

---

### 3. **Mit Restart Policy**

```bash
docker run -d --restart unless-stopped -p 3000:3000 hono-movie-api
```

- Container startet automatisch neu, wenn:
  - er abstürzt
  - Docker neu startet
  - Host neu gestartet wird

### 4. Mit Docker Compose

Im Ordner, in dem das docker-compose.yaml liegt zum starten ersten Befehl, zum stoppen den zweiten Befehl ausführen:

```bash
docker compose up -d
docker compose down
```
