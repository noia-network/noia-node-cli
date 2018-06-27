FROM alpine:latest

EXPOSE 7676

COPY * /home/node/
WORKDIR /home/node
ENV NODE_ENV production

# the following is needed to keep the layer small
RUN apk update \ 
    && apk add --no-cache git python bash alpine-sdk pwgen nodejs \
    && adduser -D node && chown -R node:node /home/node \
    && su - node -c "npm install" \
    && apk del git bash python alpine-sdk

USER node

RUN  printf '#!/bin/sh\n\
if [ ! -f settings.json ]; then\n\
[ -z $WALLET_ADDRESS ] && WALLET_ADDRESS=0x4adc7773bceedf7b4c687f9bfdd1598378b7d5e1;\n\
[ -z $MASTER_ADDRESS ] && MASTER_ADDRESS=ws://csl-masters.noia.network:5565;\n\
printf \x27{\n\
  "isHeadless": false,\n\
  "skipBlockchain": true,\n\
  "storage.dir": "/app/noia-node-terminal/storage",\n\
  "storage.size": "104857600",\n\
  "domain": "",\n\
  "ssl": false,\n\
  "ssl.privateKeyPath": "",\n\
  "ssl.crtPath": "",\n\
  "ssl.crtBundlePath": "",\n\
  "publicIp": "",\n\
  "sockets.http": false,\n\
  "sockets.http.ip": "0.0.0.0",\n\
  "sockets.http.port": "6767",\n\
  "sockets.ws": true,\n\
  "sockets.ws.ip": "0.0.0.0",\n\
  "sockets.ws.port": "7676",\n\
  "wallet.address": "\x27$WALLET_ADDRESS\x27",\n\
  "wallet.mnemonic": "\x27`pwgen 20`\x27",\n\
  "masterAddress": "\x27$MASTER_ADDRESS\x27",\n\
  "whitelist.masters": [],\n\
  "controller": false,\n\
  "controller.ip": "127.0.0.1",\n\
  "controller.port": "9000",\n\
  "nodeId": "\x27`pwgen 40`\x27"\n\
}\x27 >> settings.json;\n\
fi;\n\
node index.js\n' >> run.sh && chmod +x run.sh && cat run.sh

CMD ["./run.sh"]
