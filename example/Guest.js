import Proto from '../domain/core/proto/Proto.js';
const Guest = function(email = '') {

    this.validations = ['a'];
    this.email = email;

    this.a = function() {
        return 1;
    }

    this.computed = {
        'email': function(value) {
            console.log('execute');
            return 'email: ' + value;
        }
    }
}

Guest.prototype = Proto;

export default Guest;