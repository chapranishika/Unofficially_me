const items = [
  { text: 'ML Engineer',           hot: false },
  { text: '✦',                     hot: true  },
  { text: 'GenAI Builder',         hot: false },
  { text: '✦',                     hot: true  },
  { text: 'Fraud Detection',       hot: false },
  { text: '✦',                     hot: true  },
  { text: 'Published @ ICCET 2026',hot: false },
  { text: '✦',                     hot: true  },
  { text: 'National Dancer',       hot: false },
  { text: '✦',                     hot: true  },
  { text: 'ROC-AUC 0.99',          hot: false },
  { text: '✦',                     hot: true  },
  { text: '95.8% Accuracy',        hot: false },
  { text: '✦',                     hot: true  },
  { text: '21 years old',          hot: false },
  { text: '✦',                     hot: true  },
  { text: 'FastAPI · Docker · Gemini', hot: false },
  { text: '✦',                     hot: true  },
  { text: 'Mumbai',                hot: false },
  { text: '✦',                     hot: true  },
]
const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div style={{
      background: 'var(--teal-dark)',
      overflow: 'hidden',
      padding: '8px 0',
      borderBottom: '1px solid rgba(0,191,165,0.15)',
      position: 'relative',
      zIndex: 201,
    }}>
      <div className="ticker-animate" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: item.hot ? 'var(--orange)' : '#1a6b5e',
            padding: '0 18px',
          }}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
