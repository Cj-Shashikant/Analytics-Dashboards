'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';

interface PresentationFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationFilter({
  isOpen,
  onClose,
}: PresentationFilterProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Presentation Playlists</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            Presentation playlist management options will be displayed here.
          </Typography>
          {/* Add your presentation playlist content here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onClose} variant="contained">
          Start Presentation
        </Button>
      </DialogActions>
    </Dialog>
  );
}
