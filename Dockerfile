FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS="./firebase.json"
CMD ["node", "index.js"]
