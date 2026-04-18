import pybullet as p


def positionSwap(position):
    x, y, z = position
    return [x, z, y + 0.5]


def rotationSwap(quat):
    x, y, z, w = quat
    return [x, z, y, w]
