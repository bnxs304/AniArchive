import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Alert,
    useTheme,
    useMediaQuery,
    Divider,
    Card,
    CardContent,
    Grid
} from '@mui/material';
import { Send as SendIcon, VolunteerActivism as VolunteerIcon } from '@mui/icons-material';
import { submitVolunteerApplication, validateVolunteerForm } from '../../services/formSubmissionService';
import { colors } from '../../styles/theme';

const Volunteers = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [formData, setFormData] = useState({
        volunteerName: '',
        email: '',
        phoneNumber: '',
        workExperience: '',
        volunteerDescription: '',
        whyVolunteer: '',
        availability: [],
        specialRequirements: '',
        over18: false
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const availabilityOptions = [
        'Setup (Day before event)',
        'Morning Shift (8:00 AM - 12:00 PM)',
        'Afternoon Shift (12:00 PM - 4:00 PM)',
        'Evening Shift (4:00 PM - 8:00 PM)',
        'Cleanup (After event)',
        'Full Day (8:00 AM - 8:00 PM)',
        'Flexible (Any time)'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAvailabilityChange = (option) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.includes(option)
                ? prev.availability.filter(item => item !== option)
                : [...prev.availability, option]
        }));
    };

    const validateForm = () => {
        const newErrors = validateVolunteerForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const result = await submitVolunteerApplication(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    volunteerName: '',
                    email: '',
                    phoneNumber: '',
                    workExperience: '',
                    volunteerDescription: '',
                    whyVolunteer: '',
                    availability: [],
                    specialRequirements: '',
                    over18: false
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ 
            py: { xs: 6, md: 10 },
            background: 'transparent',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
            }} />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Hero Title Section */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography 
                        variant="h1" 
                        component="h1"
                        sx={{ 
                            color: 'white',
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
                            lineHeight: 1.1,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Become a Volunteer
                    </Typography>
                    
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.95)',
                            mb: 3,
                            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
                            fontWeight: 300,
                            lineHeight: 1.4,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        Help make AniArchive events amazing while gaining valuable experience
                    </Typography>

                    {/* Decorative line */}
                    <Box sx={{ 
                        width: { xs: '60px', md: '80px' }, 
                        height: '4px', 
                        background: 'linear-gradient(90deg, #ff6b6b, #feca57)',
                        borderRadius: '2px',
                        mx: 'auto',
                        mb: 4
                    }} />
                </Box>

                <Grid container spacing={4}>
                    {/* Information Section */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ 
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            height: 'fit-content'
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <VolunteerIcon sx={{ color: 'white', mr: 2, fontSize: '2rem' }} />
                                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                                        What does it mean to be a volunteer?
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    A volunteer is someone who offers support to our events free of charge, assisting our team, 
                                    attendees, and helping the event run smoothly. Being a volunteer is a great way to gain 
                                    quality work experience in event management and customer service.
                                </Typography>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    Any necessary training will be provided to volunteers on the day of the event. 
                                    While volunteering, you'll be able to enjoy the event for free and be part of 
                                    creating amazing experiences for anime and gaming fans.
                                </Typography>

                                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                                    Requirements:
                                </Typography>
                                <Box component="ul" sx={{ color: 'rgba(255,255,255,0.9)', pl: 2 }}>
                                    <li>Must be over 18 years old</li>
                                    <li>Valid government-issued photo ID required</li>
                                    <li>Must be prepared to arrange own transport to and from the event</li>
                                    <li>Positive attitude and willingness to help</li>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Form Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ 
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            p: 4,
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 700 }}>
                                Volunteer Application Form
                            </Typography>

                            {submitStatus === 'success' && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    Thank you for your application! We'll be in touch soon.
                                </Alert>
                            )}

                            {submitStatus === 'error' && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    There was an error submitting your application. Please try again.
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="volunteerName"
                                    value={formData.volunteerName}
                                    onChange={handleInputChange}
                                    error={!!errors.volunteerName}
                                    helperText={errors.volunteerName}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <TextField
                                    fullWidth
                                    label="Work Experience (if any)"
                                    name="workExperience"
                                    multiline
                                    rows={3}
                                    value={formData.workExperience}
                                    onChange={handleInputChange}
                                    error={!!errors.workExperience}
                                    helperText={errors.workExperience}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <TextField
                                    fullWidth
                                    label="Please describe your work/interests in detail"
                                    name="volunteerDescription"
                                    multiline
                                    rows={3}
                                    value={formData.volunteerDescription}
                                    onChange={handleInputChange}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <TextField
                                    fullWidth
                                    label="Why do you want to volunteer?"
                                    name="whyVolunteer"
                                    multiline
                                    rows={3}
                                    value={formData.whyVolunteer}
                                    onChange={handleInputChange}
                                    error={!!errors.whyVolunteer}
                                    helperText={errors.whyVolunteer}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <FormControl component="fieldset" error={!!errors.availability} sx={{ mb: 3 }}>
                                    <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                        Volunteer Availability (Check all that apply) *
                                    </FormLabel>
                                    <FormGroup>
                                        {availabilityOptions.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={formData.availability.includes(option)}
                                                        onChange={() => handleAvailabilityChange(option)}
                                                        sx={{ 
                                                            color: 'rgba(255,255,255,0.7)',
                                                            '&.Mui-checked': { color: colors.secondary.main }
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{ color: 'rgba(255,255,255,0.9)' }}
                                            />
                                        ))}
                                    </FormGroup>
                                    {errors.availability && (
                                        <FormHelperText>{errors.availability}</FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Special Requirements/Requests (if any)"
                                    name="specialRequirements"
                                    multiline
                                    rows={2}
                                    value={formData.specialRequirements}
                                    onChange={handleInputChange}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        sx: { 
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#feca57' }
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.over18}
                                            onChange={handleInputChange}
                                            name="over18"
                                            sx={{ 
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-checked': { color: '#feca57' }
                                            }}
                                        />
                                    }
                                    label="I confirm that I am over 18 years old"
                                    sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}
                                />
                                {errors.over18 && (
                                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                        {errors.over18}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isSubmitting}
                                    startIcon={<SendIcon />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                                        color: 'white',
                                        py: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #ff5252, #ffb74d)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                        },
                                        '&:disabled': {
                                            background: 'rgba(255,255,255,0.2)',
                                            color: 'rgba(255,255,255,0.5)'
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Volunteers;
