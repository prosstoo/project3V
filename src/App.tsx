import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import Scene3D from './components/Scene3D'

const App = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Box sx={{ padding: 1, borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6">Мой 3D Редактор</Typography>
      </Box>

      {/* Sidebar + Scene */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 200,
            borderRight: '1px solid #ccc',
            padding: 2,
            backgroundColor: '#fafafa',
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Объекты
          </Typography>
          <Button variant="contained" fullWidth disabled>
            Куб (в разработке)
          </Button>
        </Box>

        {/* 3D Scene */}
        <div style={{ flex: 1 }}>
          <Scene3D />
        </div>
      </div>
    </div>
  )
}

export default App