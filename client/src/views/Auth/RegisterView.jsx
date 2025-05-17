import { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Tooltip,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthViewModel } from '../../viewModels/authViewModel';
import logo from '../../assets/logo.png';

export default function RegisterView() {
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { registerUser, loginUser, loading, error } = useAuthViewModel();
  const navigate = useNavigate();

  const steps = ['Email', 'Personal Info', 'Security'];

  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isNameValid = (name) => typeof name === 'string' && name.trim().length >= 2;
  const isPasswordValid = (pw) => typeof pw === 'string' && pw.length >= 8 && /(?=.*[0-9])(?=.*[A-Za-z])/.test(pw);

  const validateStep = useCallback(() => {
    const errors = {};
    if (activeStep === 0) {
      if (!form.email) errors.email = 'Email is required';
      else if (!isEmailValid(form.email)) errors.email = 'Please provide a valid email address';
    }
    if (activeStep === 1) {
      if (!form.name) errors.name = 'Full name is required';
      else if (!isNameValid(form.name)) errors.name = 'Name must be at least 2 characters';
    }
    if (activeStep === 2) {
      if (!form.password) errors.password = 'Password is required';
      else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';
      else if (!/(?=.*[0-9])(?=.*[A-Za-z])/.test(form.password)) errors.password = 'Password must contain letters and numbers.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [activeStep, form]);

  useEffect(() => {
    if (error) {
      if (error.toLowerCase().includes('email')) {
        setFormErrors((prev) => ({ ...prev, email: error }));
        setActiveStep(0);
      }
      setShowAlert(true);
    }
  }, [error]);

  const isStepValid = () => {
    if (activeStep === 0) return isEmailValid(form.email);
    if (activeStep === 1) return isNameValid(form.name);
    if (activeStep === 2) return isPasswordValid(form.password);
    return false;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    const registered = await registerUser(form);
    if (registered) {
      setShowSuccess(true);
      const loggedIn = await loginUser({ email: form.email, password: form.password });
      if (loggedIn) navigate('/');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
        }}
      >
        <Box
          sx={{
            border: '4px solid #fcdde4',
            borderTop: '4px solid #f48ca1',
            borderRadius: '50%',
            width: 48,
            height: 48,
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: 4,
          boxShadow: 10,
          p: 4,
        }}
      >
        <Avatar
          src={logo}
          alt="Company Logo"
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2, boxShadow: '0 4px 12px rgba(244, 167, 185, 0.4)' }}
        />

        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#F4A7B9', mb: 3 }}>
          Create Your Account
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepIcon-root.Mui-active': { color: '#F4A7B9' },
                  '& .MuiStepIcon-root.Mui-completed': { color: '#F4A7B9' },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 2 }}>
          Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {activeStep === 0 && (
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!formErrors.email}
              helperText={formErrors.email || "We'll never share your email."}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#F4A7B9' }} />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#F4A7B9' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
              }}
            />
          )}

          {activeStep === 1 && (
            <TextField
              label="Full Name"
              fullWidth
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!formErrors.name}
              helperText={formErrors.name || "Enter your full name (at least 2 characters)."}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#F4A7B9' }} />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#F4A7B9' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
              }}
            />
          )}

          {activeStep === 2 && (
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={!!formErrors.password}
              helperText={formErrors.password || "Min. 8 characters, must include letters and numbers."}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#F4A7B9' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Use at least 8 characters with letters and numbers.">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#F4A7B9' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              color: '#F4A7B9',
              '&.Mui-disabled': { color: 'rgba(0, 0, 0, 0.26)' },
            }}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              disabled={!isStepValid()}
              sx={{
                backgroundColor: '#F4A7B9',
                '&:hover': { backgroundColor: '#ec8ca1' },
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(244, 167, 185, 0.5)',
              }}
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
              sx={{
                backgroundColor: '#F4A7B9',
                '&:hover': { backgroundColor: '#ec8ca1' },
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(244, 167, 185, 0.5)',
              }}
            >
              Next
            </Button>
          )}
        </Box>

        <Typography align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          Already have an account?{' '}
          <Typography
            component={Link}
            to="/login"
            sx={{ color: '#F4A7B9', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Log In
          </Typography>
        </Typography>
      </Box>

      <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
        <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
          {error || 'An error occurred during registration.'}
        </Alert>
      </Snackbar>

      <Snackbar open={showSuccess} autoHideDuration={4000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Registration successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
}
