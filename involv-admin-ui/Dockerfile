FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json",".babelrc","tailwind.config.js","webpack.config.js","postcss.config.js" ,"/app/"]
# COPY package-lock.json /app
COPY src /app/src
COPY .env.production /app
COPY .env.development /app
RUN npm install
RUN npm run build:dev
COPY public /app/dist

FROM nginx:1.20-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]