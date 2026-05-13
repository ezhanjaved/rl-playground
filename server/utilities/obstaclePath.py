from server.utilities.positionSwap import positionSwap
from server.utilities.rotationCal import getForwardVectorFromYaw


def obstacleAvoid(pos, rot, obstaclePos):
    swappedPos = positionSwap(obstaclePos)
    [ax, ay, _] = pos
    [ox, oy, _] = swappedPos
    [rx, ry, rz] = rot

    dx = -(ox - ax)  # X flip for coordinate convention
    dy = oy - ay

    lookahead = 3
    agentRad = 0.5
    obsRad = 0.8

    forward_x, forward_y = getForwardVectorFromYaw(rz)
    forwardDist = dx * forward_x + dy * forward_y
    if forwardDist <= 0 or forwardDist > lookahead:
        return False
    lateralDist = abs(dx * forward_y - dy * forward_x)
    corridorWidth = agentRad + obsRad
    return lateralDist <= corridorWidth
