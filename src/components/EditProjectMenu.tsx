'use client'

import { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@mui/material'

import { DeleteProjectModal } from '@/components/DeleteProjectModal'
import { BsFillPencilFill } from 'react-icons/bs'

export function EditProjectMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [deleteProjectOpenedModal, setDeleteProjectOpenedModal] =
    useState(false)

  const open = Boolean(anchorEl)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }
  function handleCloseMenu() {
    setAnchorEl(null)
  }

  function handleDeleteProject() {
    setAnchorEl(null)

    handleOpenDeleteProjectModal()
  }

  function handleOpenDeleteProjectModal() {
    setDeleteProjectOpenedModal(true)
  }

  function handleCloseDeleteProjectModal() {
    setDeleteProjectOpenedModal(false)
  }

  return (
    <Box>
      <Button
        id="basic-button"
        className="rounded-full bg-orange-400"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsFillPencilFill size={24} color="black" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteProject}>Excluir</MenuItem>
        {deleteProjectOpenedModal && (
          <DeleteProjectModal
            handleCloseDeleteProjectModal={handleCloseDeleteProjectModal}
            openedModal={deleteProjectOpenedModal}
          />
        )}
      </Menu>
    </Box>
  )
}
