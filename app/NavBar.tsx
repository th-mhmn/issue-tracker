'use client'
import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'

const NavBar = () => {
  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    {
      label: 'Issues',
      href: '/issues/list',
    },
  ]

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li
          className={classnames({
            'nav-link': true,
            '!text-zinc-900': link.href === currentPath,
          })}
          key={link.href}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            radius="full"
            size="2"
            src={session!.user!.image!}
            fallback="?"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.name}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Label>
            <Text size="1">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
