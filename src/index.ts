#!/usr/bin/env node
// tslint:disable-next-line:no-require-imports
import NoiaNode = require("@noia-network/node");
import * as updateNotifier from "update-notifier";
import * as AppDataFolder from "app-data-folder";
import * as fs from "fs-extra";
import * as path from "path";

import { SettingsHelpers } from "./settings-helpers";
import { ArgsHandler } from "./cli-arguments";
import { NoiaNodeSettings } from "./contracts";

async function main(): Promise<void> {
    const packageJson = await fs.readJson(path.resolve(__dirname, "../package.json"));
    updateNotifier({
        updateCheckInterval: 60 * 1000,
        packageName: packageJson.name,
        packageVersion: packageJson.version
    });

    // AppData or Home directory
    const userDataPath = AppDataFolder("noia-node-cli");
    await fs.ensureDir(userDataPath);

    const { _, $0, ...CliSettings } = ArgsHandler;
    const settings: Partial<NoiaNodeSettings> = SettingsHelpers.mergeSettings(
        { userDataPath: userDataPath },
        SettingsHelpers.getSettingsFromEnvironment(),
        CliSettings,
        { isHeadless: true }
    );

    const node = new NoiaNode(settings);
    // tslint:disable-next-line:no-any
    node.master.on("connected", async (info: any) => {
        const currentIp: string = node.settings.settings[node.settings.Options.wrtcDataIp];
        const nextExternalIp: string = info.params.externalIp;
        if (currentIp !== nextExternalIp) {
            node.settings.update(node.settings.Options.wrtcDataIp, info.params.externalIp);
            console.info(`[noia-node] External IP (wrtcDataIp) changed. From ${currentIp} to ${nextExternalIp}.`);

            await node.stop();
            node.start();
        }
    });
    node.start();
}

main();
