import Link from 'next/link'

const BackToHome = ({ home }: { home?: boolean }) => {
  return !home ? (
    <div className="p-6">
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  ) : null
}

export default BackToHome
