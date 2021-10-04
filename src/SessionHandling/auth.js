//return null if no user is currently logged in otherwise return access_token for current logged in user
export function isLoggedIn() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined";
}

//delete token from local storage, used in sign out function
export function deleteTokens(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
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