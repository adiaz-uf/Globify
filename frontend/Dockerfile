# ============================================
# Stage 1: Build TypeScript
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files if they exist
COPY package*.json ./

# Install TypeScript compiler
RUN npm install -g typescript

# Copy source files
COPY . .

# Compile TypeScript to JavaScript (if tsconfig exists)
RUN if [ -f "tsconfig.json" ]; then tsc; fi

# ============================================
# Stage 2: Serve with Nginx
# ============================================
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/*.html /usr/share/nginx/html/
COPY --from=builder /app/ts/styles /usr/share/nginx/html/styles/
COPY --from=builder /app/assets /usr/share/nginx/html/assets/

# Copy compiled JS if it exists, or create empty dir
RUN mkdir -p /usr/share/nginx/html/js
COPY --from=builder /app/js* /usr/share/nginx/html/js/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
