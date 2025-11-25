// move/rotate/interact/attack adapters
export default function moveAdapter(action, position, rotation) {
    let stepSize = 0.010;
    let turnSpeed = 0.05;

    let [x, y, z] = position;
    let [rx, ry, rz] = rotation;

    const dirX = Math.sin(ry); //sin(0) is 0 //sin(90) is 1
    const dirZ = Math.cos(ry); //cos(0) is 1 //cos(90) is 0

    switch (action) {
        case 'move_up':
            x += dirX * stepSize;
            z += dirZ * stepSize;
            break;
        case 'move_down':
            x -= dirX * stepSize;
            z -= dirZ * stepSize;
            break;
        case 'move_left':
            ry += turnSpeed;
            x += dirX * stepSize;
            z += dirZ * stepSize;
            break;
        case 'move_right':
            ry -= turnSpeed;
            x += dirX * stepSize;
            z += dirZ * stepSize;
            break;
        case 'idle':
            break;
        default:
            break;
    }

    return { updatedPosition: [x, y, z], updatedRotation: [rx, ry, rz] };

}