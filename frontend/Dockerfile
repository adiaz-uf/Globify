# ============================================
# Stage 1: Build TypeScript
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including TypeScript)
RUN npm install

# Copy source files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# ============================================
# Stage 2: Serve with Nginx
# ============================================
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/*.html /usr/share/nginx/html/
COPY --from=builder /app/css /usr/share/nginx/html/css/
COPY --from=builder /app/assets /usr/share/nginx/html/assets/

# Copy compiled JS directory
COPY --from=builder /app/js /usr/share/nginx/html/js/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
