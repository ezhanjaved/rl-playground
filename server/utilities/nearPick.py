from server.objectClass.entitiesClass import Object
from server.utilities.distance3D import distance3D


def nearbyPickable(entities, position, pickRadius, cap):
    agentIsHolder = False
    itemVal = Object
    minDist = float("inf")
    if "Holder" in cap:
        agentIsHolder = True
    for ent_value in entities.values():
        pickStatus = getattr(ent_value, "isPickable", False)
        if not pickStatus:
            continue
        if not agentIsHolder:
            collectStatus = getattr(ent_value, "isCollectable", False)
            if not collectStatus or collectStatus == "false":
                return False
        # I had to swap y & z value of entitiy, because while it was swapped at the time of spawning - it was never written back to runTimeState - so runTime State ent.pos value is unswapped (same as Three.js)
        x, y, z = ent_value.position
        new_ent = [x, z, y]
        dist = distance3D(position, new_ent)
        if dist < minDist:
            itemVal = ent_value
            minDist = dist
    if minDist <= pickRadius:
        return itemVal
    else:
        return False
