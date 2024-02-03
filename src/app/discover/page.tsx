'use client'

import Image from 'next/image'
import { Avatar, Box, Chip, Stack, TextField } from '@mui/material'

import { useWindowSize } from '@/hooks/useWindowsSize'

import backgroundProjectDiscoverFirst from '@/assets/images/background-project-discover-first.svg'
import backgroundProjectDiscoverSecond from '@/assets/images/background-project-discover-second.svg'
import backgroundProjectDiscoverThird from '@/assets/images/background-project-discover-third.svg'
import backgroundProjectDiscoverFourth from '@/assets/images/background-project-discover-fourth.svg'
import profileImg from '@/assets/images/default-profile-picture.svg'

export default function Discover() {
  const size = useWindowSize()

  return (
    <>
      <article
        className={`min-h-screen w-full ${size.width <= 375 ? 'px-3' : 'px-8'}`}
      >
        <section className="max-w-[1220px]">
          <h2 className="w-full lg:w-[744px] text-[#222244] text-3xl text-center mx-auto mb-28 mt-[112px]">
            Junte-se à comunidade de inovação, inspiração e descobertas,
            transformando experiências em conexões inesquecíveis
          </h2>
          <Box className="w-full flex flex-col items-start justify-center">
            <TextField
              className="border border-[#C4C4C4] rounded text-[#A0A1A5] mb-6 py-4 px-3 w-full md:w-[723px] h-[56px]"
              type="text"
              placeholder="Buscar tags"
            />
            <Box className="w-full lg:max-w-[1120px] flex flex-col items-center justify-center md:grid md:grid-cols-2 md:place-items-start md:ml-3 lg:grid lg:grid-cols-3 lg:place-items-start lg:justify-between gap-6 mt-10">
              <Box className="w-[312px] h-[290px] flex-col justify-center block">
                <Image
                  className="rounded"
                  src={backgroundProjectDiscoverFirst}
                  alt="project image"
                />
                <Box className="flex items-center gap-2 mt-2">
                  <Image
                    className="rounded-full"
                    src={profileImg}
                    alt="author's profile picture"
                    width={24}
                  />
                  <h3 className="text-[#66676A] text-base text-center">
                    Bianca Martin • 02/24
                  </h3>
                  <Stack direction="row" spacing={1}>
                    <Chip label="UX" />
                    <Chip label="Web" />
                  </Stack>
                </Box>
              </Box>
              <Box className="w-[312px] h-[290px] flex-col justify-center block">
                <Image
                  className="rounded"
                  src={backgroundProjectDiscoverSecond}
                  alt="project image"
                />
                <Box className="flex items-center gap-2 mt-2">
                  <Avatar
                    className="w-6 h-6"
                    alt="profile sharp image"
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Kurt&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&graphicType=Diamond&eyeType=Squint&eyebrowType=Default&mouthType=Disbelief&skinColor=Pale"
                  />
                  <h3 className="text-[#66676A] text-base text-center">
                    José Lima • 04/24
                  </h3>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Front-end" />
                    <Chip label="Web" />
                  </Stack>
                </Box>
              </Box>
              <Box className="w-[312px] h-[290px] flex-col justify-center block">
                <Image
                  className="rounded"
                  src={backgroundProjectDiscoverThird}
                  alt="project image"
                />
                <Box className="flex items-center gap-2 mt-2">
                  <Avatar
                    className="w-6 h-6"
                    alt="profile sharp image"
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=Black"
                  />
                  <h3 className="text-[#66676A] text-base text-center">
                    André Silva • 07/24
                  </h3>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Back-end" />
                    <Chip label="Mobile" />
                  </Stack>
                </Box>
              </Box>
              <Box className="w-[312px] h-[290px] block">
                <Image
                  className="rounded"
                  src={backgroundProjectDiscoverFourth}
                  alt="project image"
                />
                <Box className="flex items-center gap-2 mt-2">
                  <Avatar
                    className="w-6 h-6"
                    alt="profile sharp image"
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=Black"
                  />
                  <h3 className="text-[#66676A] text-base text-center">
                    João Abreu • 03/24
                  </h3>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Back-end" />
                    <Chip label="Mobile" />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </section>
      </article>
    </>
  )
}
