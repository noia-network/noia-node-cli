import { NodeSettingsDto } from "@noia-network/node-settings";
import { DeepPartial } from "@noia-network/node-settings/dist/contracts/types-helpers";

export namespace SettingsHelpers {
    export function getSettingsFromEnvironment(): DeepPartial<NodeSettingsDto> {
        return {
            blockchain: {
                airdropAddress: process.env.NOIA_NODE_BLOCKCHAIN_AIRDROP_ADDRESS,
                clientAddress: process.env.NOIA_NODE_BLOCKCHAIN_CLIENT_ADDRESS,
                doCreateClient:
                    process.env.NOIA_NODE_BLOCKCHAIN_DO_CREATE_ADDRESS != null
                        ? Boolean(process.env.NOIA_NODE_BLOCKCHAIN_DO_CREATE_ADDRESS)
                        : undefined,
                isEnabled:
                    process.env.NOIA_NODE_BLOCKCHAIN_USER_DATA_PATH != null
                        ? Boolean(process.env.NOIA_NODE_BLOCKCHAIN_USER_DATA_PATH)
                        : undefined,
                lastBlockPosition: process.env.NOIA_NODE_BLOCKCHAIN_LAST_BLOCK_POSITION,
                walletMnemonic: process.env.NOIA_NODE_BLOCKCHAIN_WALLET_MNEMONIC,
                walletProviderUrl: process.env.NOIA_NODE_BLOCKCHAIN_WALLET_PROVIDER_URL,
                workOrderAddress: process.env.NOIA_NODE_BLOCKCHAIN_WORK_ORDER_ADDRESS
            },
            controller: {
                ip: process.env.NOIA_NODE_CONTROLLER_IP,
                isEnabled:
                    process.env.NOIA_NODE_CONTROLLER_IS_ENABLED != null ? Boolean(process.env.NOIA_NODE_CONTROLLER_IS_ENABLED) : undefined,
                port: process.env.NOIA_NODE_CONTROLLER_PORT != null ? Number(process.env.NOIA_NODE_CONTROLLER_PORT) : undefined
            },
            autoReconnect: process.env.NOIA_NODE_AUTO_RECONNECT != null ? Boolean(process.env.NOIA_NODE_AUTO_RECONNECT) : undefined,
            domain: process.env.NOIA_NODE_DOMAIN,
            masterAddress: process.env.NOIA_NODE_MASTER_ADDRESS,
            natPmp: process.env.NOIA_NODE_NAT_PMP != null ? Boolean(process.env.NOIA_NODE_NAT_PMP) : undefined,
            nodeId: process.env.NOIA_NODE_ID,
            sockets: {
                http: {
                    ip: process.env.NOIA_NODE_SOCKETS_HTTP_IP,
                    isEnabled:
                        process.env.NOIA_NODE_SOCKETS_HTTP_IS_ENABLED != null
                            ? Boolean(process.env.NOIA_NODE_SOCKETS_HTTP_IS_ENABLED)
                            : undefined,
                    port:
                        process.env.NOIA_NODE_SOCKETS_HTTP_IP_PORT != null ? Number(process.env.NOIA_NODE_SOCKETS_HTTP_IP_PORT) : undefined
                },
                wrtc: {
                    controlIp: process.env.NOIA_NODE_SOCKETS_WRTC_CONTROL_IP,
                    controlPort:
                        process.env.NOIA_NODE_SOCKETS_WRTC_CONTROL_PORT != null
                            ? Number(process.env.NOIA_NODE_SOCKETS_WRTC_CONTROL_PORT)
                            : undefined,
                    dataIp: process.env.NOIA_NODE_SOCKETS_WRTC_DATA_IP,
                    dataPort:
                        process.env.NOIA_NODE_SOCKETS_WRTC_DATA_PORT != null
                            ? Number(process.env.NOIA_NODE_SOCKETS_WRTC_DATA_PORT)
                            : undefined,
                    isEnabled:
                        process.env.NOIA_NODE_SOCKETS_WRTC_IS_ENABLED != null
                            ? Boolean(process.env.NOIA_NODE_SOCKETS_WRTC_IS_ENABLED)
                            : undefined
                },
                ws: {
                    ip: process.env.NOIA_NODE_SOCKETS_WS_IP,
                    isEnabled:
                        process.env.NOIA_NODE_SOCKETS_IS_ENABLED != null ? Boolean(process.env.NOIA_NODE_SOCKETS_IS_ENABLED) : undefined,
                    port: process.env.NOIA_NODE_SOCKETS_PORT != null ? Number(process.env.NOIA_NODE_SOCKETS_PORT) : undefined
                }
            },
            ssl: {
                isEnabled: process.env.NOIA_NODE_SSL_IS_ENABLED != null ? Boolean(process.env.NOIA_NODE_SSL_IS_ENABLED) : undefined,
                caBundlePath: process.env.NOIA_NODE_CA_BUNDLE_PATH,
                crtPath: process.env.NOIA_NODE_CRT_PATH,
                privateKeyPath: process.env.NOIA_NODE_PRIVATE_KEY_PATH
            },
            storage: {
                dir: process.env.NOIA_NODE_STORAGE_DIR,
                size: process.env.NOIA_NODE_STORAGE_SIZE != null ? Number(process.env.NOIA_NODE_STORAGE_SIZE) : undefined
            },
            userDataPath: process.env.NOIA_NODE_USER_DATA_PATH
        };
    }
}
