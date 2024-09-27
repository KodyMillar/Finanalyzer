FROM ubuntu
WORKDIR /EnterData
COPY . .
RUN <<EOF
apt-get update
apt-get upgrade -y
EOF
CMD ["node", "src/server.js"]