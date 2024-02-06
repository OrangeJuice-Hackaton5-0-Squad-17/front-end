'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

import Image from 'next/image'

import { navigate } from '../actions'

import ProfilePicture from '@/assets/images/default-profile-picture.svg'

import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LogoutIcon from '@mui/icons-material/Logout'

import ConfirmAccountDeletionModal from '@/components/ConfirmAccountDeletionModal'
import EditProfileModal from '@/components/EditProfileModal'

export default function MyProfile() {
  const [
    openedConfirmAccountDeletionModal,
    setOpenedConfirmAccountDeletionModal,
  ] = useState(false)
  const [openedEditProfileModal, setOpenedEditProfileModal] = useState(false)
  const { signOut, getUser, user } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  function handleOpenConfirmAccountDeletionModal() {
    setOpenedConfirmAccountDeletionModal(true)
  }

  function handleCloseConfirmAccountDeletionModal() {
    setOpenedConfirmAccountDeletionModal(false)
  }

  function handleOpenEditProfileModal() {
    setOpenedEditProfileModal(true)
  }

  function handleCloseEditProfileModal() {
    setOpenedEditProfileModal(false)
  }

  const userData = [
    {
      label: 'Nome Completo',
      value: user?.name,
      icon: <PersonIcon />,
    },
    {
      label: 'E-mail',
      value: user?.email,
      icon: <MailOutlineIcon />,
    },
  ]

  const callToActionButtons = [
    {
      label: 'Deletar Conta',
      icon: DeleteOutlineIcon,
      handleOnClick: () => {
        handleOpenConfirmAccountDeletionModal()
      },
    },
    {
      label: 'Deslogar',
      icon: LogoutIcon,
      handleOnClick: () => {
        signOut()

        navigate('/sign-in')
      },
    },
  ]

  return (
    <section className="flex flex-col gap-2 relative w-full md:max-w-lg md:mx-auto">
      <button
        onClick={handleOpenEditProfileModal}
        className="absolute right-0 top-0 rounded-full flex items-center justify-center p-1.5 bg-[#FF5522] text-white hover:brightness-90 active:brightness-110 transition-all"
      >
        <EditIcon className="text-xl" />
      </button>

      <Image
        className="rounded-full mx-auto"
        src={ProfilePicture}
        alt="User Profile Picture"
        width={170}
        priority
      />

      <section className="user-data border shadow-lg mt-4">
        {userData.map((userProp) => (
          <div
            className="flex gap-2 border-b m-4 pb-2 last:border-0 last:pb-0"
            key={userProp.label}
          >
            {userProp.icon}

            <div>
              <h3 className="font-medium">{userProp.label}</h3>
              <p>{userProp.value}</p>
            </div>
          </div>
        ))}
      </section>

      {callToActionButtons.map((callToActionButton) => (
        <button
          className="bg-white border shadow-lg font-medium p-4 text-[#FF5733] flex items-center"
          onClick={callToActionButton.handleOnClick}
          key={callToActionButton.label}
        >
          {<callToActionButton.icon className="mr-2" />}
          {callToActionButton.label}
        </button>
      ))}

      <ConfirmAccountDeletionModal
        openedModal={openedConfirmAccountDeletionModal}
        handleCloseTheConfirmAccountDeletionModal={
          handleCloseConfirmAccountDeletionModal
        }
      />

      <EditProfileModal
        openedModal={openedEditProfileModal}
        handleCloseEditProfileModal={handleCloseEditProfileModal}
      />
    </section>
  )
}
