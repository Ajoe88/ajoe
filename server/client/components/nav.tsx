import Link from 'next/link'

const Nav = () => (
  <nav>
    <ul>
      <Link href="/">
        <a>BLOG</a>
      </Link>
      <Link href="/vlog">
        <a>VLOG</a>
      </Link>
      <Link href="/beauty">
        <a>美</a>
      </Link>
      <Link href="/internet">
        <a>.NET</a>
      </Link>
    </ul>
  </nav>
)

export default Nav
