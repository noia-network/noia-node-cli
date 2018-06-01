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

# Configuration

For configuration guidelines please refer to [noia-node][noia-node].

[noia-node]: https://github.com/noia-network/noia-node
