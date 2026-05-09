import math

from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap


def getNearestTargetInfo(agentPos, entities, type):
    best = float("inf")
    targetRadius = 1.5
    distance = float("inf")

    for entity in entities.values():
        if not entity or getattr(entity, "tag", None) != type:
            continue
        targetObjPos = entity.position
        bulletPos = positionSwap(targetObjPos)
        distance = distance3D(agentPos, bulletPos)
        if distance < best:
            best = distance
            targetRadius = (
                getattr(entity, "radius", None)
                or getattr(getattr(entity, "settings", None), "radius", None)
                or 1.5
            )

    if not math.isfinite(best):
        found = False
        return found, float("-inf"), targetRadius

    found = True
    return found, best, targetRadius
