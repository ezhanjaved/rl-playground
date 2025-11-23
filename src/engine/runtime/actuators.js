// move/rotate/interact/attack adapters
export default function moveAdapter(action, position) {
    const stepSize = 0.010;
    switch(action) {
        case 'move_up':
            return [position[0], position[1], position[2] - stepSize]
        case 'move_down':
            return [position[0], position[1], position[2] + stepSize]
        case 'move_left':
            return [position[0] - stepSize, position[1], position[2]]
        case 'move_right':
            return [position[0] + stepSize, position[1], position[2]]
        case 'idle':
            return position;
    }
}