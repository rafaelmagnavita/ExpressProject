function isNullOrEmpty(str){
    if(str === null || str === undefined || str.trim() === ''){
        return true;
    }
    return false;
}
module.exports = isNullOrEmpty;