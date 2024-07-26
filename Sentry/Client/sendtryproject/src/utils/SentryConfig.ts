import * as Sentry from "@sentry/react-native";
import Config from "react-native-config";
/**
 * apiTrack: ["localhost", "my-site-url.com"]: add api if want to track api
 * shouldCreateSpanForRequest: (url) => {
        // Do not create spans for outgoing requests to a `/health/` endpoint
        return !url.match(/\/get-timeout\/?$/);
    },
 */
const defaultConfig = {
    isNavigationTrack: true,
    routeChangeTimeoutMs: 1000,
    apiTrack: ["localhost", 'http://10.0.2.2:3000'],
    shouldCreateSpanForRequest: null,
}

class SentryConfig {
    static _instance: SentryConfig;
    routingInstrumentation: any;

    public static get instance(): SentryConfig {
        if (!SentryConfig._instance) {
            SentryConfig._instance = new SentryConfig();
        }
        return SentryConfig._instance;
    }

    init() {
        let reactTracingConfig: any = {}
        if (defaultConfig.isNavigationTrack) {
            this.routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
                enableTimeToInitialDisplay: true,
                routeChangeTimeoutMs: defaultConfig.routeChangeTimeoutMs, // default: 1000
            })
            reactTracingConfig.routingInstrumentation = this.routingInstrumentation
        }
        if (defaultConfig.apiTrack?.length > 0) {
            reactTracingConfig.tracePropagationTargets = [...defaultConfig.apiTrack]
            if (defaultConfig?.shouldCreateSpanForRequest) {
                reactTracingConfig.shouldCreateSpanForRequest = defaultConfig.shouldCreateSpanForRequest
            }
        }

        Sentry.init({
            dsn: Config.DNS_SENTRY, //Goto setting project in sentry dashboard to get it
            // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
            // We recommend adjusting this value in production.
            tracesSampleRate: 1.0,
            _experiments: {
                // profilesSampleRate is relative to tracesSampleRate.
                // Here, we'll capture profiles for 100% of transactions.
                profilesSampleRate: 1.0,
            },
            integrations: [new Sentry.ReactNativeTracing(reactTracingConfig)]
        });
    }
    registerNavigationContainer(navigation: any) {
        this.routingInstrumentation.registerNavigationContainer(navigation)
    }
    captureMessage(message: string | "this is a message", type: String | "fatal" | "error" | "warning" | "log" | "info" | "info") {
        console.log('Send message')
        Sentry.captureMessage(message, type);
    }
}

export default SentryConfig.instance

export function captureMessage(message: string | "this is a message", type?: string | "fatal" | "error" | "warning" | "log" | "info" | "info") {
    Sentry.captureMessage(message, type);
}

