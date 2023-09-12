import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'
import Cookies from 'js-cookie'

const options = {
  // ヘッダーに関してはケバブケースのまま
  ignoreHeaders: true,
}

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_LOCAL

const client = applyCaseMiddleware(
  axios.create({
    baseURL: API_URL,
    headers: {
      uid: Cookies.get('_uid'),
      client: Cookies.get('_client'),
      'access-token': Cookies.get('_access_token'),
    },
  }),
  options
)

export default client
