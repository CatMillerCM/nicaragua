FROM node:18 AS builder

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
