import React from "react";
import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

const SkeletonCard = () => {
  return (
    <Card sx={{maxWidth: "350px",
     width: "100%", borderRadius: 2, boxShadow: 3 }}>
      {/* Image Placeholder */}
      <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 1 }} />
      
      <CardContent>
        {/* Title Placeholder */}
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
        
        {/* Price Placeholder */}
        <Skeleton variant="text" width="30%" height={30} sx={{ marginTop: 1 }} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
