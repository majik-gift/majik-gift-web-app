import { messaging } from '@/shared/services/firebase';
import { Close } from '@mui/icons-material';
import { Card, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { onMessage } from 'firebase/messaging';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const useHandleForeGroundNotifications = () => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!messaging) {
      console.log('Firebase messaging not initialized');
      return;
    }

    const unsubscribe = onMessage(messaging, async (payload) => {

      const { title, body } = await payload?.notification;

      enqueueSnackbar({
        variant: 'info',
        autoHideDuration: 5000,
        content: (key) => (
            <Card
              sx={{
                borderRadius: '10px',
                maxWidth: '400px',
                borderLeft: 5,
                borderColor: (theme) => theme.palette.primary.main,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
              elevation={5}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => closeSnackbar(key)}>
                    <Close />
                  </IconButton>
                }
              >
                <ListItemButton
                  borderRadius="10px"
                  onClick={() => {
                    closeSnackbar(key);
                    if (notificationType === 'new-message') {
                      router.push(`/chat?chatId=${chatId}`);
                    } else {
                      router.push('/notifications');
                    }
                  }}
                >
                  <ListItemText
                    primary={title}
                    secondary={body}
                    secondaryTypographyProps={{ 
                      noWrap: true,
                      color: 'primary.main',
                    }}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontWeight: 'bold',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Card>
        ),
      });
    });

    return () => {
      unsubscribe();
    };
  }, [path, router]);
};

export default useHandleForeGroundNotifications;
