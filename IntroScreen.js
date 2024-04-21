import axios from 'axios';

const fetchUserData = async () => {
    try {
      const token = await getValueFromSecureStore('access_token')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_AUTH_URL}/propelauth/oauth/userinfo`, {headers:headers});
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetchUserData, then display user data 