const Header = () => (
  <header>
      <style jsx>{`
        nav ul {
            display: flex;
            list-style-type: none;
            padding: 0;
            margin: 0;
            font-size: 150%
        }
        nav ul li {
            padding-right: .5rem;
            color: #666;
            font-feature-settings: "smcp","c2sc";
            font-variant-caps: all-small-caps
        }
        nav ul li a {
            text-decoration: none
        }
        nav ul li a.selected {
            font-weight: bolder;
            text-decoration: underline
        }
        a {
            color: #007acc;
            text-decoration: none
        }
        a:hover {
            text-decoration: underline
        }
      `}</style>
    <h1>Joe.Dev</h1>
    <nav>
      <ul>
        <li>
          <a className="" href="/">
            HOME
          </a>
        </li>
        <li>
          <a className="" href="/blog">
            ARTICLES
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
