function passwordValidation(password, req) {
    if(password.length < 8) {
        req.flash('error', 'Password must be at least 8 symbols.');
        return false;
    } else if(password.length > 20) {
        req.flash('error', 'Password too long.');
        return false;
    }
    return true;
}

function validateUsername(username, req) {
    if(username.length < 8) {
        req.flash('error', 'Username must be at least 8 symbols.');
        console.log(req);
        return false;
    } else if(username.length > 20) {
        req.flash('error', 'Username is too long.');
        return false;
    }
    return true;
}

function validateEmail(email, req) {
    if(email.length > 200) {
        req.flash('error', `E-mail couldn't be so long.`);
        return false; 
    } else if(!/.+@.+/.test(email)) {
        req.flash('error', `Incorrect format.`);
        return false;
    }
    return true;
}

module.exports = { passwordValidation, validateUsername, validateEmail};