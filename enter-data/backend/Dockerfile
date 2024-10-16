FROM node:20
WORKDIR /usr/share/app
COPY . .
RUN npm install
RUN ls /usr/share/app/
RUN npm --prefix /usr/share/app install
CMD ["npm", "start"]