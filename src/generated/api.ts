import { BaseApiConfig, Context, SdkgenError, SdkgenErrorWithData } from "@sdkgen/node-runtime";

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

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    fn!: {
        checkApiStatus: (ctx: Context & ExtraContextT, args: {}) => Promise<ApiResponse>
        searchFaceInBase: (ctx: Context & ExtraContextT, args: {image: Buffer}) => Promise<FaceResponse>
    }

    /** @deprecated api.err shouldn't be used. Import and throw errors directly. */
    err = {
        ServiceError(message: string = "") { throw new ServiceError(message); },
        Fatal(message: string = "") { throw new Fatal(message); }
    }

    astJson = {
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
    }
}

export const api = new ApiConfig<{}>();
