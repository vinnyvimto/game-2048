FROM node:11.13-alpine AS build

LABEL maintainer="Luke Vincent <luke.k.vincent@gmail.com>"

WORKDIR /opt/game-2048

RUN apk add --no-cache git

COPY package*.json /opt/game-2048/

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.14-alpine

# Copy the built bundle from previous layer
COPY --from=build /opt/game-2048/dist /var/www/html/

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# run nginx as default command
CMD nginx -g 'daemon off;'
