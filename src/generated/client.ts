import { Context, SdkgenError, SdkgenHttpClient, SdkgenErrorWithData } from "@sdkgen/node-runtime";

export interface InternalServerErrorData {
    message: string
}

export interface InvalidArgumentData {
    argumentName: string
    reason: string
}

export interface ApiResponse {
    status: number
    message: string
    error: boolean
}

export interface FaceResponse {
    match: boolean
    info: Face[] | null
}

export interface Face {
    similarity: number
    faceId: string
}

export class InternalServerError extends SdkgenErrorWithData<InternalServerErrorData> {}

export class InvalidArgument extends SdkgenErrorWithData<InvalidArgumentData> {}

export class ServiceError extends SdkgenError {}

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
    InvalidArgument,
    ServiceError,
    Fatal
};

const astJson = {
    annotations: {
        "fn.checkApiStatus": [
            {
                type: "description",
                value: "Return a message when api is running"
            }
        ]
    },
    errors: [
        [
            "InternalServerError",
            "InternalServerErrorData"
        ],
        [
            "InvalidArgument",
            "InvalidArgumentData"
        ],
        "ServiceError",
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
        InvalidArgumentData: {
            argumentName: "string",
            reason: "string"
        },
        ApiResponse: {
            status: "int",
            message: "string",
            error: "bool"
        },
        FaceResponse: {
            match: "bool",
            info: "Face[]?"
        },
        Face: {
            similarity: "float",
            faceId: "string"
        }
    }
};
