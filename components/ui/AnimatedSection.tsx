'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView()

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-20px)'
      case 'right': return 'translateX(20px)'
      case 'none': return 'translateY(0)'
      default: return 'translateY(20px)'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0)' : getInitialTransform(),
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

