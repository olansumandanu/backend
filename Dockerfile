# Base image
FROM node:18

# Create app directory
WORKDIR /usr/app

# A wildcard is used to ensure both package.json
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source 
COPY . .

# Create a "dist"
# RUN npm run build

EXPOSE 3000

# Start the server 
CMD ["npm","run","start"]