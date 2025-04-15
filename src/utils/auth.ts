export const isLoggedIn = () => !!localStorage.getItem("token");
export const saveToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};