FROM node:24-alpine

WORKDIR /app 

COPY package.json .

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \ 
        then npm install; \
        else npm install --omit=dev; \
        fi
COPY . .

EXPOSE 3000
