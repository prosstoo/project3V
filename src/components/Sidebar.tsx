import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useGraphStore } from '../store/useGraphStore'

const Sidebar = () => {
  const addCube = useGraphStore((state) => state.addCube)
  const addSphere = useGraphStore((state) => state.addSphere)
  const addCylinder = useGraphStore((state) => state.addCylinder)
  const connectObjects = useGraphStore((state) => state.connectObjects)
  const updateDescription = useGraphStore((state) => state.updateDescription)
  const deleteObject = useGraphStore((state) => state.deleteObject)
  const objects = useGraphStore((state) => state.objects)

  const [selectedId, setSelectedId] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleSelect = (e: any) => {
    const id = e.target.value
    setSelectedId(id)
    const obj = objects.find((o) => o.id === id)
    setDescription(obj?.description || '')
  }

  const handleDescriptionChange = (e: any) => {
    const text = e.target.value
    setDescription(text)
    if (selectedId) updateDescription(selectedId, text)
  }

  const handleDelete = () => {
    if (selectedId) {
      deleteObject(selectedId)
      setSelectedId('')
      setDescription('')
    }
  }

  const handleConnect = () => {
    if (objects.length >= 2) {
      connectObjects(objects[0].id, objects[1].id)
      alert(`Связь между ${objects[0].id} → ${objects[1].id} создана`)
    } else {
      alert('Нужно минимум 2 объекта')
    }
  }

  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        borderRight: '1px solid #ccc',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Объекты
      </Typography>
      <Button variant="contained" fullWidth onClick={addCube} sx={{ mb: 1 }}>
        Куб
      </Button>
      <Button variant="contained" fullWidth onClick={addSphere} sx={{ mb: 1 }}>
        Сфера
      </Button>
      <Button variant="contained" fullWidth onClick={addCylinder} sx={{ mb: 1 }}>
        Цилиндр
      </Button>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Связи
      </Typography>
      <Button variant="outlined" fullWidth onClick={handleConnect}>
        Создать связь
      </Button>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Описание объекта
      </Typography>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel>Выберите объект</InputLabel>
        <Select value={selectedId} onChange={handleSelect}>
          {objects.map((obj) => (
            <MenuItem key={obj.id} value={obj.id}>
              {obj.id} ({obj.type})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Описание"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={handleDescriptionChange}
        disabled={!selectedId}
        sx={{ mb: 2 }}
      />
      <Button variant="outlined" color="error" fullWidth onClick={handleDelete}>
        Удалить объект
      </Button>
    </Box>
  )
}

export default Sidebar