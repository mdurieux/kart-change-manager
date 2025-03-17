FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5059

ENV DEBUG="socket.io:*"

CMD ["npm", "start"]