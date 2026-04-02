import pybullet as p
import pybullet_data

client = p.connect(p.GUI)
p.setAdditionalSearchPath(pybullet_data.getDataPath())

p.loadURDF("plane.urdf")
robot = p.loadURDF("r2d2.urdf", [0, 0, 0.5])

for _ in range(1000):
    p.stepSimulation()

input("Press Enter to exit...")
p.disconnect()
