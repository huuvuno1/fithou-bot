FROM node:16-alpine

EXPOSE 8080

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -f

COPY . .

CMD ["npm", "run", "start"]
