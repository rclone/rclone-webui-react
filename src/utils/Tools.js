export function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function bytesToMB(bytes) {
    if (bytes === 0) return 0;
    const mb = bytes / 1024;
    const MB = mb / 8;
    return MB.toFixed(2);
}

export function bpsToMbps(bps) {
    if (bps === 0) return 0;
    const mbps = bps / 1024;
    return mbps.toFixed(2);
}

export function secondsToMinutesHourString(seconds) {
    if (seconds === 0) {
        return `0 Hr 0 min 0 sec`;
    }
    let minutes = seconds / 60;
    seconds = seconds % 60;
    let hours = minutes / 60;
    minutes = minutes % 60;

    return `${Math.round(hours)}:${Math.round(minutes)}:${Math.round(seconds)} hrs`;
}

export default isEmpty;