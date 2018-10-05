#!/usr/bin/env node
import * as AppDataFolder from "app-data-folder";
import * as fs from "fs-extra";
import * as path from "path";
import * as updateNotifier from "update-notifier";
import chalk from "chalk";
import { Node, SettingsEnum } from "@noia-network/node";

import { ArgsHandler } from "./cli-arguments";
import { Helpers } from "./helpers";
import { NoiaNodeSettings } from "./contracts";
import { SettingsHelpers } from "./settings-helpers";

async function main(): Promise<void> {
    let timesReconnected: number = 0;
    const packageJson = await fs.readJson(path.resolve(__dirname, "../package.json"));
    updateNotifier({
        updateCheckInterval: 60 * 1000,
        packageName: packageJson.name,
        packageVersion: packageJson.version
    });

    // AppData or Home directory.
    const userDataPath = AppDataFolder("noia-node-cli");
    await fs.ensureDir(userDataPath);

    const { _, $0, ...CliSettings } = ArgsHandler;
    const settings: Partial<NoiaNodeSettings> = SettingsHelpers.mergeSettings(
        { userDataPath: userDataPath },
        SettingsHelpers.getSettingsFromEnvironment(),
        CliSettings,
        { isHeadless: true }
    );

    const node = new Node(settings);

    node.master.on("connected", async info => {
        timesReconnected = 0;
        const currentIp: string = node.settings.options[SettingsEnum.wrtcDataIp];
        const nextExternalIp: string = node.master.getWire().getRemoteMetadata().externalIp;
        if (currentIp !== nextExternalIp) {
            node.settings.update(SettingsEnum.wrtcDataIp, nextExternalIp);
            console.info(`[noia-node] External IP (wrtcDataIp) changed. From ${currentIp} to ${nextExternalIp}.`);

            await node.stop();
            node.start();
        }
    });

    node.master.on("closed", async info => {
        try {
            await Helpers.ensureInternetConnection();
        } catch (error) {
            console.error(`${chalk.red("error")}:`, "[noia-node] No internet connection, please connect to the internet.");
        }

        const seconds = Math.pow(2, timesReconnected);
        timesReconnected++;
        console.info(`${chalk.green("info")}:`, `[noia-node] Will try to reconnect in ${seconds} seconds.`);

        setTimeout(() => {
            node.start();
        }, seconds * 1000);
    });

    node.on("error", (error: Error & { code?: string }) => {
        // We only handle error on "Could not connect to master".
        if (error.code !== "ENOTFOUND") {
            process.exit(1);
        }
    });

    node.start();
}

main();
