import bgcss from '../styles/bg.module.scss'

export default function BackgroundImage() {
  // const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage
  // style={{ backgroundImage: `url(${imageUrl})` }}
  return (
    <div className={bgcss.background}>
      {Array.from({ length: 100 }, (k, i) => (
        <div className={bgcss.circleContainer} key={i}>
          <div className={bgcss.circle}></div>
        </div>
      ))}
    </div>
  )
}
