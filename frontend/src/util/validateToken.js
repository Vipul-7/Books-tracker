import { jwtDecode } from 'jwt-decode';

const isValidToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
}

export default isValidToken;