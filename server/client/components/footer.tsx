import Link from 'next/link'
const Footer = () => (
  <div className="flex flex-col items-center space-y-1 w-full mt-10 mb-2">
    {[
      { name: 'ajoe.net', link: 'http://joe.net' },
      { name: '粤ICP备2021021107号-1', link: 'https://beian.miit.gov.cn' },
    ].map((item) => (
      <Link href={item.link} key={item.name}>
        <a className="text-xs text-center">{item.name}</a>
      </Link>
    ))}
  </div>
)

export default Footer
