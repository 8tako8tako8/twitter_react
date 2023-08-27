/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

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
  }),
  options
)

export default client
