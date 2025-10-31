'use client';

import { useState, useEffect } from 'react';
import { Upload, Delete } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import * as PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { StyledCardDropzone } from './ui';

const UIFileUploader = ({
  accept = 'image/png, image/jpeg', // Only accept .png and .jpg files
  multiple = false,
  onChange = () => { },
  title = 'Upload Images',
  label = '',
  initialImages = [],
  onDel = () => { },
  errorMessage = '',
  showDelBtn = false,
}) => {
  const [previews, setPreviews] = useState([]);
  const [removedPreviews, setRemovedPreviews] = useState([]);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop: (acceptedFiles) => {
      const invalidFiles = acceptedFiles.filter(
        (file) => file.type !== 'image/jpeg' && file.type !== 'image/png'
      );
      if (invalidFiles.length > 0) {
        setError('Only jpeg, jpg, and png files are allowed.');
        return;
      } else {
        setError('');
      }

      // Create previews for accepted files
      const newPreviews = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      // Handle state update based on whether multiple uploads are allowed
      if (multiple) {
        // Appending new previews to the existing list
        setPreviews((prev) => {
          const updatedPreviews = [...prev, ...newPreviews];
          onChange(updatedPreviews.map((item) => item.file)); // Pass files back to parent
          return updatedPreviews;
        });
      } else {
        // Replacing old preview if single file is allowed
        setPreviews(newPreviews);
        onChange(acceptedFiles[0]); // Update parent with single file
      }
    },
  });

  // Remove the image preview at the specified index
  // const handleRemoveImage = (index) => {
  //   const result = onDel(index); // Call the onDel prop function for deletion
  //   if (result) {
  //     setPreviews((prev) => {
  //       const updatedPreviews = prev.filter((_, i) => i !== index);
  //       onChange(updatedPreviews.map((item) => item.file)); // Update parent with the new list of files
  //       return updatedPreviews;
  //     });
  //   }
  // };
  const handleRemoveImage = (index) => {
    const previewToRemove = previews[index]; // Get the preview to be removed
    const result = onDel(index); // Call the onDel prop function for deletion

    if (result) {
      setPreviews((prev) => {
        const updatedPreviews = prev.filter((_, i) => i !== index); // Filter out the deleted image
        onChange(updatedPreviews.map((item) => item.file)); // Update parent with the new list of files
        return updatedPreviews;
      });

      // Add the preview to removedPreviews for cleanup
      if (previewToRemove && previewToRemove.preview) {
        setRemovedPreviews((prevRemoved) => [...prevRemoved, previewToRemove.preview]);
      }
    }
  };

  // Load initial images (if any) from the backend
  useEffect(() => {
    if (initialImages?.length > 0) {
      const initialPreviews = initialImages.map((image) => ({
        file: null, // No file object, just a URL for initial images
        preview: image,
      }));
      setPreviews(initialPreviews);
    }
  }, [initialImages]);


  useEffect(() => {
    removedPreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    if (removedPreviews.length > 0) {
      setRemovedPreviews([]);
    }
  }, [removedPreviews]);

  return (
    <Box my="0.5rem">
      <Typography fontWeight="800" variant="h5">
        {label}
      </Typography>
      <input type="file" multiple={multiple} hidden {...getInputProps()} />
      <StyledCardDropzone
        sx={(theme) => ({
          ...((errorMessage || error) && {
            border: `1px solid ${theme.palette.error.main}`,
            '&:hover': {
              border: `1px solid ${theme.palette.error.main}`,
            },
          }),
        })}
        isDragActive={isDragActive}
        {...getRootProps()}
      >
        <Upload />
        <Typography fontWeight={700}>{title}</Typography>
        <Typography color="text.main" variant="caption">
          Only jpeg, jpg, png are acceptable
        </Typography>
      </StyledCardDropzone>
      <Typography color="error" variant="caption">
        {error || errorMessage}
      </Typography>

      {/* Image Previews */}
      {previews.length > 0 && (
        <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
          {previews.map((filePreview, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              position="relative"
            >
              <Image
                src={filePreview.preview}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                priority
              />
              {/* Remove button */}
              {showDelBtn && previews.length > 1 && (
                <IconButton
                  size="small"
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    background: 'rgba(0,0,0,0.5)',
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Delete style={{ color: '#fff' }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UIFileUploader;

UIFileUploader.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onDel: PropTypes.func,
  label: PropTypes.string,
  initialImages: PropTypes.array, // Accept initial images as an array of URLs
};
