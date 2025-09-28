require('dotenv').config();
const axios = require('axios')
const { PROTOCOLO_SIMPLES, BASE_URL_COORDENADA, APPID_OPENWEATHER, LIMIT, Q } = process.env

let URL = `${PROTOCOLO_SIMPLES}://${BASE_URL_COORDENADA}?q=${Q}&limit=${LIMIT}&appid=${APPID_OPENWEATHER}`
const promiseResultante = axios.get(URL)

promiseResultante.then((resposta => {
  console.log('=================')
  console.log('Coordenadas\n')
  console.log(`Cidade: ${resposta.data[0].local_names.pt || resposta.data[0].name}`)
  console.log(`Latitude: ${resposta.data[0].lat}`)
  const lat = resposta.data[0].lat
  console.log(`Longitude: ${resposta.data[0].lon}`)
  const lon = resposta.data[0].lon
  console.log('=================')

  condicao(lat, lon)
})).catch(erro => {
  console.log(`Erro na URL: ${erro}`)
})

async function condicao (LAT, LON){
  const { PROTOCOLO_SEGURO, BASE_URL_CONDICAO, UNITS, IDIOM : LANG} = process.env
  URL = `${PROTOCOLO_SEGURO}://${BASE_URL_CONDICAO}?lat=${LAT}&lon=${LON}&units=${UNITS}&lang=${LANG}&appid=${APPID_OPENWEATHER}`
  console.log('=================')
  try{
      const promiseResultante = await axios.get(URL)
      console.log('Condições Climáticas\n')
      console.log(`Descrição: ${promiseResultante.data.weather[0].description}`)
      console.log(`Sensação térmica: ${promiseResultante.data.main.feels_like}°C`)
    }catch(erro){
      console.log(`Erro: ${erro}`)
    }
    console.log('=================')
}