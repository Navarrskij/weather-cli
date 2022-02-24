#!/usr/bin/env node

import { getArgs  } from "./helpers/args.js"
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js"
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"
import { getWeather } from "./services/api.service.js"

const saveParams = async (key, value) => {
  if(!value.length) {
    printError(`No ${key}`)
    return
  }
  try {
    await saveKeyValue(key, value)
    printSuccess(`${key} was saved`)
  } catch(e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY)
    printWeather(weather)
  } catch(e) {
    if (e?.response?.status === 404) {
      printError('Wrong city')
    } else if (e?.response?.status === 401) {
      printError('Wrong token')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  
  if(args.h) {
    return printHelp()
  }
  if(args.s) {
    return saveParams(TOKEN_DICTIONARY.city, args.s)
  }
  if(args.t) {
    return saveParams(TOKEN_DICTIONARY.token, args.t)
  }

  return getForecast()
}

initCLI()