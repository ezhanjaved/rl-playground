export default function discretize(obsVector) {
    const distXbinT = obsVector[0] >= 1e8 ? "NONE" : distanceXBin(obsVector[0]);
    const distZbinT = obsVector[1] >= 1e8 ? "NONE" : distanceZBin(obsVector[1]);
    const distBinT = obsVector[0] >= 1e8 ? "NONE" : distanceBin(obsVector[2]);
        
    const distXbinC = obsVector[3] >= 1e8 ? "NONE" : distanceXBin(obsVector[3]);
    const distZbinC = obsVector[4] >= 1e8 ? "NONE" : distanceZBin(obsVector[4]);
    const distBinC = obsVector[5] >= 1e8 ? "NONE" : distanceBin(obsVector[5]);
    const itemsCollectBin = itemsBin(obsVector[6]);
    
    return `distX-T:${distXbinT}|distZ-T:${distZbinT}|distToTarget:${distBinT}|distX-C:${distXbinC}|distZ-C:${distZbinC}|distToCollect:${distBinC}|itemCollection:${itemsCollectBin}`
}

function distanceXBin(distance) {
    if (distance < 0) { //LEFT
        return "LEFT"
    } else if (distance > 1) { //RIGHT
        return "RIGHT"
    } else if (distance >= 0 && distance <= 1) { //CENTER
        return "CENTER"
    } else { //NONE
        return "NOT_FOUND"
    }
}

function distanceZBin(distance) {
    if (distance < 0) { //UP
        return "UP"
    } else if (distance > 1) { //DOWN
        return "DOWN"
    } else if (distance >= 0 && distance <= 0) { //CENTER
        return "CENTER"
    } else { //NONE
        return "NOT_FOUND"
    }
}

function distanceBin(distance) {
    if (distance < 3) {
        return 'VERY_NEAR'
    } else if (distance > 3 && distance < 6) {
        return 'NEAR'
    } else if (distance > 6 && distance < 12) {
        return 'MEDIUM'
    } else if(distance > 12) {
        return 'FAR'
    } else {
        return 'VERY_FAR'
    }
} 

function itemsBin(item) {
    if (item !== 0 && item <= 3) {
        return 'FEW'
    } else if (item > 3 && item < 9) {
        return "HANDFUL"
    } else if (item > 9 && item < 27) {
        return "MANY"
    }   else {
        return "NONE"
    }
}