import A from "../components/a";
import Layout from "../components/layout";
import { constructionTitle } from "../constants";

export default function About() {
  const namePage = 'About'
  const title = constructionTitle(namePage)
  return (
    <Layout page={title}>
      <div>
        <p className="text-lg font-semibold">
          Just a test project to learn Next.JS and Tailwind CSS.
          With <A into={false} text="Nomics" url="https://p.nomics.com/cryptocurrency-bitcoin-api" /> crypto API
        </p>
        <div className="font-medium">
          <div className="text-cyan-600">
            Sarah Dayan
            </div>
          <div className="text-gray-500">
            Staff Engineer, Algolia
            </div>
        </div>
      </div>
    </Layout>
  )
}