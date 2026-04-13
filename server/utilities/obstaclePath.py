from server.utilities.rotationCal import getForwardVectorFromYaw


def obstacleAvoid(pos, rot, obstaclePos):
    [ax, ay, _] = pos
    [ox, oy, _] = obstaclePos
    [_, _, rz] = rot

    dx = abs(ox - ax)
    dy = abs(oy - ay)

    lookahead = 2
    agentRad = 0.5
    obsRad = 0.5

    forward_x, forward_y = getForwardVectorFromYaw(rz)
    forwardDist = dx * forward_x + dy * forward_y
    if forwardDist <= 0 | forwardDist > lookahead:
        return False
    lateralDist = abs(dx * forward_y - dy * forward_x)
    corridorWidth = agentRad + obsRad
    return lateralDist <= corridorWidth
