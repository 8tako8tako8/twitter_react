/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  // ヘッダーに関してはケバブケースのまま
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3100/api/v1',
  }),
  options
)

export default client
