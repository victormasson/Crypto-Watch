import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'
import { Key } from '../../key'
import { constructionNomicsApi } from "../../constants";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST'],
  })
)

export default async function handler(req, res) {
  await cors(req, res)

  if (!Key.TokenNomics) {
    res.status(400)
      .json({ msg: 'Error key' })
  }

  try {
    if (req.query.currency) {
      const { currency } = req.query
      const cryptoRequest = currency ? currency.toUpperCase() : 'BTC'
      const url = constructionNomicsApi(`currencies?key=${Key.TokenNomics}&ids=${cryptoRequest}&attributes=id,name,logo_url,description,reddit_url`)
      const resFetch = await fetch(url)
      const data = await resFetch.json()
      const crypto = data[0]

      res.status(200)
        .json(crypto)
    } else if (req.query.currencies) {
      const { currencies } = req.query
      const listCryptoRequest = currencies ? currencies.toUpperCase() : 'BTC,ETH,AAVE'
      const url = constructionNomicsApi(`currencies/ticker?key=${Key.TokenNomics}&ids=${listCryptoRequest}&interval=1d,30d,365d&convert=EUR&per-page=100&page=1`)
      const resFetch = await fetch(url)
      const data = await resFetch.json()

      res.status(200)
        .json(data)
    }
    else {
      const url = constructionNomicsApi(`currencies?key=${Key.TokenNomics}&attributes=id,name,logo_url`)
      const resFetch = await fetch(url)
      const resJson = await resFetch.json()
      const data = resJson.filter(l => l.logo_url !== '' || l.name !== '' || l.id !== '')

      res.status(200)
        .json(data)
    }
  } catch (error) {
    res.status(400)
      .json({ msg: 'Error', error })
  }
}