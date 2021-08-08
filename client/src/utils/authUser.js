const isLogin = () => {
  if (localStorage.getItem("profile")) return true;

  return false;
};

export default isLogin;
