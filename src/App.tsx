import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './components/Sidebar'
import Scene3D from './components/Scene3D'
import Toolbar from './components/Toolbar'

const App = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <Scene3D />
        </Box>
      </Box>
    </Box>
  )
}

export default App