// 1) Import Sharepoint PNP Configurations

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, SPFx, spfi } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

// 2) SET SPFI for connecting to our lists
// var _sp: SPFI = null;
var _sp: SPFI | null = null;

export const getSP = (context?: WebPartContext): SPFI => {
    if (_sp === null && context != null) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning))

    }
   // return _sp;
   return _sp!;
};




