import { NoiaNodeSettings } from "./contracts";

export namespace SettingsHelpers {
    export function getSettingsFromEnvironment(): Partial<NoiaNodeSettings> {
        return {
            userDataPath: process.env.NOIA_NODE_USER_DATA_PATH,
            settingsPath: process.env.NOIA_NODE_SETTINGS_PATH,
            storageDir: process.env.NOIA_NODE_STORAGE_DIR,
            storageSize: process.env.NOIA_NODE_STORAGE_SIZE,
            domain: process.env.NOIA_NODE_DOMAIN,
            // ssl: process.env.NOIA_NODE_SSL != null ? Boolean(process.env.NOIA_NODE_SSL) : undefined,
            // privateKeyPath: process.env.NOIA_NODE_PRIVATE_KEY_PATH,
            // crtPath: process.env.NOIA_NODE_CRT_PATH,
            // crtBundlePath: process.env.NOIA_NODE_CRT_BUNDLE_PATH,
            publicIp: process.env.NOIA_NODE_PUBLIC_IP,
            http: process.env.NOIA_NODE_HTTP != null ? Boolean(process.env.NOIA_NODE_HTTP) : undefined,
            httpIp: process.env.NOIA_NODE_HTTP_IP,
            httpPort: process.env.NOIA_NODE_HTTP_PORT,
            ws: process.env.NOIA_NODE_WS != null ? Boolean(process.env.NOIA_NODE_WS) : undefined,
            wsIp: process.env.NOIA_NODE_WS_IP,
            wsPort: process.env.NOIA_NODE_WS_PORT,
            wrtc: process.env.NOIA_NODE_WRTC != null ? Boolean(process.env.NOIA_NODE_WRTC) : undefined,
            wrtcControlPort: process.env.NOIA_NODE_WRTC_CONTROL_PORT,
            wrtcControlIp: process.env.NOIA_NODE_WRTC_CONTROL_IP,
            wrtcDataPort: process.env.NOIA_NODE_WRTC_DATA_PORT,
            wrtcDataIp: process.env.NOIA_NODE_WRTC_DATA_IP,
            walletAddress: process.env.NOIA_NODE_WALLET_ADDRESS,
            walletMnemonic: process.env.NOIA_NODE_WALLET_MNEMONIC,
            walletProviderUrl: process.env.NOIA_NODE_WALLET_PROVIDER_URL,
            client: process.env.NOIA_NODE_CLIENT,
            masterAddress: process.env.NOIA_NODE_MASTER_ADDRESS,
            whitelistMasters:
                process.env.NOIA_NODE_WHITELIST_MASTERS != null ? process.env.NOIA_NODE_WHITELIST_MASTERS.split(",") : undefined,
            controller: process.env.NOIA_NODE_CONTROLLER != null ? Boolean(process.env.NOIA_NODE_CONTROLLER) : undefined,
            controllerIp: process.env.NOIA_NODE_CONTROLLER_IP,
            controllerPort: process.env.NOIA_NODE_CONTROLLER_PORT,
            skipBlockchain: process.env.NOIA_NODE_SKIP_BLOCKCHAIN != null ? Boolean(process.env.NOIA_NODE_SKIP_BLOCKCHAIN) : undefined
        };
    }

    export function mergeSettings(...settingsList: Array<Partial<NoiaNodeSettings>>): Partial<NoiaNodeSettings> {
        const cleanedOptions: { [key: string]: string | number | string[] | boolean } = {};

        for (const settings of settingsList) {
            for (const key of Object.keys(settings)) {
                const value = (settings as { [key: string]: string | number | string[] | boolean | undefined })[key];
                if (value != null) {
                    cleanedOptions[key] = value;
                }
            }
        }

        return cleanedOptions;
    }
}
