package com.imagepicker;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationManagerCompat;

public class MyForegroundService extends Service {
    int count = 0;
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Context context = this;

        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    if (ActivityCompat.checkSelfPermission(context, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {

                    }
                    count++;
                    final String CHANNEL_ID = "Foreground Service ID";
                    NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_ID, NotificationManager.IMPORTANCE_LOW);
                    getSystemService(NotificationManager.class).createNotificationChannel(channel);
                    Notification.Builder notification = new Notification.Builder(context, CHANNEL_ID)
                            .setContentText("Service is running.." + String.valueOf(count))
                            .setContentTitle("Service Enabled")
                            .setSmallIcon(R.mipmap.ic_launcher);
                    NotificationManagerCompat.from(context).notify(1001, notification.build());
                    Log.e("Service", "Service is running....");
                    try {
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();


//        startForeground(1001,  notification.build());
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
