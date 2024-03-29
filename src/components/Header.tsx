'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'

import { useAuth } from '@/hooks/useAuth'
import { useWindowSize } from '@/hooks/useWindowsSize'
import { navigate } from '@/app/actions'

import logoImg from '@/assets/images/logo.svg'
import profileImg from '@/assets/images/default-profile-picture.svg'

const pages = [
  {
    label: 'Meus projetos',
    path: 'my-projects',
  },
  {
    label: 'Descobrir',
    path: 'discover',
  },
]

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { signOut } = useAuth()
  const size = useWindowSize()

  const profileOptions = [
    {
      label: 'Meu perfil',
      path: 'my-profile',
      isLinkOption: true,
      // eslint-disable-next-line
      handleOnClick: () => {},
    },
    {
      label: 'Deslogar',
      path: '/sign-in',
      isLinkOption: false,
      handleOnClick: () => {
        signOut()

        navigate('/sign-in')
      },
    },
  ]

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <header
      className={`bg-[#111133] text-white flex md:gap-24 items-center py-4 ${size.width <= 375 ? 'px-3' : 'px-8'} `}
    >
      <Toolbar disableGutters className="min-h-0 max-w-7xl mx-auto w-full">
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            className="pl-0"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page, index) => (
              <Link
                key={index}
                className="text-center"
                href={page.path}
                onClick={handleCloseNavMenu}
              >
                <MenuItem key={page.label}>{page.label}</MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>

        <Link className="mr-24" href="my-projects">
          <Image
            src={logoImg}
            alt="orange portfolios Logo"
            width={110}
            priority
          />
        </Link>

        <Box
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '24px' }}
        >
          {pages.map((page) => (
            <button key={page.label} onClick={handleCloseNavMenu}>
              <Link
                className="block font-medium hover:underline"
                href={page.path}
              >
                {page.label}
              </Link>
            </button>
          ))}
        </Box>

        <div className="flex items-center gap-4 ml-auto">
          <Tooltip title="Opções de Perfil">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Image
                className="rounded-full"
                alt="user profile picture"
                src={profileImg}
                width={40}
                priority
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {profileOptions.map((profileOption) =>
              profileOption.isLinkOption ? (
                <MenuItem
                  onClick={handleCloseUserMenu}
                  key={profileOption.label}
                >
                  <Link className="block" href={profileOption.path}>
                    {profileOption.label}
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu()
                    profileOption.handleOnClick()
                  }}
                  key={profileOption.label}
                >
                  <p className="block w-full">{profileOption.label}</p>
                </MenuItem>
              ),
            )}
          </Menu>
        </div>
        <NotificationsIcon className="ml-4" />
      </Toolbar>
    </header>
  )
}
