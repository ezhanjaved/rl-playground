import math


def getYaw(euler):
    return euler[2]  # yaw


def getForwardVectorFromYaw(rz):
    x = math.sin(rz)
    y = math.cos(rz)
    return x, y
