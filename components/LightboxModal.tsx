'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';

interface LightboxModalProps {
  open: boolean;
  onClose: () => void;
  artworks: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function LightboxModal({
  open,
  onClose,
  artworks,
  currentIndex,
  setCurrentIndex,
}: LightboxModalProps) {
  const artwork = artworks[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + artworks.length) % artworks.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % artworks.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, currentIndex]);

  if (!artwork) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle sx={{ textAlign: 'center' }}>{artwork.title}
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
        </IconButton>
        </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <Box flexGrow={1} textAlign="center">
            <img
              src={artwork.image}
              alt={artwork.title}
              style={{ maxWidth: '100%', maxHeight: '80vh' }}
            />
            {/* <Typography variant="h6" mt={2}>
              {artwork.title}
            </Typography> */}
            <Typography variant="body2">{artwork.description}</Typography>
          </Box>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
