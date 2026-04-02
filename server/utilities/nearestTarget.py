import math

from utilities.distance3D import distance3D


def getNearestTargetInfo(agentPos, entities, type):
    best = float("inf")
    targetRadius = 1
    distance = float("inf")

    for entity in entities.values():
        if not entity or type not in entity:
            continue
        targetObjPos = entity.position | [0, 0, 0]
        distance = distance3D(agentPos, targetObjPos)
        if distance < best:
            best = distance
            targetRadius = entity.radius | entity.settings.radius | 1

    if not math.isfinite(best):
        found = False
        return found, distance, targetRadius

    found = True
    return found, distance, targetRadius
