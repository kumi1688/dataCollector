package com.datacollector

data class ThreeAxisData(
    var x: Float = 0.00f,
    var y: Float = 0.00f,
    var z: Float = 0.00f,
    var timestamp: Long = 0
)

data class OneValueData(
    var value: Float = 0.00f,
    var timestamp: Long = 0
)

data class RotationVectorData(
    var x: Float = 0.00f,
    var y: Float = 0.00f,
    var z: Float = 0.00f,
    var scalar: Float = 0.00f,
)

