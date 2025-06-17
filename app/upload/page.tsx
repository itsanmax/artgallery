'use client';

import UploadForm from '../../components/UploadForm';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function UploadPage() {
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Upload Your Artwork</Typography>
        <Link href="/" passHref>
          <Button variant="outlined">← Back to Gallery</Button>
        </Link>
      </Box>
      <UploadForm />
    </Container>
  );
}
