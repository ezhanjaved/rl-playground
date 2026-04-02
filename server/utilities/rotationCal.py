import math


def getYaw(rot):
    return rot[2]


def getForwardVectorFromYaw(rz):
    x = math.sin(rz)
    y = math.cos(rz)
    return x, y
