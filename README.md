# NOIA Node CLI

This is noia-node headless command line for [noia-node][noia-node].

## Get started

If you want to use globally

```sh
$ npm install @noia-network/node-cli -g
```

For the FIRST TIME, you need to define master address. It will generate `settings.json` with defined master address.

```sh
$ noia-node-cli --masterAddress ws://csl-masters.noia.network:5565
```

or environment variable

```sh
NOIA_NODE_MASTERS_ADDRESS=ws://csl-masters.noia.network:5565 noia-node-cli
```

## (Linux) Register as a SystemD service

To register node as a service, place `noia-node.service` (remember to modify paths to script) to `/etc/systemd/system/` and run using `systemctl start noia-node` command.

# Configuration

For configuration guidelines please refer to [noia-node](https://github.com/noia-network/noia-node#configuration).

| CLI Flag            | Environment variables          |
| ------------------- | ------------------------------ |
| --userDataPath      | NOIA_NODE_USER_DATA_PATH       |
| --settingsPath      | NOIA_NODE_SETTINGS_PATH        |
| --statisticsPath    | NOIA_NODE_STATISTICS_PATH      |
| --storageDir        | NOIA_NODE_STORAGE_DIR          |
| --storageSize       | NOIA_NODE_STORAGE_SIZE         |
| --domain            | NOIA_NODE_DOMAIN               |
| --ssl               | NOIA_NODE_SSL                  |
| --sslPrivateKeyPath | NOIA_NODE_SSL_PRIVATE_KEY_PATH |
| --sslCrtPath        | NOIA_NODE_SSL_CRT_PATH         |
| --sslCrtBundlePath  | NOIA_NODE_SSL_CRT_BUNDLE_PATH  |
| --publicIp          | NOIA_NODE_PUBLIC_IP            |
| --http              | NOIA_NODE_HTTP                 |
| --httpIp            | NOIA_NODE_HTTP_IP              |
| --httpPort          | NOIA_NODE_HTTP_PORT            |
| --ws                | NOIA_NODE_WS                   |
| --wsIp              | NOIA_NODE_WS_IP                |
| --wsPort            | NOIA_NODE_WS_PORT              |
| --wrtc              | NOIA_NODE_WRTC                 |
| --wrtcControlPort   | NOIA_NODE_WRTC_CONTROL_PORT    |
| --wrtcControlIp     | NOIA_NODE_WRTC_CONTROL_IP      |
| --wrtcDataPort      | NOIA_NODE_WRTC_DATA_PORT       |
| --wrtcDataIp        | NOIA_NODE_WRTC_DATA_IP         |
| --walletAddress     | NOIA_NODE_WALLET_ADDRESS       |
| --walletMnemonic    | NOIA_NODE_WALLET_MNEMONIC      |
| --walletProviderUrl | NOIA_NODE_WALLET_PROVIDER_URL  |
| --client            | NOIA_NODE_CLIENT               |
| --masterAddress     | NOIA_NODE_MASTER_ADDRESS       |
| --whitelistMasters  | NOIA_NODE_WHITELIST_MASTERS    |
| --controller        | NOIA_NODE_CONTROLLER           |
| --controllerIp      | NOIA_NODE_CONTROLLER_IP        |
| --controllerPort    | NOIA_NODE_CONTROLLER_PORT      |
| --skipBlockchain    | NOIA_NODE_SKIP_BLOCKCHAIN      |

## License

Released under the [LGPL-2.1](LICENSE).

[noia-node]: https://github.com/noia-network/noia-node
