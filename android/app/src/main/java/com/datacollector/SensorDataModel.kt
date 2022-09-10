package com.datacollector

data class AccData(
    var idx: Int = 0,
    var x: Float = 0.0f,
    var y: Float = 0.0f,
    var z: Float = 0.0f,
    var timestamp: Long = 0
)

data class GyroData(
    var idx: Int =0,
    var x: Float = 0.0f,
    var y: Float = 0.0f,
    var z: Float = 0.0f,
    var timestamp: Long = 0
)

data class ThreeAxisData(
    var idx: Int =0,
    var x: Float = 0.00f,
    var y: Float = 0.00f,
    var z: Float = 0.00f,
    var timestamp: Long = 0
)

data class OneValueData(
    var idx: Int =0,
    var value: Float = 0.00f,
    var timestamp: Long = 0
)

data class RotationVectorData(
    var idx: Int = 0,
    var x: Float = 0.00f,
    var y: Float = 0.00f,
    var z: Float = 0.00f,
    var scalar: Float = 0.00f,
)

