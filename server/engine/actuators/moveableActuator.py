import pybullet as p

from server.utilities.rotationCal import getForwardVectorFromYaw, getYaw


def moveableActuator(action, pos, rot, speed, id, eM, client):
    bullet_id = eM[id]
    if not body_exist(bullet_id, client):
        return

    turnSpeed = 0.05
    print("Speed: ", speed)

    _, quat = p.getBasePositionAndOrientation(bullet_id, physicsClientId=client)
    rot = p.getEulerFromQuaternion(quat, physicsClientId=client)
    yaw = getYaw(rot)
    Rx, Ry = getForwardVectorFromYaw(yaw)

    vx, vy = 0.0, 0.0
    wz = 0.0

    match action:
        case "move_up":
            vx = Rx * float(speed)
            vy = Ry * float(speed)
        case "move_left":
            wz = turnSpeed
        case "move_right":
            wz = -turnSpeed
        case "idle":
            vx = 0
            vy = 0

    p.resetBaseVelocity(
        bullet_id,
        linearVelocity=[vx, vy, 0],
        angularVelocity=[0, 0, wz],
        physicsClientId=client,
    )


def body_exist(id, client):
    try:
        p.getBodyInfo(id, physicsClientId=client)
        return True
    except Exception:
        return False
