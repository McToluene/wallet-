FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
CMD ["yarn", "start"]