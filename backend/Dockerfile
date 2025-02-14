FROM node:18

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
