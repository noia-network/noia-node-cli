# README #

This is noia-node headless (terminal) sample for [noia-node][noia-node].

## Run

To run Node terminal sample, simply install dependencies

```bash
npm install
```

Check repository issues for build related issues people faced in their systems.


Upon successful npm install execute

```bash
npm start
```

First time it WILL FAIL but generate settings.json file

In newly generated settings.json file change line:


```bash
"masterAddress": "ws://csl-masters.noia.network:5565"
```


### Register as a service (linux)

To register node as a service, place `noia-node.service` (don't forget to modify paths to script) to `/etc/systemd/system/` and run using `systemctl start noia-node` command. 

## Run in docker

The Dockerfile builds an image that is around 220MB in size. To build

```bash
docker build . --tag noia/alpine
```

To launch an instance:
```bash
docker run --rm -p :6767:6767 -e WALLET_ADDRESS=0x4adc7773bceedf7b4c687f9bfdd1598378b7d5e1 noia/alpine
```

# Configuration

For configuration guidelines please refer to [noia-node][noia-node].

[noia-node]: https://github.com/noia-network/noia-node

