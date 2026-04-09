from server.objectClass.entitiesClass import Object
from server.utilities.distance3D import distance3D


def nearbyPickable(entities, position, pickRadius, cap):
    agentIsHolder = False
    itemVal = Object
    minDist = float("inf")
    if "Holder" in cap:
        agentIsHolder = True
        print("Agent is Holder")
    for ent_value in entities.values():
        pickStatus = getattr(ent_value, "isPickable", False)
        if not pickStatus:
            return False
        if not agentIsHolder:
            print("Agent is Collector")
            collectStatus = getattr(ent_value, "isCollector", False)
            if not collectStatus or collectStatus == "false":
                print("Item was not collectable")
                return False
        dist = distance3D(position, ent_value.position)
        if dist < minDist:
            itemVal = ent_value
            minDist = dist
    if minDist <= pickRadius:
        return itemVal
    else:
        return False
