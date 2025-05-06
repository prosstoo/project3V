import React from 'react'
import { Box, Button } from '@mui/material'

const Toolbar = () => {
  const handleSave = () => {
    const data = {
      timestamp: new Date().toISOString(),
      ...JSON.parse(localStorage.getItem('graphData') || '{ "objects": [], "edges": [] }'),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'model.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        localStorage.setItem('graphData', JSON.stringify({
          objects: json.objects || [],
          edges: json.edges || []
        }))
        alert('Модель загружена!')
        window.location.reload()
      } catch (error) {
        alert('Ошибка чтения файла')
      }
    }
    reader.readAsText(file)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        borderBottom: '1px solid #ccc',
        backgroundColor: '#fff',
      }}
    >
      <Button variant="contained" onClick={handleSave}>
        Сохранить
      </Button>
      <label>
        <input type="file" accept=".json" hidden onChange={handleLoad} />
        <Button variant="contained" component="span">
          Загрузить
        </Button>
      </label>
    </Box>
  )
}

export default Toolbar