import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Loading() {
  return (
    <Box className="min-h-screen w-full flex items-center justify-center">
      <CircularProgress />
    </Box>
  )
}
