FROM node:18 AS build

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
