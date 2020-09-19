import { User as UserModel } from "../models/user";
import CONFIG from "../config/config";

export class User {
  static saveUser(user: UserModel) {
    return fetch(CONFIG.apiPath + "/user/save", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        imageUrl: user.getImageUrl(),
        isLoggedIn: user.getIsLoggedIn()
      })
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  static updateLoginStatus(user: UserModel) {
    return fetch(CONFIG.apiPath + "/user/login/status/" + user.getId(), {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
  }
}
