import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Constants, Types } from '../constants'
import A from './a'
import { Icons } from '../icons'

export default function Layout({ children, page }) {
  return (
    <div className="bg-blue-50 pt-5 text-center min-h-screen">
      <Head>
        <title>
          {page}
        </title>
      </Head>
      <header className="container-lg">
        <h1 className="text-5xl mb-2">
          <Link href="/">
            {Constants.NameSite}
          </Link>
        </h1>
        <div className="p-4">
          <Image src="/crypto.jpg" alt="main-pic"
            width="400"
            height="25"
            className="rounded-3xl object-cover"
          />
        </div>
      </header>
      <main className="pt-4 mx-20">
        {children}
      </main>
      <footer className="p-10">
        <Image src="/crypto.jpg" alt="main-pic"
          width="1000"
          height="30"
          className="rounded-3xl object-cover"
        />
        <ul className="pt-10 pb-4 flex justify-around">
          <li>
            <ul className="flex justify-around">
              <li className="flex-1 mx-1">
                <A url="/about" text="About" type={Types.Link.link} />
              </li>
              <li className="flex-1 mx-1">
                //
              </li>
              <li className="flex-1 mx-1">
                <A url="/settings" text={Icons.Settings} type={Types.Link.link} />
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex justify-around">
              <li>Made with</li>
              <li>{Icons.Lighting}</li>
              <li>by <A url="https://twitter.com/vicmassv" text="@vicmassv" type={Types.Link.a} into={false} /></li>
            </ul>
          </li>
        </ul>
      </footer>
    </div>
  )
}