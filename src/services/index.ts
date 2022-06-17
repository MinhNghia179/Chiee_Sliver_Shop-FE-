import axios from "axios";
import { API_URL } from "config/constants";


const client = axios.create({
    baseURL: API_URL,
    timeout: 20000,
});
client.interceptors.request.use(
    async (config:any) => {
        if (config.method == 'get') {
            const currentTime = new Date().getTime();
            const oldUrl:any = config.url
            let newUrl = config.url;
            if (oldUrl.includes('?')) {
                newUrl = `${oldUrl}`
            } else {
                newUrl = `${oldUrl}`
            }
            config.url = newUrl;
        }
        
        const accessToken = localStorage.getItem('accessToken')
        const cloneConfig = { ...config };
        if (accessToken) {
            cloneConfig.headers.authorization = `Bearer ${accessToken}`;
        }

        return cloneConfig;
    },
    error => {
      Promise.reject(error)
    },
);

client.interceptors.response.use(
    response => response,
    error => responseErrorHandler(error),
);

const responseErrorHandler = async (error: any) => {
  // if (error?.response?.status === 401 && !error?.response?.config?.url.includes('login')) {
  //   alert('Phiên làm việc của bạn đã kết thúc, đề nghị đăng nhập lại');
  //   setTimeout(() => {
  //     history.push('/logout');
  //   }, 1000);
  // } else if (error?.code === 'ECONNABORTED') {
  //   alertError(ERROR_TIMEOUT);
  // } else {
  //   alertError(error?.response?.data?.message || ERROR_TIMEOUT);
  // }
  // return Promise.reject(error?.response?.data || '');

}

export default client;
