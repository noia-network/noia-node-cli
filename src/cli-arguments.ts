import * as yargs from "yargs";

export type CliArguments = yargs.Arguments;

export const ArgsHandler = yargs
    .showHelpOnFail(true)
    .help("h", "Show help")
    .alias("h", "help")
    .version()
    .alias("v", "version")
    // CLI Options
    .option("userDataPath", {
        description:
            "Path to user data folder. If specified, default 'settings.json' and/or 'statistics.json' will be saved to user data folder.",
        type: "string"
    })
    .option("settingsPath", {
        description: "Path to 'node.settings'.",
        type: "string"
    })
    .option("masterAddress", {
        description: "Master address to connect to if skipping blockchain.",
        type: "string"
    }).argv;
