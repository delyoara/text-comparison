
FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm cache clean --force && rm -rf /root/.npm
EXPOSE 3000
CMD ["npm", "run", "dev"]
