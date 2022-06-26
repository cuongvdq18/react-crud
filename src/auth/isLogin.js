const TOKEN_KEY = "jwt";

export const isLogin = () => {
  if (localStorage.getItem("token", TOKEN_KEY)) {
    return true;
  }
  return false;
};
