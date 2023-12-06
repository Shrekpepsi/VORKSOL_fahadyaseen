package com.awesomeproject;

import android.view.View;

import androidx.annotation.NonNull;

import java.util.Arrays;
import java.util.List;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class PDFScannerPackage implements ReactPackage {


    @NonNull
    @Override
    public List< NativeModule > createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.<NativeModule>asList(
                new PDFScannerModule(reactApplicationContext)
        );
    }

    @NonNull
    @Override
    public List< ViewManager > createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.asList();
    }
}
