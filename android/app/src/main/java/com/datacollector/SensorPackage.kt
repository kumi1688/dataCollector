package com.datacollector

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class SensorPackage: ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        val modules = ArrayList<NativeModule>()
        modules.add(SensorModule(reactContext, "accelerometer"))
        modules.add(SensorModule(reactContext, "gyroscope"))
        modules.add(SensorModule(reactContext, "ambientTemperature"))
        modules.add(SensorModule(reactContext, "gravity"))
        modules.add(SensorModule(reactContext, "light"))
        modules.add(SensorModule(reactContext, "linearAcceleration"))
        modules.add(SensorModule(reactContext, "magneticField"))
        modules.add(SensorModule(reactContext, "pressure"))
        modules.add(SensorModule(reactContext, "proximity"))
        modules.add(SensorModule(reactContext, "relativeHumidity"))
        modules.add(SensorModule(reactContext, "rotationVector"))
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return Collections.emptyList()
    }
}