import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";

const BASE_URL = "http://localhost:3000/";
// Set a cookie to expire in 1 hour
function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000)); // 1 hour in milliseconds
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



// Get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; //set a time in the past to delete the cookie
}

// Example Usage
export class RepositoryRemoteService extends Service {
    constructor() {
        super();

        //test cookie
        setCookie("myCookie", "myValue");
        console.log("Now delete");
        deleteCookie("myCookie");

    }

    //TODO: add your fetch calls to backend here
    async logIn({ email, password }) {
        try {
            const response = await fetch(BASE_URL + "login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

            if (!response.ok) {
                throw new Error(`/login HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }

            //take the access tokens from response and set it to the headers
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1);
            const data = await response.json();
            const accessToken = data.token;
            setCookie("accessToken", accessToken);
            console.log(`/login ${response.status} ${response.statusText}`);
            //trigger events LogIn Success so that it can switch screen
            this.publish(Events.LogInSuccess);

        }
        catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async register({ email, password, username, primary_time_zone, noti_pref }) {
        try {
            const response = await fetch(BASE_URL + "register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    primary_time_zone: primary_time_zone,
                    notificationPreferences: noti_pref,
                }),
            })
            if (!response.ok) {
                throw new Error(`/register HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }
            console.log(`/register ${response.status} ${response.statusText}`);
        }
        catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    }

    async logOut() {
        try {
            //call the backend endpoint to invalidate the tokens 
            const token = getCookie("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }
            const response = await fetch(BASE_URL + "logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (!response.ok) {
                throw new Error(`/logout HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }
            deleteCookie("accessToken"); //delete token on client end
            console.log(`/logout ${response.status} ${response.statusText}`);
            //trigger  events LogOut Success so that it can switch screen (switch back to LogIn screen)
            this.publish(Events.LogOutSuccess);
        }
        catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const token = getCookie("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }
            const response = await fetch(BASE_URL + "userInfo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (!response.ok) {
                throw new Error(`/getUser HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`/getUser ${response.status} ${response.statusText}`);
            return data;
        }
        catch (error) {
            console.error("Error getting user info:", error);
            throw error;
        }
    }

    async updateUserInfo({ username,
        email,
        primary_time_zone,
        secondary_time_zone,
        notificationPreferences, }) {
        try {
            const token = getCookie("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }
            const response = await fetch(BASE_URL + "userInfo", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    primary_time_zone: primary_time_zone,
                    secondary_time_zone: secondary_time_zone,
                    notificationPreferences: notificationPreferences,
                })
            })
            if (!response.ok) {
                throw new Error(`/updateUser HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`/updateUser ${response.status} ${response.statusText}`);
            return data;
        }
        catch (error) {
            console.error("Error updating user info:", error);
            throw error;
        }
    }


    //TODO: register your events to litseners (to a backend callback) right here
    addSubscriptions() {
        try {
            this.subscribe(Events.LogIn, (data) => {
                this.logIn(data).then((data) => alert("Log In Success")).catch((error) => {
                    console.error(error);
                    alert("Log in failed");
                });
            });

            this.subscribe(Events.LogOut, () => {
                this.logOut().then(data => alert("Log out successfully")).catch((error) => {
                    console.error(error);
                    alert("Log out failed");
                });
            });

            this.subscribe(Events.Register, (data) => {
                this.register(data).then(data => alert("Register Successfully")).catch((error) => {
                    console.error(error);
                });
            });

            this.subscribe(Events.updateProfileSettings, (data) => {
                this.updateUserInfo(data).then(data => alert("Update Profile Successfully")).catch((error) => {
                    console.error(error);
                });
            })

        } catch (error) {
            console.error("Error in addSubscriptions:", error);
            throw error;
        }

    }
}