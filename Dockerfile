FROM node:20
WORKDIR /usr/share/app
COPY ./enter-data /usr/share/app/enter-data 
RUN npm --prefix /usr/share/app/enter-data/backend install
RUN npm --prefix /usr/share/app/enter-data/frontend install