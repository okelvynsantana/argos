import { SdkgenHttpServer } from "@sdkgen/node-runtime";
import "./controllers";

import { api } from "./api";

const server = new SdkgenHttpServer(api, {});

server.listen(parseInt(process.env.PORT || "3333", 10));
