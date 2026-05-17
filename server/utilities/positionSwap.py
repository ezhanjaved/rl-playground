def positionSwap(position):
    x, y, z = position
    return [-x, z, y]


def rotationSwap(quat):
    x, y, z, w = quat
    return [-x, z, y, w]
