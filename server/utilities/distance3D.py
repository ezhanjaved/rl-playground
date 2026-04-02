import math



def distance3D(posA, posB):
    dx = posA[0] - posB[0]
    dy = posA[1] - posB[1]
    dz = posA[2] - posB[2]

    dist = math.sqrt(dx * dx + dy * dy + dz * dz)

    return dist
