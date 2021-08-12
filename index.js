import Guest from './example/Guest.js';

document.addEventListener('DOMContentLoaded', () => {
    let guest = new Guest('guest@gmail.com');
    guest.createObservables()
    console.log(guest.email, guest);
    // console.log(guest, guest.getEmail());
})