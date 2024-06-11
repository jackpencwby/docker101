FROM alpine:3.14 
RUN apk update && apk add nodejs npm
WORKDIR /root
COPY package.json package-lock.json ./
RUN npm install
COPY ./app.js .
EXPOSE 8000
CMD ["npm", "start"]