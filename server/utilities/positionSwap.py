import pybullet as p


def positionSwap(position):
    x, y, z = position
    return [x, z, y + 0.5]


def rotationSwap(rotation, client_id):
    if len(rotation) == 4:
        euler = p.getEulerFromQuaternion(rotation, physicsClientId=client_id)
        x, y, z = euler
    elif len(rotation) == 3:
        x, y, z = rotation
    else:
        raise ValueError(f"Unexpected rotation format: {rotation}")
    return [0, 0, y]
