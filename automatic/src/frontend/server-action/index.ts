import { authService } from "../port";

function loginAction() {
  authService.login();
}

loginAction();
