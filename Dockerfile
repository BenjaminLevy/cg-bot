FROM node:12-alpine3.14
WORKDIR /app
COPY package*.json /app/
COPY . /app
RUN npm ci --only=production && npm cache clean --force
CMD node index.js
EXPOSE 8081

