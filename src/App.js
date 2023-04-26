import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, Stats } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import WorkScene from './scenes/WorkScene'
import joinUsOnDiscordImage from './public/join-us-on-discord.png'

import topLeftDetailsImage from './public/massa-logo.png'
import topRightDetailsImage from './public/obvious-logo-alt-2.png'
import HtmlAnimations from './components/HtmlAnimations'

export const App = () => {
  const debugMode = false
  const htmlPortalRef = useRef()
  const canvasPortalRef = useRef()

  return (
    <div className={`screen scanlines`}>
      <div ref={htmlPortalRef} id="html-portal"></div>
      <canvas ref={canvasPortalRef} id="canvas-portal" />

      <Canvas shadows dpr={[1, 1]} camera={{ position: [0, 2.5, 9.5], fov: 50 }} resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}>
        <Suspense fallback={null}>
          <>
            <color attach="background" args={['#0d151d']} />
            <WorkScene debugMode={debugMode} canvasPortalRef={canvasPortalRef} htmlPortalRef={htmlPortalRef} />
            
            {debugMode ? (
              <>
                <gridHelper args={[10, 20, '#4D089A', '#4D089A']} position={[0, -1, 0]} />
                <Stats
                  showPanel={0} // Start-up panel (default=0)
                  className="stats" // Optional className to add to the stats container dom element
                />
              </>
            ) : null}

            <EffectComposer>
              <Bloom luminanceThreshold={0.1} intensity={0.1} levels={5} mipmapBlur />
              {/* <Glitch delay={[4.1, 8.1]} duration={[0.2, 0.5]} strength={[0.1, 0.4]} perturbationMap={null} /> */}
              {/*<Noise />*/}
            </EffectComposer>
          </>
        </Suspense>
      </Canvas>
      <Loader />

      <div className="html-overlay">
        <div className="html-overlay__logo">
          <a className="html-overlay__logo__link" rel="noreferrer" target="_blank" href="https://massa.net">
            <img alt="Massa" className="html-overlay__logo__link__image" src={topLeftDetailsImage} />
          </a>
        </div>
        <div className="html-overlay__logo html-overlay__logo--right">
          <a className="html-overlay__logo__link" rel="noreferrer" target="_blank" href="https://obvious-art.com">
            <img alt="Obvious" className="html-overlay__logo__link__image" src={topRightDetailsImage} />
          </a>
        </div>
        <div className="html-overlay__logo html-overlay__discord--right">
          <a target="_blank" rel="noreferrer" href="https://discord.gg/massa" className="html-overlay__discord--right__button">
            <img alt="Join us on discord" className="html-overlay__center__button__image" src={joinUsOnDiscordImage} />
          </a>
        </div>
        <HtmlAnimations />
      </div>

      <div id="controls" className="controls">
        <div id="helpbutton" className="pushbutton">
          <div className="pushback">
            <a className="pushfore"> ? </a>{' '}
          </div>
        </div>

        <div className="sliderlinecontainer">
          <div className="slider" id="angle">
            <div className="sliderlabeldiv">
              <p className="sltitle">ANGLE</p>
              <a id="langle"></a>
              <a>&deg;</a>
            </div>
          </div>
          <div className="sliderline"></div>
        </div>
        <div className="sliderlinecontainer">
          <div className="slider" id="skewangle">
            <div className="sliderlabeldiv">
              <p className="sltitle">SKEW</p>
              <a id="lskewangle"></a>
              <a>&deg;</a>
            </div>
          </div>
          <div className="sliderline"></div>
        </div>

        <div id="thumbtable">
          <div id="thumbarea"></div>
        </div>

        <div>
          <div>
            <div>
              <a className="button" id="randombutton">
                RESET
              </a>
            </div>
            <div>
              <a className="button" id="randombutton">
                RANDOM
              </a>
            </div>
            <div>
              <div id="animatecell">
                <a className="button" id="animatebutton">
                  ANIMATE
                </a>
                <div className="menu">
                  <a className="button" id="autobutton">
                    AUTO
                  </a>
                  <a className="button" id="anglelock">
                    ANGLE
                  </a>
                  <a className="button" id="skewanglelock">
                    SKEW
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a className="button" id="colorbutton">
                COLOR
              </a>
            </div>
            <div>
              <a className="button" id="trailsbutton">
                TRAILS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
