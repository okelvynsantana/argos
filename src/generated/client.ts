import { Context, SdkgenError, SdkgenHttpClient, SdkgenErrorWithData } from "@sdkgen/node-runtime";

export interface InternalServerErrorData {
    message: string
}

export interface ApiResponse {
    status: number
    message: string
    error: boolean
}

export interface FaceResponse {
    match: boolean
}

export class InternalServerError extends SdkgenErrorWithData<InternalServerErrorData> {}

export class Fatal extends SdkgenError {}

export class ApiClient extends SdkgenHttpClient {
    constructor(baseUrl: string) {
        super(baseUrl, astJson, errClasses);
    }

    checkApiStatus(ctx: Context | null, args: {}): Promise<ApiResponse> { return this.makeRequest(ctx, "checkApiStatus", args); }
    searchFaceInBase(ctx: Context | null, args: {image: Buffer}): Promise<FaceResponse> { return this.makeRequest(ctx, "searchFaceInBase", args); }
}

const errClasses = {
    InternalServerError,
    Fatal
};

const astJson = {
    annotations: {},
    errors: [
        [
            "InternalServerError",
            "InternalServerErrorData"
        ],
        "Fatal"
    ],
    functionTable: {
        checkApiStatus: {
            args: {},
            ret: "ApiResponse"
        },
        searchFaceInBase: {
            args: {
                image: "bytes"
            },
            ret: "FaceResponse"
        }
    },
    typeTable: {
        InternalServerErrorData: {
            message: "string"
        },
        ApiResponse: {
            status: "int",
            message: "string",
            error: "bool"
        },
        FaceResponse: {
            match: "bool"
        }
    }
};
