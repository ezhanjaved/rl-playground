import math


def is_aligned_to_goal(delta_x_to_goal, delta_y_to_goal, max_angle_degrees=20):
    distance = math.hypot(delta_x_to_goal, delta_y_to_goal)

    if distance < 1e-6:
        return True

    alignment = delta_y_to_goal / distance

    required_alignment = math.cos(math.radians(max_angle_degrees))

    return alignment >= required_alignment


def ball_to_goal(
    delta_x_to_ball,
    delta_z_to_ball,
    delta_x_to_goal,
    delta_z_to_goal,
    mode,
):
    dx = delta_x_to_goal - delta_x_to_ball
    dz = delta_z_to_goal - delta_z_to_ball

    distance = math.hypot(dx, dz)

    if mode == "distance-only":
        return distance

    if mode == "danger-check":
        return distance < 0.08

    return None
