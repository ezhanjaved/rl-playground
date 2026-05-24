import time

import pybullet as p
import pybullet_data


def make_box(pos, color, size=0.3):
    col = p.createCollisionShape(p.GEOM_BOX, halfExtents=[size, size, size])
    vis = p.createVisualShape(
        p.GEOM_BOX,
        halfExtents=[size, size, size],
        rgbaColor=color,
    )
    return p.createMultiBody(
        baseMass=0,
        baseCollisionShapeIndex=col,
        baseVisualShapeIndex=vis,
        basePosition=pos,
    )


def add_label(text, pos):
    p.addUserDebugText(
        text,
        pos,
        textSize=1.4,
        lifeTime=0,
    )


p.connect(p.GUI)
p.setAdditionalSearchPath(pybullet_data.getDataPath())
p.setGravity(0, 0, -9.8)

p.loadURDF("plane.urdf")

# Draw PyBullet world axes
p.addUserDebugLine([0, 0, 0], [5, 0, 0], [1, 0, 0], lineWidth=4)  # +X red
p.addUserDebugLine([0, 0, 0], [0, 5, 0], [0, 1, 0], lineWidth=4)  # +Y green
p.addUserDebugLine([0, 0, 0], [0, 0, 5], [0, 0, 1], lineWidth=4)  # +Z blue

add_label("+X", [5.2, 0, 0])
add_label("+Y", [0, 5.2, 0])
add_label("+Z / UP", [0, 0, 5.2])

# Origin
make_box([0, 0, 0.2], [1, 1, 1, 1], size=0.2)
add_label("Origin [0,0,0]", [0, 0, 0.8])

# PyBullet coordinate examples
make_box([2, 0, 0.2], [1, 0, 0, 1])
add_label("[+X, 0, 0] right", [2, 0, 0.8])

make_box([-2, 0, 0.2], [1, 0, 0, 1])
add_label("[-X, 0, 0] left", [-2, 0, 0.8])

make_box([0, 2, 0.2], [0, 1, 0, 1])
add_label("[0, +Y, 0] forward/ahead", [0, 2, 0.8])

make_box([0, -2, 0.2], [0, 1, 0, 1])
add_label("[0, -Y, 0] back", [0, -2, 0.8])

make_box([0, 0, 2], [0, 0, 1, 1])
add_label("[0, 0, +Z] up", [0, 0, 2.6])

# Your Playground sample
agent_client = [0.11054515643922347, 0, 0.22455959513946588]
target_client = [10.056723880834873, 0, 9.512995743479518]


def client_to_bullet(pos):
    x, y, z = pos
    return [-x, z, y]


agent_bullet = client_to_bullet(agent_client)
target_bullet = client_to_bullet(target_client)

# Lift slightly so visible above plane
agent_bullet[2] = 0.3
target_bullet[2] = 0.3

make_box(agent_bullet, [1, 1, 0, 1], size=0.35)
add_label("Agent from client", [agent_bullet[0], agent_bullet[1], 1.0])

make_box(target_bullet, [1, 0, 1, 1], size=0.35)
add_label("Target from client", [target_bullet[0], target_bullet[1], 1.0])

p.addUserDebugLine(
    agent_bullet,
    target_bullet,
    [1, 1, 0],
    lineWidth=3,
)

print("Client agent:", agent_client)
print("Client target:", target_client)
print("Bullet agent:", agent_bullet)
print("Bullet target:", target_bullet)

dx_client = target_client[0] - agent_client[0]
dz_client = target_client[2] - agent_client[2]

dx_bullet = target_bullet[0] - agent_bullet[0]
dy_bullet = target_bullet[1] - agent_bullet[1]

print()
print("Client dx:", dx_client, "positive = left in your Playground")
print("Client dz:", dz_client, "positive = ahead in your Playground")
print("Bullet dx:", dx_bullet)
print("Bullet dy:", dy_bullet)
print()
print("Client-style OBS from Bullet:")
print("obs_dx_left_positive =", -dx_bullet)
print("obs_dy_ahead_positive =", dy_bullet)

p.resetDebugVisualizerCamera(
    cameraDistance=14,
    cameraYaw=45,
    cameraPitch=-60,
    cameraTargetPosition=[0, 0, 0],
)

while True:
    p.stepSimulation()
    time.sleep(1 / 60)
