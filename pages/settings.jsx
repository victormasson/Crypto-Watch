import { useRef, useState, useEffect } from 'react'
import Link from "next/link"
import Layout from "../components/layout"
import { constructionNomicsApi, constructionTitle, Constants } from "../constants"
import { Icons } from '../icons'
import { Key } from '../key'
import { CopyToClipboard } from 'react-copy-to-clipboard';

async function LoadAll({ setSelected }) {
  const listCryptoJson = localStorage.getItem(Constants.ListCrypto)
  const listCrypto = JSON.parse(listCryptoJson)
  // // Init with default values
  const list = listCryptoJson !== null ? listCrypto : []
  setSelected(list)
}

export default function Settings({
  // res,
  initSearch = '',
  initSearchElement = 'id',
  initSelected = [],
  initDisplayNotification = { show: false, type: '', msg: '' } },
  initListCrypto = []) {

  const [search, setSearch] = useState(initSearch)
  const [listCrypto, setListCrypto] = useState(initListCrypto)
  const [selected, setSelected] = useState(initSelected)
  const [searchElement, setSearchElement] = useState(initSearchElement)
  const [displayNotification, setDisplayNotification] = useState(initDisplayNotification)

  const namePage = '⚙'
  const title = constructionTitle(namePage)

  useEffect(() => {
    LoadAllCrypto({ setListCrypto })
    LoadAll({ setSelected })
  }, [])

  useEffect(() => {
    let mounted = true;
    if (mounted && displayNotification.show) {
      setTimeout(() => {
        setDisplayNotification({ show: false, type: '', msg: '' })
      }, 3000)
    }

    return () => mounted = false;
  }, [displayNotification])

  const fctGetCrypto = () => {
    return listCrypto
  }
  const fctSearchElementOnChange = (e) => {
    const value = e.target.value
    setSearchElement(value)
  }

  return (
    <Layout page={title}>
      {DisplayNotification({ displayNotification })}
      {
        selected.length === 0 ? '' :
          (<div>
            <div className="pt-10 pb-4 flex content-center">
              <h1 className="flex-1">Selected crypto</h1>
              <button className="flex-1 hover:shadow-md bg-blue-100 text-center px-2 py-1 rounded-lg"
                onClick={() => SaveCrypto({ selected, setDisplayNotification })}
              >
                Save
              </button>
            </div>
            {DisplayCrypto({ display: 2, list: fctGetCrypto(), listSelected: selected, search, setSelected, setDisplayNotification })}
          </div>)
      }
      <div className="pt-10 pb-4 flex content-center justify-content space-x-3">
        <select defaultValue="All" className="flex-2 bg-blue-100 text-left align-middle px-2 py-1 rounded-lg" onChange={fctSearchElementOnChange}>
          <option value="All">All</option>
          <option value="id">id</option>
          <option value="name">name</option>
        </select>
        <input className="flex-1 bg-blue-100 text-left align-middle px-2 py-1 rounded-lg" type="text" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        {search === '' ? '' : DisplayCrypto({ display: 1, list: fctGetCrypto(), listSelected: selected, searchElement, search, setSelected, setDisplayNotification })}
      </div>
    </Layout>
  )
}

const DisplayNotification = ({ displayNotification }) => {
  const { show, type, msg } = displayNotification

  if (!show) {
    return
  }

  switch (type) {
    case 'SUCCESS':
      return (
        <div className="bg-gray-200 opacity-100 border-l-4 border-green-600 text-green-dark p-4 fixed top-5 right-5 lg:w-1/5 xs:w-1/3" >
          <p className="font-bold text-green-600">Success</p>
          <p className="break-words">{msg}</p>
        </div>
      )
      break

    case 'WARNING':
      return (
        <div className="bg-gray-200 opacity-100 border-l-4 border-yellow-700 text-orange-dark p-4 fixed top-5 right-5" role="alert">
          <p className="font-bold text-yellow-700">Warning</p>
          <p className="break-words">{msg}</p>
        </div>
      )
      break

    default:
      break
  }
}

