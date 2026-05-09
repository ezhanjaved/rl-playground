def positionSwap(position):
    x, y, z = position
    scale = 1.0
    return [-x * scale, z * scale, y]


def rotationSwap(quat):
    x, y, z, w = quat
    return [-x, z, y, w]
