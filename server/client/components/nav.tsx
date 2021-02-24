import Link from 'next/link'

const Nav = () => (
  <nav className="">
    <ul className="flex mx-auto my-10 space-x-0 sm:space-x-8 md:space-x-10 justify-center">
      {[
        {
          name: '.NET',
          subTitle: 'Internet相关',
          link: '/net',
          svgPath: (
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ),
        },
        {
          name: 'BLOG',
          subTitle: '文章千古事，得失寸尺心',
          link: '/blog',
          svgPath: (
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          ),
        },
        {
          name: 'VLOG',
          subTitle: 'Recording the live and life',
          link: '/vlog',
          svgPath: (
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          ),
        },
        {
          name: '美',
          subTitle: '理解美，欣赏美',
          link: '/beauty',
          svgPath: (
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
              className="text-red-700 animate-pulse"
            />
          ),
        },
      ].map((navItem) => (
        <li
          key={navItem.name}
          className="text-center transition-all transform rounded hover:scale-125 hover:bg-gray-700 hover:bg-opacity-30"
        >
          <Link href={navItem.link}>
            <a className="nav-item inline-block p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 md:w-10 m-auto"
              >
                {navItem.svgPath}
              </svg>
              <div className="c-titles">
                <h2
                  className={`font-extrabold ${
                    navItem.name === '.NET' ? 'text-pink-800' : ''
                  }`}
                >
                  {navItem.name}
                </h2>
                <h3 className="hidden">{navItem.subTitle}</h3>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
