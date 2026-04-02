def positionSwap(position):
    x, y, z = position
    swapPosition = [x, z, y + 0.5]
    return swapPosition


def rotationSwap(rotation):
    _, y, _ = rotation
    swapRotation = [0, 0, y]
    return swapRotation
