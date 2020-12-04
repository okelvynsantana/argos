import "dotenv/config";
import "./database";
import "reflect-metadata";
import { Context as SdkgenContext } from "@sdkgen/node-runtime";
import { ApiConfig } from "./generated/api";

export type Context = SdkgenContext;
export const api = new ApiConfig<Context>();
