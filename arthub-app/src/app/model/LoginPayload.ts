export default class LoginPayload {
  email!: string;
  password!: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
