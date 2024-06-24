import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getHelloWorld(): Promise<number>;
}

export default TurboModuleRegistry.get<Spec>("RTNHelloWorld") as Spec | null;