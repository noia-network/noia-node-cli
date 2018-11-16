#!/usr/bin/env node
import * as fs from "fs-extra";
import * as path from "path";
import * as updateNotifier from "update-notifier";
import chalk from "chalk";
import { Node } from "@noia-network/node";
import { NodeSettings, NodeSettingsDto } from "@noia-network/node-settings";

import { ArgsHandler } from "./cli-arguments";
import { DeepPartial } from "@noia-network/node-settings/dist/contracts/types-helpers";
import { Helpers } from "./helpers";
import { SettingsHelpers } from "./settings-helpers";

async function main(): Promise<void> {
    const packageJson = await fs.readJson(path.resolve(__dirname, "../package.json"));
    updateNotifier({
        updateCheckInterval: 60 * 1000,
        packageName: packageJson.name,
        packageVersion: packageJson.version
    });

    const { _, $0, ...CliSettings } = ArgsHandler;

    const settings: DeepPartial<NodeSettingsDto> = {
        ...Helpers.removeUndefined(CliSettings),
        ...Helpers.removeUndefined(SettingsHelpers.getSettingsFromEnvironment())
    };

    const settingsPath = CliSettings.settingsPath != null ? CliSettings.settingsPath : NodeSettings.getDefaultSettingsPath();
    const nodeSettings = await NodeSettings.init(settingsPath, settings);

    const node = new Node({
        interface: "cli"
    });

    await node.init(nodeSettings);

    node.getMaster().on("connected", async () => {
        const settingsWrtcScope = node
            .getSettings()
            .getScope("sockets")
            .getScope("wrtc");
        const currentIp: string | null = settingsWrtcScope.get("dataIp");
        const nextExternalIp: string = node
            .getMaster()
            .getWire()
            .getRemoteMetadata().externalIp;
        if (currentIp !== nextExternalIp) {
            settingsWrtcScope.update("dataIp", nextExternalIp);
            console.info(`[noia-node] External IP (wrtcDataIp) changed. From ${currentIp} to ${nextExternalIp}.`);
            await node.restart(15);
        }
    });

    node.getMaster().on("closed", async () => {
        try {
            await Helpers.ensureInternetConnection();
        } catch (error) {
            console.error(`${chalk.red("error")}:`, "[noia-node] No internet connection, please connect to the internet.");
        }
    });

    node.on("error", (error: Error & { code?: string }) => {
        // Do nothing.
    });

    node.start();
}

main();
