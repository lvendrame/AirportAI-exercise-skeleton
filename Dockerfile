FROM node:20.9.0

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize Docker cache
COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=mongodb://127.0.0.1:27017/AirportAI
ENV AUTH_SECRET_KEY=A1B2C3D4E5F6G7H8I9J0K

EXPOSE 3000

CMD npm run seed; npm start
