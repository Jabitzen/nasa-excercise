FROM node:18

WORKDIR /nasa-image-viewer-server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
