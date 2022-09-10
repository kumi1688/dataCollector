package com.datacollector

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.Gson

class SensorModule (reactContext: ReactApplicationContext, sensorName: String): ReactContextBaseJavaModule(reactContext), SensorEventListener{
    private var reactContext: ReactApplicationContext = reactContext
    private lateinit var sensorManager: SensorManager
    private lateinit var sensorName: String

    private var accelerationSensor: Sensor? = null
    private var gyroscopeSensor: Sensor? = null
    private var ambientTemperatureSensor: Sensor? = null
    private var gravitySensor: Sensor? = null
    private var lightSensor: Sensor? = null
    private var linearAcceleratrionSensor: Sensor? = null
    private var magneticFieldSensor: Sensor? = null
    private var pressureSensor: Sensor? = null
    private var proximitySensor: Sensor? = null
    private var relativeHumiditySensor: Sensor? = null
    private var rotationSensor: Sensor? = null
    private var barometerSensor: Sensor? = null

//    private var accList = mutableListOf<AccData>()
//    private var gyroList = mutableListOf<GyroData>()

    override fun getName(): String {
        return this.sensorName
    }

    init {
        this.sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        this.sensorName = sensorName

        when(this.sensorName){
            "accelerometer" -> this.accelerationSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
            "gyroscope" -> this.gyroscopeSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
            "ambientTemperature" -> this.ambientTemperatureSensor = sensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE)
            "gravity" -> this.gravitySensor = sensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY)
            "light" -> this.lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
            "linearAcceleration" -> this.linearAcceleratrionSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION)
            "magneticField" -> this.magneticFieldSensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)
            "pressure" -> this.pressureSensor = sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE)
            "proximity" -> this.proximitySensor = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY)
            "relativeHumidity" -> this.relativeHumiditySensor = sensorManager.getDefaultSensor(Sensor.TYPE_RELATIVE_HUMIDITY)
            "rotationVector" -> this.rotationSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
        }

    }

    @ReactMethod
    fun startUpdates(){
        when(this.sensorName){
            "accelerometer" -> sensorManager.registerListener(this@SensorModule, accelerationSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "gyroscope" -> sensorManager.registerListener(this@SensorModule, gyroscopeSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "ambientTemperature" -> sensorManager.registerListener(this@SensorModule, ambientTemperatureSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "gravity" -> sensorManager.registerListener(this@SensorModule, gravitySensor, SensorManager.SENSOR_DELAY_NORMAL)
            "light" -> sensorManager.registerListener(this@SensorModule, lightSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "linearAcceleration" -> sensorManager.registerListener(this@SensorModule, linearAcceleratrionSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "magneticField" -> sensorManager.registerListener(this@SensorModule, magneticFieldSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "pressure" -> sensorManager.registerListener(this@SensorModule, pressureSensor, SensorManager.SENSOR_DELAY_NORMAL)
            "proximity" -> sensorManager.registerListener(this@SensorModule, proximitySensor, SensorManager.SENSOR_DELAY_NORMAL)
            "relativeHumidity" ->sensorManager.registerListener(this@SensorModule, relativeHumiditySensor, SensorManager.SENSOR_DELAY_NORMAL)
            "rotationVector" -> sensorManager.registerListener(this@SensorModule, rotationSensor, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    @ReactMethod
    fun stopUpdates(){
        sensorManager.unregisterListener(this@SensorModule)
    }

    @ReactMethod
    fun isAvailable(promise: Promise){
        if(this.sensorName == null){
            promise.reject(RuntimeException("No " + this.sensorName + " found"));
            return;
        }
        promise.resolve(true);
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
    }

    override fun onSensorChanged(event: SensorEvent) {
        if(event != null){
            when(event.sensor.type){
                Sensor.TYPE_ACCELEROMETER,
                Sensor.TYPE_LINEAR_ACCELERATION,
                Sensor.TYPE_MAGNETIC_FIELD,
                Sensor.TYPE_GYROSCOPE,
                Sensor.TYPE_GRAVITY -> getThreeAxisSensorData(event)
                Sensor.TYPE_LIGHT,
                Sensor.TYPE_PRESSURE,
                Sensor.TYPE_PROXIMITY,
                Sensor.TYPE_RELATIVE_HUMIDITY,
                Sensor.TYPE_AMBIENT_TEMPERATURE -> getOneValueSensorData(event)
                Sensor.TYPE_ROTATION_VECTOR -> getRotationSensorData(event)
            }
        }
    }

    private fun sendEvent(data: String){
        reactContext.getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(this.sensorName, data)
    }

    private fun getRotationSensorData(event: SensorEvent){
        val xSin = event.values[0]
        val ySin = event.values[1]
        val zSin = event.values[2]
        val scalar = event.values[3]


        val data = RotationVectorData(0, xSin, ySin, zSin, scalar)
        sendEvent(Gson().toJson(data))
    }


    private fun getOneValueSensorData(event: SensorEvent){
        val value: Float = event.values[0]
        val data = OneValueData(0, value, System.currentTimeMillis())
        sendEvent(Gson().toJson(data))
    }

    private fun getThreeAxisSensorData(event: SensorEvent){
        val axisX: Float = event.values[0]
        val axisY: Float = event.values[1]
        val axisZ: Float = event.values[2]

        val data = ThreeAxisData(0, axisX, axisY, axisZ, System.currentTimeMillis())
        sendEvent(Gson().toJson(data))
    }
}