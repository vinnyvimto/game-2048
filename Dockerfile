FROM node:11.13-alpine AS build

LABEL maintainer="Luke Vincent <luke.k.vincent@gmail.com>"

WORKDIR /var/www/html

RUN apk add --no-cache git

COPY package*.json /var/www/html/

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.14-alpine

# Copy the built bundle from previous layer
COPY --from=build /var/www/html/build /var/www/html/build/

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# run nginx as default command
CMD nginx -g 'daemon off;'
