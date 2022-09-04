FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
ENV NODE_PATH=/app/node_modules
RUN yarn 
CMD ["yarn", "start"]