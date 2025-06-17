'use client';

import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { RootState } from '../redux/store'; // Replace with correct path if needed
import { Artwork } from '../types/artwork';


export default function ArtworkCarousel() {
  const artworks = useSelector((state: RootState) => state.artworks as Artwork[]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!artworks.length) {
    return <Typography>No artworks to show.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Art Slideshow
      </Typography>
      <Slider {...settings}>
        {artworks.map((art: any) => (
          <Box key={art.id} px={2}>
            <Card>
              <CardMedia component="img" height="400" image={art.image} alt={art.title} />
              <CardContent>
                <Typography variant="h6">{art.title}</Typography>
                <Typography variant="body2">{art.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