function SaveCrypto({ selected, setDisplayNotification }) {
  const selectedJson = JSON.stringify(selected)
  localStorage.setItem(Constants.ListCrypto, selectedJson)
  setDisplayNotification({ show: true, type: 'SUCCESS', msg: `Crypto are saved in the localstorage` })
}

/**
 * display = 1 => display crypto
 * display = 2 => display selected crypto
 */
function DisplayCrypto({ display = 1, list, listSelected, searchElement, search, setSelected, setDisplayNotification }) {
  let lst = []
  switch (display) {
    case 2:
      lst = listSelected
      break;
    case 1:
    default:
      if (searchElement === 'id') {
        lst = list.filter(l => l.id.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      }
      if (searchElement === 'name') {
        lst = list.filter(l => l.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      }
      if (searchElement === 'all') {
        lst = list.filter(l => l.id.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || l.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      }

      lst = lst
        .slice(0, 50)
        .map(l => listSelected.filter(ls => ls.id === l.id).length > 0 ?
          ({
            ...l,
            selected: true
          }) : ({
            ...l,
            selected: false
          })
        )
      break;
  }

  let fctAddOrRemoveCrypto = ({ listSelected, crypto, setSelected, setDisplayNotification }) => {
    const isAlready = listSelected.filter(l => l.id === crypto.id)?.[0]
    if (listSelected.length === 5 && !isAlready) {
      setDisplayNotification({ show: true, type: 'WARNING', msg: `There are too many crypto` })
      return
    }

    if (!isAlready) {
      setSelected([...listSelected, {
        ...crypto,
        order: ++listSelected.length,
        selected: true
      }])
      setDisplayNotification({ show: true, type: 'SUCCESS', msg: `${crypto.name} is added` })
    } else {
      const listRemove = listSelected.filter(l => l.id !== crypto.id)
      setSelected([...listRemove])
      setDisplayNotification({ show: true, type: 'SUCCESS', msg: `${crypto.name} is removed` })
    }
  }

  return (
    <div className="flex justify-around py-10 flex-wrap">
      {lst.map((crypto, index) => (
        <div key={index} className="hover:shadow-md pt-2 pb-2 border border-blue-100 rounded-3xl bd-blue-100 flex-1 mx-5 mb-5 w-50">
          <div className="flex flex-row-reverse pt-2 pb-2"
            onClick={(e) => fctAddOrRemoveCrypto({ listSelected, crypto, setSelected, setDisplayNotification })}>
            <button>{crypto.selected ? Icons.Remove : Icons.Add}</button>
          </div>
          { display === 2 ?
            (<div className="pt-2 pb-2">{crypto.order}</div>)
            : ''}
          <div className="text-center">
            <img src={crypto.logo_url} alt={crypto.name.slice(0, 5)} className="w-20 h-20 mx-auto mb-6" />
          </div>
          <h2 className="flex flex-wrap text-2xl uppercase tracking-wider break-words hover-trigger">
            <span className="flex-1">
              {crypto.name}
            </span>
            <CopyToClipboard text={crypto.name}>
              <button className="hover-target">{Icons.Copy}</button>
            </CopyToClipboard>
          </h2>
          <h3 className="flex flex-wrap font-bold mb-4 hover-trigger">
            <span className="flex-1">
              {crypto.id}
            </span>
            <CopyToClipboard text={crypto.id}>
              <button className="hover-target">{Icons.Copy}</button>
            </CopyToClipboard>
          </h3>
        </div>
      ))}
      <style jsx>{
        `.hover-trigger .hover-target {
          display: none;
        }
        .hover-trigger:hover .hover-target {
          display: block;
        }`}
      </style>
    </div>
  )
}

async function LoadAllCrypto({ setListCrypto }) {
  const url = `/api/crypto`
  const res = await fetch(url)
  const data = await res.json()

  setListCrypto(data)
}