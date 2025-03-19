import axios from "axios";
import secureStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

const burl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: burl,
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

const refreshToken = async () => {
    try {
        isRefreshing = true;
        const response = await axios.get(`${burl}/refresh-token`);
        const { token } = response.data;
        secureStorage.setItem("access_token", token);
        onRefreshed(token);
        return token;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        secureStorage.removeItem("access_token");
        window.location.href = "/login"; // Redirect jika gagal refresh
        return null;
    } finally {
        isRefreshing = false;
    }
};

// **Interceptor untuk menangani request**
api.interceptors.request.use(async (request) => {
    let token: any = secureStorage.getItem("access_token");

    if (token) {
        const decoded: any = jwtDecode(token);

        if (decoded.exp < Date.now() / 1000) {
            if (!isRefreshing) {
                token = await refreshToken();
            } else {
                token = await new Promise<string>((resolve) => {
                    subscribeTokenRefresh(resolve);
                });
            }
        }
    }

    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
});

// **Interceptor untuk menangani response error**
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Jika error karena token expired
        if (error.response && error.response.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                const newToken = await refreshToken();

                if (newToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return api(originalRequest); // Jalankan ulang request dengan token baru
                }
            }

            // Jika refresh token gagal, hapus token dan redirect ke login
            secureStorage.removeItem("access_token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;