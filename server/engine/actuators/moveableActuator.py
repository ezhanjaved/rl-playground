import pybullet as p
from utilities.rotationCal import getForwardVectorFromYaw, getYaw


def moveableActuator(action, pos, rot, speed, id, eM):
    bullet_id = eM[id]
    status = body_exist(bullet_id)

    if not status:
        print("Body does not exist in Physics Engine")
        return

    turnSpeed = 0.05
    euler = p.getEulerFromQuaternion(rot)
    [rx, ry, rz] = euler
    yaw = getYaw(euler)
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
        bullet_id, linearVelocity=[vx, vy, 0], angularVelocity=[0, 0, 0]
    )

    if action in ["move_left", "move_right"]:
        pos, _ = p.getBasePositionAndOrientation(bullet_id)
        new_rot = p.getQuaternionFromEuler([rx, ry, rz])
        p.resetBasePositionAndOrientation(bullet_id, pos, new_rot)


def body_exist(id):
    try:
        p.getBodyInfo(id)
        return True
    except Exception:
        return False
