import math

from server.utilities.distance3D import distance3D


def getNearestTargetInfo(agentPos, entities, type):
    best = float("inf")
    targetRadius = 1
    distance = float("inf")

    for entity in entities.values():
        if not entity or getattr(entity, "tag", None) != type:
            continue
        targetObjPos = entity.position
        distance = distance3D(agentPos, targetObjPos)
        if distance < best:
            best = distance
            targetRadius = (
                getattr(entity, "radius", None)
                or getattr(getattr(entity, "settings", None), "radius", None)
                or 1
            )

    if not math.isfinite(best):
        found = False
        return found, float("-inf"), targetRadius

    found = True
    return found, best, targetRadius
