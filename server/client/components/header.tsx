import Link from 'next/link'
import Nav from './nav'

type HeaderProps = {
  name: string
}

const Header = ({ name }: HeaderProps) => (
  <header className="a-header w-full mt-8">
    <div className="logo">
      <Link href="/">
        <a className="block w-20 mx-auto">
          <img
            src="/images/profile.jpg"
            className="w-28 rounded-full mx-auto mt-2 opacity-90"
            alt={name}
          />
        </a>
      </Link>
      <h2 className="text-center group">
        <Link href="/">
          <a className="text-4xl md:text-5xl text-gray-300 text-opacity-80 px-1">
            {name}
          </a>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 inline-block text-pink-800 transition transform group-hover:rotate-45"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
            clipRule="evenodd"
          />
        </svg>
      </h2>
    </div>
    <Nav />
  </header>
)

export default Header
