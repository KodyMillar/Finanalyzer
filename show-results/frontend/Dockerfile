FROM node:20
WORKDIR /usr/share/app
COPY . .
RUN npm --prefix /usr/share/app/ install
CMD ["npm", "start"]