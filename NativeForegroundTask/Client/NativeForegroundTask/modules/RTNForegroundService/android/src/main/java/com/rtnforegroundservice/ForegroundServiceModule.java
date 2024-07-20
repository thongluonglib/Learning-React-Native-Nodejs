package com.rtnforegroundservice;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.rtnforegroundservice.NativeForegroundServiceSpec;
import com.rtnforegroundservice.MyForegroundService;

public class ForegroundServiceModule extends NativeForegroundServiceSpec {

    public static String NAME = "RTNForegroundService";

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void add(double a, double b, Promise promise) {
        promise.resolve(a + b);
    }

    @Override
    public void startForegroundTask(Promise promise){
        
    }
}