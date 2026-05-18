interface SectionLabelProps {
  children?: React.ReactNode
  text?: string
  dark?: boolean
}

export default function SectionLabel({ children, text, dark = false }: SectionLabelProps) {
  return (
    <div className={`pill-badge ${dark ? 'pill-badge--dark' : 'pill-badge--purple'} mb-5`}>
      <span className="dot" style={dark ? { background: '#A855F7' } : undefined} />
      {children || text}
    </div>
  )
}
