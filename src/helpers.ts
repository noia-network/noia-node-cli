import * as dns from "dns";

export namespace Helpers {
    export async function ensureInternetConnection(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            dns.lookupService("8.8.8.8", 53, error => {
                if (error != null && error.code != null && ["ENOTFOUND", "EAI_AGAIN"].indexOf(error.code) !== -1) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    export function removeUndefined(obj: object): object {
        return JSON.parse(JSON.stringify(obj));
    }
}
