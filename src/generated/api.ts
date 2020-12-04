import { BaseApiConfig, Context, SdkgenError } from "@sdkgen/node-runtime";

export interface ApiResponse {
    status: number
    message: string
    error: boolean
}

export class Fatal extends SdkgenError {}

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    fn!: {
        checkApiStatus: (ctx: Context & ExtraContextT, args: {}) => Promise<ApiResponse>
    }

    /** @deprecated api.err shouldn't be used. Import and throw errors directly. */
    err = {
        Fatal(message: string = "") { throw new Fatal(message); }
    }

    astJson = {
        annotations: {},
        errors: [
            "Fatal"
        ],
        functionTable: {
            checkApiStatus: {
                args: {},
                ret: "ApiResponse"
            }
        },
        typeTable: {
            ApiResponse: {
                status: "int",
                message: "string",
                error: "bool"
            }
        }
    }
}

export const api = new ApiConfig<{}>();
