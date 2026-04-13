import math


def distance3D(posA, posB):
    dx = abs(posA[0] - posB[0])
    dy = abs(posA[1] - posB[1])
    dz = abs(posA[2] - posB[2])

    dist = math.sqrt(dx * dx + dy * dy + dz * dz)

    return dist
