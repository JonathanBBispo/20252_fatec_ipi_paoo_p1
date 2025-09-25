require('dotenv').config();
const express = require('express')
const axios = require('axios')
const { PROTOCOLO_SIMPLES, BASE_URL_COORDENADA, APPID_OPENWEATHER, LIMIT, Q } = process.env

let URL = `${PROTOCOLO_SIMPLES}://${BASE_URL_COORDENADA}?q=${Q}&limit=${LIMIT}&appid=${APPID_OPENWEATHER}`
const promiseResultante = axios.get(URL)

promiseResultante.then((resposta => {
  console.log(`Cidade: ${resposta.data[0].local_names.pt || resposta.data[0].name}`)
  console.log(`Latitude: ${resposta.data[0].lat}`)
  console.log(`Longitude: ${resposta.data[0].lon}`)
})).catch(erro => {
  console.log(`Erro na URL: ${erro}`)
})