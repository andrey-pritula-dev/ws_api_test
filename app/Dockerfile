FROM node:14 as base

WORKDIR /app
COPY . .
RUN npm install -g nodemon
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm install
CMD ["nodemon", "app.js"]
