'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { db } from '../utils/db';
import { addOrUpdateArtwork } from '../redux/artworksSlice';
import LightboxModal from './LightboxModal';
import { RootState } from '../redux/store';
import { Artwork } from '../types/artwork';


export default function GalleryGrid() {
    const dispatch = useDispatch();
    const artworks = useSelector((state: RootState) => state.artworks as Artwork[]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        db.artworks.toArray().then((arts: Artwork[]) => {
          arts.forEach(art => dispatch(addOrUpdateArtwork(art)));
        });
      }, [dispatch]);
  
      const handleOpenModal = (index: number) => {
        setSelectedIndex(index);
        setOpenModal(true);
      };

  if (!artworks.length) {
    return <Typography>No artworks uploaded yet.</Typography>;
  }

  return (
    <>
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h5">🎨 Gallery</Typography>
    </Box>
    
    <Box mt={4}>
    <Grid container spacing={3}>
      {artworks.map((art: Artwork, index: number) => (

        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={art.id}>

          <Card onClick={() => handleOpenModal(index)}
                sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 6 } }}
          >
              <CardMedia component="img" height="250" image={art.image} alt={art.title} />
              <CardContent>
                <Typography variant="h6">{art.title}</Typography>
                <Typography variant="body2" color="text.secondary">{art.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
      ))}
    </Grid>
    <LightboxModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        artworks={artworks}
        currentIndex={selectedIndex}
        setCurrentIndex={setSelectedIndex}
      />
    </Box>
    </>
  );
}
