import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  FormControl,
  CircularProgress,
  Paper,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthViewModel } from '../../viewModels/authViewModel';
import logo from '../../assets/logo.png';

export default function LoginView() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const { loginUser, loading, error } = useAuthViewModel();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordHint = 'Password must be at least 6 characters.';

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const isFormValid = () =>
    form.email &&
    validateEmail(form.email) &&
    form.password &&
    form.password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await loginUser(form);
      } catch (err) {
        console.error('Login failed:', err);
        return;
      } finally {
        navigate('/');
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setShowAlert(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background:
            'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
        }}
      >
        <CircularProgress size={48} sx={{ color: '#F4A7B9' }} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: '100%',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'translateY(-5px)' },
        }}
      >
        <Avatar
          src={logo}
          alt="Company Logo"
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            boxShadow: '0 4px 12px rgba(244, 167, 185, 0.4)',
          }}
        />

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ color: '#F4A7B9' }}
        >
          Welcome Back
        </Typography>

        <FormControl fullWidth error={!!formErrors.email}>
          <TextField
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email
                      sx={{
                        color: formErrors.email ? 'error.main' : '#F4A7B9',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#F4A7B9' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
            }}
            helperText={formErrors.email || 'Enter your email address.'}
          />
        </FormControl>

        <FormControl fullWidth error={!!formErrors.password}>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (formErrors.password)
                setFormErrors({ ...formErrors, password: '' });
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock
                      sx={{
                        color: formErrors.password ? 'error.main' : '#F4A7B9',
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={passwordHint}>
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#F4A7B9' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
            }}
            helperText={formErrors.password || passwordHint}
          />
        </FormControl>

        <Box display="flex" justifyContent="flex-end">
          <Typography
            component={Link}
            to="/login"
            sx={{
              color: '#F4A7B9',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Forgot password?
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isFormValid()}
          sx={{
            backgroundColor: '#F4A7B9',
            '&:hover': { backgroundColor: '#ec8ca1' },
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(244, 167, 185, 0.5)',
            transition: 'background-color 0.3s ease',
            '&.Mui-disabled': {
              backgroundColor: 'rgba(244,167,185,0.5)',
              color: 'rgba(255,255,255,0.7)',
              boxShadow: 'none',
              cursor: 'default',
            },
          }}
        >
          Log In
        </Button>

        <Typography align="center" sx={{ color: '#666' }}>
          Don't have an account?{' '}
          <Typography
            component={Link}
            to="/register"
            sx={{
              color: '#F4A7B9',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error || 'An error occurred during login.'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
