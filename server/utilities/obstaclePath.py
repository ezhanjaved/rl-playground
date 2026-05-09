from server.utilities.positionSwap import positionSwap
from server.utilities.rotationCal import getForwardVectorFromYaw


def obstacleAvoid(pos, rot, obstaclePos):
    swappedPos = positionSwap(obstaclePos)
    [ax, ay, _] = pos
    [ox, oy, _] = swappedPos
    [rx, ry, rz] = rot

    dx = abs(ox - ax)
    dy = abs(oy - ay)

    lookahead = 3
    agentRad = 0.5
    obsRad = 0.8

    forward_x, forward_y = getForwardVectorFromYaw(rz)
    forwardDist = dx * forward_x + dy * forward_y
    print("Forward X: ", forward_x, " Forward Y: ", forward_y, " RZ: ", rz)
    print("Forward Dist: ", forwardDist)
    if forwardDist <= 0 or forwardDist > lookahead:
        return False
    lateralDist = abs(dx * forward_y - dy * forward_x)
    corridorWidth = agentRad + obsRad
    return lateralDist <= corridorWidth
