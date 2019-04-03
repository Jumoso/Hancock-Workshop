FROM node:8.9.3

# Move to build dir
WORKDIR /usr/src/app

# Install app dependencies
ADD package*.json ./
RUN yarn cache clean --force
RUN yarn install

ENV NODE_ENV production

# Build the app
COPY . .

ENTRYPOINT ["npm", "run", "sign"]
CMD ["--sk=", "--data="]
