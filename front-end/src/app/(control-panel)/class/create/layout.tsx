import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Class | Create',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            { children }
        </>
    )
}