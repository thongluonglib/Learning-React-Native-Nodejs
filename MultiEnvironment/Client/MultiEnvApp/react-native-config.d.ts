declare module 'react-native-config' {
    export interface NativeConfig {
        ENV: string
        API_URL: string

        ANDROID_VERSION_CODE: string
        ANDROID_VERSION_NAME: string

    }

    export const Config: NativeConfig
    export default Config
}