import Link from "next/link";
import { Types } from "../constants";

export default function A({ type, url, text, into = true }) {
  return type === Types.Link.link ? (
    <Link href={url} >
      <button className="hover:shadow-md">
        {text}
      </button>
    </Link>
  ) : (
      <a href={url} className="hover:shadow-md text-blue-500" target={into ? "" : "_blank"}>{text}</a>
    )
}