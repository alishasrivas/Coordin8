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
                method: "POST,",
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
        }
        catch {
            console.error("Error logging in:", error);
            throw error;
        }

    }


    //TODO: register your events to litseners (to a backend callback) right here
    addSubscriptions() {


    }
}