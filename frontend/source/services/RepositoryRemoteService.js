import Service from "./Service";
import { Events } from "../eventhub/Events.js";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/";

export class RepositoryRemoteService extends Service {
    constructor() {
        super();
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
                throw new Error(`HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }

            //take the access tokens from response and set it to the headers
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHoursetHours() + 1);
            const data = await response.json();
            accessToken = data.token;
            Cookies.set("accessToken", accessToken, { expires: expirationDate });
            console.log(`/login ${response.status} ${response.statusText}`);
            //trigger events LogIn Success so that it can switch screen
            //TODO:
            this.publish(Events.LoginSuccess, {});

        }
        catch {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async register({ email, password, username, primary_time_zone }) {
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
                }),
            })
            if (!response.ok) {
                throw new Error(`HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
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
            //call the backend endpoint to invalidate the tokens first
            const token = Cookies.get("accessToken");
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
                throw new Error(`HTTP Status: ${response.status}, HTTP Status Text: ${response.statusText}`);
            }
            console.log(`/logout ${response.status} ${response.statusText}`);
            //trigger  events LogOut Success so that it can switch screen (switch back to LogIn screen)
            //TODO:
            this.publish(Events.LogOutSuccess, {});
        }
        catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }


    //TODO: register your events to litseners (to a backend callback) right here
    addSubscriptions() {
        try {
            this.subscribe(Events.LogIn, (data) => {
                this.logIn(data).catch((error) => {
                    console.error(error);
                });
            });

            this.subscribe(Events.LogOut, () => {
                this.logOut().catch((error) => {
                    console.error(error);
                });
            });

            this.subscribe(Events.Register, (data) => {
                this.register(data).catch((error) => {
                    console.error(error);
                });
            });
        } catch (error) {
            console.error("Error in addSubscriptions:", error);
            throw error;
        }

    }
}