from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap


def nearbyPickable(entities, position, pickRadius, cap):
    agentIsHolder = False
    itemVal = None
    minDist = float("inf")

    if "Holder" in cap:
        agentIsHolder = True

    for ent_value in entities.values():
        pickStatus = getattr(ent_value, "isPickable", False)

        if not pickStatus:
            continue

        if not agentIsHolder:
            collectStatus = getattr(ent_value, "isCollectable", False)

            # Skip bad entities instead of aborting
            if not collectStatus or collectStatus == "false":
                continue

        # Runtime state position fix
        bulletPos = positionSwap(ent_value.position)

        dist = distance3D(position, bulletPos)

        if dist < minDist:
            itemVal = ent_value
            minDist = dist
    if minDist <= pickRadius:
        return itemVal

    return False
