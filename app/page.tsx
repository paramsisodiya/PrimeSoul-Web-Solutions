import type { Metadata } from 'next'
import DynamicHomeSections from '@/components/shared/DynamicHomeSections'

export const metadata: Metadata = {
  title: 'PrimeSoul — Premium Digital Agency | Web Design & Development',
  description: 'PrimeSoul builds premium websites and web applications for businesses that refuse to settle for average. Top web development agency in India.',
}

export default function HomePage() {
  return <DynamicHomeSections />
}
