import Layout from "../components/layout";
import { constructionTitle } from "../constants";

export default function About() {
  const namePage = 'About'
  const title = constructionTitle(namePage)
  return (
    <Layout page={title}>
      <p>By me !</p>
    </Layout>
  )
}
