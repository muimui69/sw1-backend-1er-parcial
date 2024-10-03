# Etapa de construcción
FROM node:18-alpine AS builder

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar todas las dependencias, incluidas las de desarrollo (como @nestjs/cli)
RUN pnpm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa de producción
FROM node:18-alpine AS production

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar las dependencias de producción y el build desde la etapa anterior
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar la aplicación en producción
CMD ["node", "dist/main"]
