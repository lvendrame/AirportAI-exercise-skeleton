FROM node:20.9.0

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize Docker cache
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
