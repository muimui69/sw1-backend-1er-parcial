# Fase de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del proyecto
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias (incluye las de desarrollo)
RUN pnpm install --frozen-lockfile

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto
RUN pnpm run build

# Fase final: producción
FROM node:18-alpine AS production

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo lo necesario desde la fase de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto
EXPOSE 4000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "dist/main"]
