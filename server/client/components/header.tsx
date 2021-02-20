import Link from 'next/link'

type HeaderProps = {
  name: string
}

const Header = ({ name }: HeaderProps) => (
  <header className="lg">
    <Link href="/">
      <a>
        <img
          src="/images/profile.jpg"
          className="w-28 rounded-full"
          alt={name}
        />
      </a>
    </Link>
    <h2 className="">
      <Link href="/">
        <a className="">{name}</a>
      </Link>
      <span className=""></span>
    </h2>
  </header>
)

export default Header
