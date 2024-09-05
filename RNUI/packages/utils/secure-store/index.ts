import * as Keychain from 'react-native-keychain';
import { UserCredentials } from 'react-native-keychain';
/**
 * Uses
 * Get
    const userLocalStorage = await SecureStore.getStorage();
    const userLocalStorage1 = await SecureStore.getStorage('hello1');
    const userLocalStorage2 = await SecureStore.getStorage('hello2');

*   Set
    SecureStore.setStorage(username, response.backendTokens)
    SecureStore.setStorage(username, 'hello1', 'hello1')
    SecureStore.setStorage(username, 'hello2', 'hello2')

*   Remove
    await SecureStore.removeStorage('hello1')
 */
type DataType<T> = UserCredentials & {
    password: T
}
export class SecureStore {
    static async getStorage<T>(service?: string) {
        if (service) {
            const data: DataType<T> = await Keychain.getGenericPassword({ service: service });
            try {
                if (data.password) {
                    data.password = JSON.parse(data.password);
                }
            } catch (error) {
            }
            console.log('GenericPassword: ', data);

            return data;
        }
        else {
            const data: DataType<T> = await Keychain.getGenericPassword();
            try {
                if (data.password) {
                    data.password = JSON.parse(data.password);
                }
            } catch (error) {

            }
            console.log('GenericPassword: ', data);

            return data;
        }
    }
    static async setStorage(key: string, value: any, service?: string) {
        if (service) {
            const data = await Keychain.setGenericPassword(key, JSON.stringify(value), { service: service });
            return data;
        }
        else {
            const data = await Keychain.setGenericPassword(key, JSON.stringify(value));
            return data;
        }
    }
    static async removeStorage(service?: string) {
        if (service) {
            const data = await Keychain.resetGenericPassword({ service: service });
            return data;
        }
        else {
            const data = await Keychain.resetGenericPassword();
            return data;
        }
    }
}
