import isIterable from '../helpers/checkers/IsIterable.js';

const Proto = {
    observables: {}
};

const reservedKeywords = [
    'computed' 
]

const getProperties = (context) => {
    return Object.getOwnPropertyNames(context).filter((value) => {
        return typeof context[value] != 'function' 
            && reservedKeywords.indexOf(value) == -1;
    });
}

const applyComputed = (context, propertie) => {
    if (!context.computed || !propertie) {
        return '';
    }

    if (typeof context.computed[propertie] != 'function') {
        return '';
    }

    const fn = context.computed[propertie];
    const value = fn(context.observables['$' + propertie]);
    return value;
}

const parseProperties = (context, properties) => {
    if (!isIterable(properties)) {
        throw new Error('Properties are not interable')
    }

    properties.forEach((propertie) => {
        context.observables['$' + propertie] = context[propertie];
        Object.defineProperty(context, propertie, {
            get: function() {
                const parsedPropertie = applyComputed(
                    context, propertie
                );

                if (parsedPropertie) {
                    return parsedPropertie;
                }

                return context.observables['$' + propertie];
            },

            set: function(value) {
                context.observables['$' + propertie] = value;
            }
        });
    });
}

Proto.createObservables = function() {
    const properties = getProperties(this);
    parseProperties(this, properties);
}

export default Proto;