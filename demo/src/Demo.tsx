import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion'
import { SCENE } from './scene'

export const FPS = 30
const TITLE = 3 * FPS
const LOOP = 18 * FPS // one full loop of the scene
const OUTRO = 4.5 * FPS
export const TOTAL = TITLE + LOOP + OUTRO

const CLAY = '#d97757'
const GROUND = '#141a21'
const INK = '#e8e6e1'
const MUTED = '#9a968f'
const SANS = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'

const fade = (frame: number, start: number, end: number, d = 10) =>
  interpolate(frame, [start, start + d, end - d, end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

// The scene animates with CSS, which runs on the wall clock. Rendering needs it on the
// frame clock, so every animated element (class "a") is paused and seeked by a negative delay.
const Scene = ({ seconds }: { seconds: number }) => {
  const seek = `<style>.a{animation-play-state:paused!important;animation-delay:${(-seconds).toFixed(4)}s!important}</style></svg>`
  // Map the part of the scene the app shows (x 139..1568 of its 1600-wide viewBox) onto the frame.
  const s = 1920 / (1568 - 139)
  const style: CSSProperties = {
    position: 'absolute',
    left: -139 * s,
    top: -70 * s,
    width: 1600 * s,
    height: 1000 * s,
  }
  const html = SCENE.replace('<svg ', '<svg width="100%" height="100%" ').replace('</svg>', seek)

  return <div style={style} dangerouslySetInnerHTML={{ __html: html }} />
}

const Line = ({ w, strong }: { w: number; strong?: boolean }) => (
  <div
    style={{
      height: 14,
      width: `${w}%`,
      borderRadius: 7,
      background: strong ? 'rgba(232,230,225,.34)' : 'rgba(232,230,225,.16)',
      marginBottom: 16,
    }}
  />
)

// A plain stand-in for a chat window: a frosted column over the backdrop.
const Chat = () => (
  <div
    style={{
      position: 'absolute',
      left: 424,
      width: 976,
      top: 0,
      bottom: 0,
      padding: '70px 64px',
      boxSizing: 'border-box',
      background: 'rgba(20,26,33,.55)',
      backdropFilter: 'blur(6px)',
      borderLeft: '1px solid rgba(255,255,255,.05)',
      borderRight: '1px solid rgba(255,255,255,.05)',
    }}
  >
    <div
      style={{
        marginLeft: '42%',
        padding: '22px 24px 8px',
        borderRadius: 18,
        background: 'rgba(255,255,255,.06)',
        marginBottom: 54,
      }}
    >
      <Line w={100} strong />
      <Line w={64} strong />
    </div>
    {[96, 100, 88, 93, 41].map((w, i) => (
      <Line key={i} w={w} />
    ))}
    <div style={{ height: 30 }} />
    {[99, 91, 97, 58].map((w, i) => (
      <Line key={i} w={w} />
    ))}
    <div style={{ height: 30 }} />
    {[94, 100, 72].map((w, i) => (
      <Line key={i} w={w} />
    ))}
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 150,
        height: 76,
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,.14)',
        background: 'rgba(255,255,255,.03)',
      }}
    />
  </div>
)

const CAPTIONS: [number, string][] = [
  [0, 'One forward pass per token of “Claudemaxxing...”'],
  [3, 'Attention arcs reach back to earlier tokens'],
  [6, 'A pulse runs down the residual stream, through attn and mlp'],
  [9, 'Next-token candidates settle, and the winner lights up'],
  [12, 'Each token fills in its row of the attention map'],
  [15, 'Then it loops. One SVG, CSS only, no scripts'],
]

const Caption = ({ children, opacity }: { children: ReactNode; opacity: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 44,
      display: 'flex',
      justifyContent: 'center',
      opacity,
    }}
  >
    <div
      style={{
        font: `500 34px ${SANS}`,
        color: INK,
        padding: '16px 30px',
        borderRadius: 16,
        background: 'rgba(10,13,17,.86)',
        border: '1px solid rgba(255,255,255,.08)',
      }}
    >
      {children}
    </div>
  </div>
)

const Window = () => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 12, LOOP - 10, LOOP], [0, 1, 1, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: GROUND, opacity }}>
      <Scene seconds={frame / FPS} />
      <Chat />
      {CAPTIONS.map(([at, text]) => (
        <Caption key={at} opacity={fade(frame, at * FPS + 4, (at + 3) * FPS)}>
          {text}
        </Caption>
      ))}
    </AbsoluteFill>
  )
}

const Title = () => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill
      style={{ background: GROUND, alignItems: 'center', justifyContent: 'center', opacity: fade(frame, 0, TITLE, 12) }}
    >
      <div style={{ font: `600 92px ${MONO}`, color: CLAY, letterSpacing: -2 }}>claudemaxxing-backdrop</div>
      <div style={{ font: `400 40px ${SANS}`, color: MUTED, marginTop: 28 }}>
        An animated transformer behind your Claude conversations
      </div>
    </AbsoluteFill>
  )
}

const Outro = () => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: GROUND, alignItems: 'center', justifyContent: 'center', opacity }}>
      <div style={{ font: `400 36px ${SANS}`, color: MUTED, marginBottom: 30 }}>Install it with one line</div>
      <div
        style={{
          font: `500 30px ${MONO}`,
          color: INK,
          padding: '26px 36px',
          borderRadius: 18,
          border: `1px solid ${CLAY}`,
          background: 'rgba(217,119,87,.08)',
        }}
      >
        /plugin install claudemaxxing-backdrop --marketplace priyathamkat/claudemaxxing-backdrop
      </div>
      <div style={{ font: `400 32px ${MONO}`, color: CLAY, marginTop: 44 }}>
        github.com/priyathamkat/claudemaxxing-backdrop
      </div>
    </AbsoluteFill>
  )
}

export const Demo = () => (
  <AbsoluteFill style={{ background: GROUND }}>
    <Sequence durationInFrames={TITLE}>
      <Title />
    </Sequence>
    <Sequence from={TITLE} durationInFrames={LOOP}>
      <Window />
    </Sequence>
    <Sequence from={TITLE + LOOP} durationInFrames={OUTRO}>
      <Outro />
    </Sequence>
  </AbsoluteFill>
)
