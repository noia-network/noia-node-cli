import * as yargs from "yargs";
import { NoiaNodeSettings } from "./contracts";

export type CliArguments = NoiaNodeSettings & yargs.Arguments;

function flagName(name: keyof NoiaNodeSettings): string {
    return name;
}

export const ArgsHandler = yargs
    .showHelpOnFail(true)
    .help("h", "Show help")
    .alias("h", "help")
    .version()
    .alias("v", "version")
    // CLI Options
    .option(flagName("userDataPath"), {
        description:
            // tslint:disable-next-line:max-line-length
            "Path to user user data folder. If specified, default 'settings.json' and/or 'statistics.json' will be saved to user data folder.",
        type: "string"
    })
    .option(flagName("settingsPath"), {
        description: "Path to 'settings.json'.",
        type: "string"
    })
    .option(flagName("statisticsPath"), {
        description: "Path to 'statistics.json'.",
        type: "string"
    })
    .option(flagName("storageDir"), {
        description: "Path to storage directory.",
        type: "string"
    })
    .option(flagName("storageSize"), {
        description: "Size of disk space available to use for caching purposes.",
        type: "number"
    })
    .option(flagName("domain"), {
        description: "Domain SSL is valid for.",
        type: "string"
    })
    .option(flagName("ssl"), {
        description: "True to use secure connections.",
        type: "boolean"
    })
    .option(flagName("sslPrivateKeyPath"), {
        description: "Path to SSL private key.",
        type: "string"
    })
    .option(flagName("sslCrtPath"), {
        description: "Path to certificate.",
        type: "string"
    })
    .option(flagName("sslCrtBundlePath"), {
        description: "Path to certificate bundle.",
        type: "string"
    })
    .option(flagName("publicIp"), {
        description: "Public IP that master must use. If empty, master must resolve IP by itself.",
        type: "string"
    })
    .option(flagName("http"), {
        description: "True to deliver content via HTTP protocol.",
        type: "boolean"
    })
    .option(flagName("httpIp"), {
        description: "HTTP listening ip.",
        type: "string"
    })
    .option(flagName("httpPort"), {
        description: "HTTP listening port.",
        type: "number"
    })
    .option(flagName("ws"), {
        description: "True to deliver content via WebSockets protocol.",
        type: "boolean"
    })
    .option(flagName("wsIp"), {
        description: "WebSocket listening ip.",
        type: "string"
    })
    .option(flagName("wsPort"), {
        description: "WebSocket listening port.",
        type: "boolean"
    })
    .option(flagName("wrtc"), {
        description: "To deliver content via WebRTC.",
        type: "boolean"
    })
    .option(flagName("wrtcControlPort"), {
        description: "Control port to exchange SDP descriptions via HTTP.",
        type: "number"
    })
    .option(flagName("wrtcControlIp"), {
        description: "Control ip to exchange SDP descriptions via HTTP.",
        type: "string"
    })
    .option(flagName("wrtcDataPort"), {
        description: "WebRTC data port.",
        type: "number"
    })
    .option(flagName("wrtcDataIp"), {
        description: "WebRTC data IP.",
        type: "string"
    })
    .option(flagName("walletAddress"), {
        description:
            // tslint:disable-next-line:max-line-length
            "Wallet address. If 'skipBlockchain' is turned on this setting takes effect, else 'walletMnemonic' is used to retrieve wallet address.",
        type: "string"
    })
    .option(flagName("walletProviderUrl"), {
        description: "Wallet provider url.",
        type: "string"
    })
    .option(flagName("client"), {
        description: "Node client address.",
        type: "string"
    })
    .option(flagName("masterAddress"), {
        description: "Master address to connect to if skipping blockchain.",
        type: "string"
    })
    .option(flagName("whitelistMasters"), {
        description: "Masters whitelist. If empty array then all masters addresses are available.",
        type: "array"
    })
    .option(flagName("controller"), {
        description: "RESTful node controller. Listens by default on 9000 port when turned on.",
        type: "string"
    })
    .option(flagName("controllerIp"), {
        description: "Node controller IP.",
        type: "string"
    })
    .option(flagName("controllerPort"), {
        description: "Node controller port.",
        type: "boolean"
    })
    .option(flagName("skipBlockchain"), {
        description: "Connect directy to master using masterAddress (ignores whitelist) if turned on.",
        type: "boolean"
    }).argv as CliArguments;
