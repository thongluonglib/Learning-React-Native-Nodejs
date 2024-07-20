package com.nativeforegroundtask;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

public class ForegroundService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Intent intent1 = new Intent(getApplicationContext(), MyHeadlessJsTaskService.class);
                Bundle bundle = new Bundle();
                while (true) {
                    Log.e("Service", "run: Foreground Service");
                    bundle.putString("foo", "bar");
                    intent1.putExtras(bundle);
                    getApplicationContext().startService(intent1);

                    try {
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }).start();
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
