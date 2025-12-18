export default function discretize(obsVector) {
    const xValue = obsVector[0];
    const zValue = obsVector[2];
    
    const gridSize = 1;
    const xPosBin = Math.floor(xValue/gridSize);
    const zPosBin = Math.floor(zValue/gridSize);

    const yRot = obsVector[4];
    const yRotBin = rotationBin(yRot);

    const distBin = obsVector[6] >= 1e8 ? "NONE" : distanceBin(obsVector[6])

    return `posX:${xPosBin}|posZ:${zPosBin}|rotY:${yRotBin}|distToTarget:${distBin}`

}

function rotationBin(rot) {
    const TWO_PI = 2  * Math.PI;
    const normalizedRot = ((rot % TWO_PI) + TWO_PI) % (TWO_PI)
    const binSize = (TWO_PI/8);
    return Math.floor (normalizedRot/binSize);
}

function distanceBin(distance) {
    if (distance < 1) {
        return 'VERY_NEAR'
    } else if (distance < 3) {
        return 'NEAR'
    } else if (distance < 6) {
        return 'MEDIUM'
    } else if(distance < 10) {
        return 'FAR'
    } else {
        return 'VERY_FAR'
    }
} 