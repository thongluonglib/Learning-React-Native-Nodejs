import React from "react";
import { useState } from "react";
import { SafeAreaView, StatusBar, Text, Button } from "react-native";
import RTNCalculator from "rtn-calculator/js/NativeCalculator";
import RTNHelloWorld from 'rtn-helloworld/js/NativeHelloWorld'
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "DNS_SentryHere",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});


const App: () => JSX.Element = () => {
  const [result, setResult] = useState<number | null>(null);
  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} />
      <Text style={{ marginLeft: 20, marginTop: 20 }}>
        3+7={result ?? "??"}
      </Text>
      <Button
        title="Compute"
        onPress={async () => {
          const value = await RTNCalculator?.add(3, 7);
          setResult(value ?? null);
        }}
      />
      <Button
        title="Sub"
        onPress={async () => {
          const value = await RTNCalculator?.sub(3, 7);
          setResult(value ?? null);
        }}
      />
      <Button
        title="HelloWorld"
        onPress={async () => {
          const value = await RTNHelloWorld?.getHelloWorld("10");
          console.log('value', JSON.stringify(value, null, 2))
        }}
      />
    </SafeAreaView>
  );
};
export default Sentry.wrap(App);