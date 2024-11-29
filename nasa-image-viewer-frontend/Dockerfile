FROM node:18

WORKDIR /nasa-image-viewer-frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
