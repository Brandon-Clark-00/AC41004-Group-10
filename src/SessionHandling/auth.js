//return null if no user is currently logged in otherwise return access_token for current logged in user
export function isLoggedIn() {
    return localStorage.getItem("email")!==null && localStorage.getItem("email")!=="undefined";
}

export function isPhysio() {
    return localStorage.getItem("user_role")!==null && localStorage.getItem("user_role")!=="undefined" && localStorage.getItem("user_role") == "0";
}


//delete token from local storage, used in sign out function
export function deleteTokens(){
    localStorage.removeItem('email');
    localStorage.removeItem('user_role');
    localStorage.removeItem('userID');
}

//if the user is not logged in redirect to pathname (app.js default routed to Login.js component)
export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()){
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

export function redirectUser(){
    if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined)
    {
        if(localStorage.getItem('user_role') !== '0'){
            window.location.replace("/clientlist")
        }
        else{
            window.location.replace("/userpage")
        }
    }
    else{
        window.location.replace("/")
    }
}