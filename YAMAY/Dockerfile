FROM node:16 
#install node

WORKDIR /use/src/app
#set the working directory inside the docker container

COPY package*.json ./
#exporting all packages from the local folder to ./ (/use/src/app)

RUN npm install
#installing all dependencies needed 

COPY . .
#copy every thing to the container

EXPOSE 3000
#expose the internal port of the container to the rest of the local machine 

CMD ["npm", "start"]