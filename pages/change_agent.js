import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const cityRef = useRef(null);

  const scrollToCity = () => {
    cityRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Head>
        <title>The Change Agent</title>
        <meta name="description" content="The change agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="result-section">
          <div className="va-container va-container-v va-container-h">
            <div className="va-middle">
              <div className="content-inline-center">
                <div className="content">
                  <div className="description-text">
                    <div className="text-component">
                      <p className="subject text-uppercase">Your travel personality is</p>
                      <dl className="dl">
                        <dt className="dt">
                          <h1 className="title">The Change Agent</h1>
                        </dt>
                        <div className="text">
                          <p>A student of the world, your mantra is 'never stop growing.' You’re always looking for a chance to ignite change in the world around you.</p>
                        </div>
                      </dl>
                    </div>
                    <div className="hide-sm">
                      <div className="line-separate-min"></div>
                      <p className="social-links-title">Share your results with your friends:</p>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <div className="description-image image-change_agent">
                    <Image className="img-responsive" src="/change-agent-placeholder.png" width={547} height={547} alt="The Change Agent" />
                  </div>
                </div>
              </div>
              <div className="start-link">
                <p className="text-uppercase text-center" onClick={() => scrollToCity()}>View your Airbnb Trip Itinerary</p>
                <div className="slider-down-relative" onClick={() => scrollToCity()}>
                  <div className="va-container va-container-v va-container-h">
                    <div className="va-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14">
                        <path fill="#B4A76C" fillRule="nonzero" d="M10.5 14L0 3.587 3.615 0 10.5 6.829 17.385 0 21 3.586z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={cityRef} className="section-city space-top-10">
          <div className="text-center hide-sm">
            <div className="text-component">
              <p className="subject text-uppercase">Your city</p>
              <dl className="dl">
                <dt className="dt">
                  <h1 className="title">San Francisco, California</h1>
                </dt>
                <div className="text">
                  <p>As charming as it is innovative, San Francisco is the perfect place to blend social conscience with good old-fashioned fun.</p>
                </div>
              </dl>
            </div>
          </div>
          <div className="image" style={{ backgroundImage: `url('/san_francisco.jpeg')`}}></div>
        </section>
      </main>
    </div>
  )
}
