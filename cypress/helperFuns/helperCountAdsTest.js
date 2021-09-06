export function filterProp(adObj,objWin) {
    let allowProp = Object.keys(adObj)
    Object.keys(objWin)
    .filter(key => !allowProp.includes(key))
    .forEach(key => delete objWin[key]);
    return objWin
}