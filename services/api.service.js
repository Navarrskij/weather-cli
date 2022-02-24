import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token)
  const area = city ? city : await getKeyValue(TOKEN_DICTIONARY.city)

  if(!token) {
    throw new Error("Token not found. Set token with -t [API_KEY]")
  }
  if(!area) {
    throw new Error("City not found. Set city with -s [CITY]")
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: area,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  })

  return data
}

export { getWeather }