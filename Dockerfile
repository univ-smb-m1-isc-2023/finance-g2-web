# build environment
FROM node:19.5.0-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm install react-scripts@latest -g --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
