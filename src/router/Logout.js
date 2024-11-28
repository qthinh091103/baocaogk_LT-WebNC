const logout = () => {
  localStorage.removeItem("token");
  alert("Đã đăng xuất thành công!");
  window.location.href = "/login";
};
