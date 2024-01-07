'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from 'react-icons/fa'
import classnames from 'classnames'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    {
      label: 'Issues',
      href: '/issues',
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
    </nav>
  )
}

export default NavBar