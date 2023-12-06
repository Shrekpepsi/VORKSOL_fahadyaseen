package com.awesomeproject;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.database.Cursor;
import android.provider.MediaStore;
import android.net.Uri;
import androidx.core.content.FileProvider;
// ... other imports as needed ...

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

public class PDFScannerModule  extends ReactContextBaseJavaModule {
    PDFScannerModule (ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "PDFScanner";
    }


    @ReactMethod
    public void scanForPDfs() {
        WritableArray pdfList = new WritableNativeArray();
    }

}