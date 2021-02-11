import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Layout from "../components/layout"
import { constructionNomicsApi, constructionTitle, Constants } from "../constants";
import { Key } from '../key'
import { Icons } from '../icons'

export default function Home({ res, initListCrypto = [] }) {
  const namePage = '🏠'
  const title = constructionTitle(namePage)
  const [isMounted, setIsMounted] = useState(false);
  const [listCrypto, setListCrypto] = useState(initListCrypto)
  useEffect(() => {
    let mounted = true
    if (mounted) {
      LoadAll({ setListCrypto })

    }
    return () => mounted = false
  }, [])

  return (
    <Layout page={title}>
      <ul className="flex justify-around py-10 flex-wrap">
        {!listCrypto ? '' : listCrypto.map((crypto, index) => (
          <li key={index} className="hover:shadow-md pt-8 pb-8 border border-blue-100 rounded-3xl bd-blue-100 flex-1 flex-grow-1 mx-5 mb-5">
            <Link href={`/${crypto.currency}`}>
              <a className="rounded-md text-center">
                <div className="text-center">
                  <img src={crypto.logo_url} alt={crypto.name} className="w-20 h-20 mx-auto mb-6" />
                </div>
                <h2 className="text-2xl mb-6 uppercase tracking-wider">
                  {crypto.name}
                </h2>
                <h3 className="font-bold text-2xl mb-4">
                  {parseFloat(crypto.price).toFixed(2)} USD
                </h3>
                {DisplayTrending(crypto['1d'])}
                {DisplayTrending(crypto['30d'])}
                {DisplayTrending(crypto['365d'])}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

function DisplayTrending(data) {
  if (!data) {
    return
  }
  return (<p>1 year :{" "}
    <span className="font-bold">{
      parseFloat(data.price_change_pct * 100).toFixed(2) + '%'
    }</span>
    {" "}
    {
      data.price_change_pct < 0 ? (
        <span className="text-red-500">{Icons.TrendingDown}</span>
      ) : (<span className="text-green-500">{Icons.TrendingUp}</span>)
    }
  </p>)
}

async function LoadAll({ setListCrypto }) {
  const listCryptoJson = localStorage.getItem(Constants.ListCrypto)
  const listCrypto = JSON.parse(listCryptoJson)

  // Init with default values
  const list = listCryptoJson !== null ? listCrypto : [{ id: 'BTC' }, { id: 'ETH' }, { id: 'AAVE', }]

  const listCryptoRequest = list.map(l => l.id).join(',')
  const url = `/api/crypto?currencies=${listCryptoRequest}`
  const res = await fetch(url)
  const data = await res.json()
  setListCrypto(data)
}