import pybullet as p


def positionSwap(position):
    x, y, z = position
    swapPosition = [x, z, y + 0.5]
    return swapPosition


def rotationSwap(rotation):
    if len(rotation) == 4:
        euler = p.getEulerFromQuaternion(rotation)
        x, y, z = euler
    elif len(rotation) == 3:
        x, y, z = rotation
    else:
        raise ValueError(f"Unexpected rotation format: {rotation}")

    return [0, 0, y]
