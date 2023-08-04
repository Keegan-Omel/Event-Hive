// IMPORT THE "decode" FUNCTION FROM "jwt-decode" LIBRARY TO DECODE JWT TOKENS
import decode from "jwt-decode";

// CREATE A NEW CLASS FOR USER AUTHENTICATION SERVICE
class AuthService {
  // METHOD TO GET USER PROFILE FROM DECODED TOKEN
  getProfile() {
    return decode(this.getToken()); // DECODES THE STORED TOKEN AND RETURNS USER PROFILE
  }

  // METHOD TO CHECK IF USER IS LOGGED IN
  loggedIn() {
    // CHECKS IF A SAVED TOKEN EXISTS AND WHETHER IT'S STILL VALID
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // RETURNS TRUE IF TOKEN EXISTS AND IS NOT EXPIRED
    // NOTE: THIS CODE USES HANDWAIVING (ASSUMPTION) FOR TOKEN VALIDITY CHECK. FOR PRODUCTION, USE A ROBUST VALIDATION.
  }

  // METHOD TO CHECK IF TOKEN IS EXPIRED
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // COMPARES THE TOKEN'S "exp" CLAIM WITH THE CURRENT TIME IN SECONDS
      if (decoded.exp < Date.now() / 1000) {
        return true; // RETURNS TRUE IF TOKEN HAS EXPIRED
      } else return false; // OTHERWISE, RETURNS FALSE
    } catch (err) {
      return false; // RETURNS FALSE IF THERE IS AN ERROR DECODING THE TOKEN
    }
  }

  // METHOD TO RETRIEVE THE USER TOKEN FROM LOCAL STORAGE
  getToken() {
    return localStorage.getItem("id_token"); // RETRIEVES THE "id_token" FROM LOCAL STORAGE
  }

  // METHOD TO SAVE USER TOKEN TO LOCAL STORAGE AND REDIRECT TO HOMEPAGE AFTER LOGIN
  login(idToken) {
    localStorage.setItem("id_token", idToken); // SAVES THE TOKEN TO LOCAL STORAGE WITH KEY "id_token"
    window.location.assign("/"); // REDIRECTS THE USER TO THE HOMEPAGE AFTER LOGIN
  }

  // METHOD TO LOGOUT THE USER
  logout() {
    localStorage.removeItem("id_token"); // REMOVES THE "id_token" FROM LOCAL STORAGE
    window.location.assign("/"); // REDIRECTS THE USER TO THE HOMEPAGE FOR LOGOUT EFFECT
  }
}

// EXPORT AN INSTANCE OF THE "AuthService" CLASS
export default new AuthService();
