import chalk from 'chalk'
import dedent from 'dedent-js'
import { getIcon  } from "../helpers/icon.js"


const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = (msg) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg)
}

const printHelp = () => {
  console.log(
    dedent `${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] - для установки города
    -h - для помощи
    -t [API KEY] - для установки токена
    `
  )
}

const printWeather = (data) => {
  console.log(
    dedent `${chalk.yellow(' WEATHER ')} in city ${data.name}
    ${getIcon(data.weather[0].icon)}  ${data.weather[0].description}
    Temp: ${data.main.temp}(feels like: ${data.main.feels_like})
    Humidity: ${data.main.humidity}%
    Wind speed: ${data.wind.speed} km/h
    `
  )
}

export { printError, printSuccess, printHelp, printWeather }