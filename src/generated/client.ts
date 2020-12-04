import { Context, SdkgenError, SdkgenHttpClient, SdkgenErrorWithData } from "@sdkgen/node-runtime";

export interface ApiResponse {
    status: number
    message: string
    error: boolean
}

export class Fatal extends SdkgenError {}

export class ApiClient extends SdkgenHttpClient {
    constructor(baseUrl: string) {
        super(baseUrl, astJson, errClasses);
    }

    checkApiStatus(ctx: Context | null, args: {}): Promise<ApiResponse> { return this.makeRequest(ctx, "checkApiStatus", args); }
}

const errClasses = {
    Fatal
};

const astJson = {
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
};
