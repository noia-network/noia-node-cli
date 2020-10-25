FROM node:8.15.1-alpine as builder

RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        git \
    && apk add \
        bash

RUN npm install npm@6.0 -g

# Install python for native dependencies
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g

WORKDIR /usr/noia-node

# Copy only package.json to skip image rebuilding, when a list of dependencies has not changed since last time
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

# Copy the rest of the sources for building
COPY ./src ./src
COPY ./tsconfig.json .

# Build from sources
RUN npm run build



# Separate runtime from builder
FROM node:8.11.4-alpine

# Add libc6-compat
# https://github.com/grpc/grpc/issues/6126
RUN apk --no-cache add libc6-compat

WORKDIR /usr/noia-node
COPY --from=builder /usr/noia-node .

# Required ports
EXPOSE 8048/tcp 8058/udp

ENV NOIA_NODE_MASTER_ADDRESS wss://csl-masters.noia.network:5565

# Run application
ENTRYPOINT [ "node", "./dist/index.js"]
