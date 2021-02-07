export const Constants = {
  NameSite: 'Crypto Watch',
  NomicsApi: 'https://api.nomics.com/v1/',
  ListCrypto: 'listCrypto',
}

export const Types = {
  Link: {
    a: 'a',
    link: 'link',
  }
}

export function constructionTitle(name) {
  return `${Constants.NameSite} - ${name}`
}

export function constructionNomicsApi(url) {
  return `${Constants.NomicsApi}${url}`
}