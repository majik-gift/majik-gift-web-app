"use client";
import { UIButton } from "@/shared/components";
import { Email, Phone, Edit } from "@mui/icons-material";
import { Avatar, Stack, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";

const Page = () => {
  const { user } = useSelector((state) => state.appReducer);
  const theme = useTheme();
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: isMobile ? 2 : 4,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          p: isMobile ? 3 : 4,
          borderRadius: 4,
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Stack spacing={3} alignItems="center">
          {/* Profile Avatar Section */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user?.profile_image}
              alt={user?.first_name}
              sx={{ 
                width: isMobile ? 120 : 150, 
                height: isMobile ? 120 : 150,
                fontSize: isMobile ? 48 : 64,
                bgcolor: theme.palette.primary.main
              }}
            >
              {!user?.profile_image && user?.first_name?.charAt(0)}
            </Avatar>
          </Box>

          {/* User Info Section */}
          <Stack spacing={2} width="100%">
            <Typography 
              variant="h4" 
              fontWeight={700} 
              textAlign="center"
              sx={{ color: theme.palette.text.primary }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>

            <Stack spacing={1.5} width="100%">
              <InfoItem 
                icon={<Email sx={{ fontSize: 'inherit' }} />} 
                text={user?.email} 
              />
              
              <InfoItem 
                icon={<FaAddressCard style={{ fontSize: 'inherit' }} />} 
                text={user?.address || "No address provided"} 
              />
              
              <InfoItem 
                icon={<Phone sx={{ fontSize: 'inherit' }} />} 
                text={user?.phone_number || "No phone number"} 
              />
            </Stack>
          </Stack>

          {/* Action Button */}
          <UIButton 
            variant="contained"
            startIcon={<Edit />}
            onClick={() => router.push("/my-profile/edit")}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
          >
            Edit Profile
          </UIButton>
        </Stack>
      </Box>
    </Box>
  );
};

// Updated InfoItem component with perfect icon alignment
const InfoItem = ({ icon, text }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      alignItems="flex-start" // Changed to flex-start for perfect alignment
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.action.hover
      }}
    >
      <Box sx={{ 
        color: theme.palette.primary.main,
        fontSize: isMobile ? '1rem' : '1.25rem',
        display: 'flex',
        alignItems: 'center',
        height: '24px' // Fixed height for perfect vertical alignment
      }}>
        {icon}
      </Box>
      <Typography 
        variant={isMobile ? "body2" : "body1"}
        sx={{ 
          wordBreak: 'break-word',
          color: text ? theme.palette.text.primary : theme.palette.text.secondary,
          lineHeight: '24px' // Match icon container height
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default Page;