'use client';

import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addArtwork } from '../redux/artworksSlice';
import { Button, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';
import { db } from '../utils/db';

export default function UploadForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (title && image) {

        const newArt = {
            id: Date.now(),
            title,
            description,
            image,
        };
        
      dispatch(
        addArtwork(newArt)
      );
      await db.artworks.add(newArt); // Save to IndexedDB
      setTitle('');
      setDescription('');
      setImage(null);
      setOpenSnackbar(true); // Show success snackbar
    } else {
      alert('Please enter a title and select an image.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
        rows={3}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <Box mt={2}>
          <Typography variant="subtitle1">Preview:</Typography>
          <img src={image} alt="Preview" style={{ maxWidth: '300px', height: 'auto' }} />
        </Box>
      )}
      <Button variant="contained" onClick={handleSubmit}>
        Upload
      </Button>
      {/* ✅ Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Your art has been successfully uploaded!
        </Alert>
      </Snackbar>
    </Box>
  );
}
