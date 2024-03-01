FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm ci --ignore-scripts

# Build site
COPY . /app
ENV NODE_OPTIONS --max_old_space_size==3072
RUN npm run build

# ==== Final image ====
FROM nginx
COPY provisioning/nginx/nginx.conf /etc/nginx/nginx.conf
COPY provisioning/nginx/redirects.map /etc/nginx/redirects.map
COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 80