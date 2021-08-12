const isIterable = (value) => {
    if (value == null) {
        return false;
    }
    
    return typeof value[Symbol.iterator] === 'function';
}

export default isIterable;