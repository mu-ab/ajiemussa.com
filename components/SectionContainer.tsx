import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="relative  pt-[100px] mx-auto  max-w-2xl px-4 sm:px-6 xl:max-w-3xl xl:px-0">
      {children}
    </section>
  )
}
