import Layout from "../components/layout";
import { constructionTitle } from "../constants";

export default function About() {
  const namePage = 'About'
  const title = constructionTitle(namePage)
  return (
    <Layout page={title}>
      <div className="md:flex bg-gray-400 rounded-xl p-8 md:p-0">
        <img className="w-32 h-32 md:w-48 md:h-auto md:rounded-md rounded-full mx-auto" src="user.jpg" alt="" width="384" height="512" />
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div>
            <p className="text-lg font-semibold">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </div>
          <div className="font-medium">
            <div className="text-cyan-600">
              Sarah Dayan
            </div>
            <div className="text-gray-500">
              Staff Engineer, Algolia
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}