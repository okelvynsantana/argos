import { BaseApiConfig, Context, SdkgenError, SdkgenErrorWithData } from "@sdkgen/node-runtime";

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

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    fn!: {
        checkApiStatus: (ctx: Context & ExtraContextT, args: {}) => Promise<ApiResponse>
        searchFaceInBase: (ctx: Context & ExtraContextT, args: {image: Buffer}) => Promise<FaceResponse>
    }

    /** @deprecated api.err shouldn't be used. Import and throw errors directly. */
    err = {
        Fatal(message: string = "") { throw new Fatal(message); }
    }

    astJson = {
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
    }
}

export const api = new ApiConfig<{}>();
