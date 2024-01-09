'use client'
import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    {
      label: 'Issues',
      href: '/issues/list',
    },
  ]

  return (
    <nav className="flex space-x-6 h-14 border-b items-center px-4">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' ? (
          <Link href="/api/auth/signout">Sign Out</Link>
        ) : (
          <Link href="/api.auth/sighin">Login</Link>
        )}
      </Box>
    </nav>
  )
}

export default NavBar
