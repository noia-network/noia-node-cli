# NOIA Node CLI

This is noia-node headless command line for [noia-node][noia-node].

## Get started

### NPM

If you want to use globally.

**NOTICE**: You need administrator rights to install globally.

```sh
$ npm install @noia-network/node-cli -g
```

For the FIRST TIME, you need to define master address. It will generate `node.settings` with defined master address.

```sh
$ noia-node-cli --masterAddress wss://csl-masters.noia.network:5565
```

or environment variable

```sh
NOIA_NODE_MASTERS_ADDRESS=wss://csl-masters.noia.network:5565 noia-node-cli
```

### Docker

NOIA Node can be run in Docker. [Docker Guide](https://github.com/noia-network/node-docker).

## (Linux) Register as a SystemD service

To register node as a service, place `noia-node.service` (remember to modify paths to script) to `/etc/systemd/system/` and run using `systemctl start noia-node` command.

# Airdrop

To receive airdrop reward, make sure to enter `airdropAddress` in `node.settings` file or set it via `NOIA_NODE_BLOCKCHAIN_AIRDROP_ADDRESS` environment variable.

# Configuration

For configuration guidelines please refer to [noia-node](https://github.com/noia-network/noia-node#configuration).

| CLI Flag       | Environment variables                |
| -------------- | ------------------------------------ |
| --userDataPath | NOIA_NODE_USER_DATA_PATH             |
| --settingsPath | NOIA_NODE_SETTINGS_PATH              |
| --storageDir   | NOIA_NODE_STORAGE_DIR                |
| --storageSize  | NOIA_NODE_STORAGE_SIZE               |
|                | NOIA_NODE_DOMAIN                     |
|                | NOIA_NODE_SSL                        |
|                | NOIA_NODE_SSL_PRIVATE_KEY_PATH       |
|                | NOIA_NODE_SSL_CRT_PATH               |
|                | NOIA_NODE_SSL_CRT_BUNDLE_PATH        |
|                | NOIA_NODE_PUBLIC_IP                  |
|                | NOIA_NODE_HTTP                       |
|                | NOIA_NODE_HTTP_IP                    |
|                | NOIA_NODE_HTTP_PORT                  |
|                | NOIA_NODE_WS                         |
|                | NOIA_NODE_WS_IP                      |
|                | NOIA_NODE_WS_PORT                    |
|                | NOIA_NODE_WRTC                       |
|                | NOIA_NODE_WRTC_CONTROL_PORT          |
|                | NOIA_NODE_WRTC_CONTROL_IP            |
|                | NOIA_NODE_WRTC_DATA_PORT             |
|                | NOIA_NODE_WRTC_DATA_IP               |
|                | NOIA_NODE_BLOCKCHAIN_AIRDROP_ADDRESS |
|                | NOIA_NODE_WALLET_MNEMONIC            |
|                | NOIA_NODE_WALLET_PROVIDER_URL        |
|                | NOIA_NODE_CLIENT                     |
|                | NOIA_NODE_MASTER_ADDRESS             |
|                | NOIA_NODE_WHITELIST_MASTERS          |
|                | NOIA_NODE_CONTROLLER                 |
|                | NOIA_NODE_CONTROLLER_IP              |
|                | NOIA_NODE_CONTROLLER_PORT            |
|                | NOIA_NODE_SKIP_BLOCKCHAIN            |

## Contributing

Read contribution [guidelines here](CONTRIBUTING.md).

## License

Released under the [LGPL-2.1](LICENSE).

[noia-node]: https://github.com/noia-network/noia-node
