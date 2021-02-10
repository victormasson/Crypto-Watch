import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import A from "../components/a";
import Layout from "../components/layout";
import { constructionNomicsApi, constructionTitle, Constants } from "../constants";
import { Key } from '../key';

export default function Currency({
  initCrypto = null,
  initCurrency = ''
}) {

  const router = useRouter()
  const [crypto, setCrypto] = useState(initCrypto)
  const [currency, setCurrency] = useState(initCurrency)

  const namePage = `Page ${currency}`
  const title = constructionTitle(namePage)

  useEffect(() => {
    const c = router.query.currency
    if (c !== undefined) {
      setCurrency(c)

      LoadCrypto({ currency: c, setCrypto })
    }
  }, [router])

  return (
    <Layout page={title}>
      { crypto === null ? '' :
        (<div className="relative hover:shadow md p-8 border border-blue-100 sm:rounded-3xl bg-blue-100 md:w-auto flex-1 mx-5">
          <div className="texte-center">
            <img src={crypto.logo_url} alt={crypto.name} className="w-20 h-20 mx-auto mb-6" />
          </div>
          <h2 className="text-2xl mb-6 uppercase tracking-wider">
            {crypto.name}
          </h2>
          <p>{crypto.description}</p>
          <p className="pt-5 text-blue-500">
            <A url={crypto.reddit_url} text="Reddit" into={false} />
          </p>
        </div>)
      }
    </Layout>
  )
}

async function LoadCrypto({ setCrypto, currency }) {
  try {
    const apiUrl = Constants.ApiUrl !== 'undefined' ? Constants.ApiUrl : ''
    const url = `${apiUrl}/api/crypto?currency=${currency}`
    const res = await fetch(url)
    const data = await res.json()
    const crypto = data

    setCrypto(crypto)
  } catch (err) {
    console.error(err);
  }
}