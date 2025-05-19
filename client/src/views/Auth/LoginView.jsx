import { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  FormControl,
  Paper,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthViewModel } from '../../viewModels/authViewModel';
import logo from '../../assets/logo.png';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_HINT = 'Password must be at least 6 characters.';

export default function LoginView() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const { loginUser, loading, error } = useAuthViewModel();
  const navigate = useNavigate();

  const validateEmail = useCallback((email) => {
    if (!email) return 'Email is required';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
    return '';
  }, []);

  const validatePassword = useCallback((password) => {
    if (!password) return 'Password is required';
    if (password.length < PASSWORD_MIN_LENGTH)
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    return '';
  }, []);

  const validateForm = useCallback(() => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setFormErrors(newErrors);
    return !emailError && !passwordError;
  }, [form, validateEmail, validatePassword]);

  const isFormValid = useCallback(
    () => !validateEmail(form.email) && !validatePassword(form.password),
    [form, validateEmail, validatePassword],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await loginUser(form);
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setShowAlert(false);
  };

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  if (loading) {
    return <LoadingSpinner />;
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
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleFieldChange('email')}
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
            error={!!formErrors.email}
          />
        </FormControl>

        <FormControl fullWidth error={!!formErrors.password}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={form.password}
            onChange={handleFieldChange('password')}
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
                    <Tooltip title={PASSWORD_HINT}>
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
            helperText={formErrors.password || PASSWORD_HINT}
            error={!!formErrors.password}
          />
        </FormControl>

        <Box display="flex" justifyContent="flex-end">
          <Typography
            component={Link}
            to="/forgot-password"
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
