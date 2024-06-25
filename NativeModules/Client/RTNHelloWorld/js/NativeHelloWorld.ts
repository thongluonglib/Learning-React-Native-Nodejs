import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getHelloWorld(a: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>("RTNHelloWorld") as Spec | null;