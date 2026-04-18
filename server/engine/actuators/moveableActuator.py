import pybullet as p

from server.utilities.rotationCal import getForwardVectorFromYaw, getYaw


def moveableActuator(action, pos, rot, speed, id, eM, client):
    bullet_id = eM[id]
    status = body_exist(bullet_id, client)
    speed = float(speed)

    if not status:
        return

    turnSpeed = 0.05
    [rx, ry, rz] = rot
    yaw = getYaw(rot)
    Rx, Ry = getForwardVectorFromYaw(yaw)

    vx = 0
    vy = 0

    match action:
        case "move_up":
            vx = Rx * speed
            vy = Ry * speed

        case "move_down":
            vx = -Rx * speed
            vy = -Ry * speed

        case "move_left":
            rz += turnSpeed
            vx = Rx * speed
            vy = Ry * speed

        case "move_right":
            rz -= turnSpeed
            vx = Rx * speed
            vy = Ry * speed

    p.resetBaseVelocity(
        bullet_id,
        linearVelocity=[vx, vy, 0],
        angularVelocity=[0, 0, 0],
        physicsClientId=client,
    )

    if action in ["move_left", "move_right"]:
        pos, _ = p.getBasePositionAndOrientation(bullet_id, physicsClientId=client)
        new_rot = p.getQuaternionFromEuler([rx, ry, rz], physicsClientId=client)
        p.resetBasePositionAndOrientation(
            bullet_id, pos, new_rot, physicsClientId=client
        )


def body_exist(id, client):
    try:
        p.getBodyInfo(id, physicsClientId=client)
        return True
    except Exception:
        return False
