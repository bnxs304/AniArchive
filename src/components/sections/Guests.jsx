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
import { Send as SendIcon, Person as PersonIcon } from '@mui/icons-material';
import { submitGuestApplication, validateGuestForm } from '../../services/formSubmissionService';

const Guests = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [formData, setFormData] = useState({
        guestName: '',
        primaryContact: '',
        email: '',
        phoneNumber: '',
        websiteSocials: '',
        guestType: [],
        guestDescription: '',
        guestAvailability: [],
        specialRequirements: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const guestTypeOptions = [
        'Voice Actor/Actress',
        'Anime Industry Professional',
        'Cosplayer',
        'Artist/Illustrator',
        'Content Creator/YouTuber',
        'Panelist/Speaker',
        'Performer',
        'Gaming Professional',
        'Manga Artist',
        'Composer/Musician',
        'Other (specify in description)'
    ];

    const availabilityOptions = [
        'Panel Discussion',
        'Q&A Session',
        'Meet & Greet',
        'Autograph Session',
        'Workshop/Demo',
        'Performance',
        'Interview',
        'Full Day Event',
        'Flexible Schedule'
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

    const handleGuestTypeChange = (option) => {
        setFormData(prev => ({
            ...prev,
            guestType: prev.guestType.includes(option)
                ? prev.guestType.filter(item => item !== option)
                : [...prev.guestType, option]
        }));
    };

    const handleAvailabilityChange = (option) => {
        setFormData(prev => ({
            ...prev,
            guestAvailability: prev.guestAvailability.includes(option)
                ? prev.guestAvailability.filter(item => item !== option)
                : [...prev.guestAvailability, option]
        }));
    };

    const validateForm = () => {
        const newErrors = validateGuestForm(formData);
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
            const result = await submitGuestApplication(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    guestName: '',
                    primaryContact: '',
                    email: '',
                    phoneNumber: '',
                    websiteSocials: '',
                    guestType: [],
                    guestDescription: '',
                    guestAvailability: [],
                    specialRequirements: ''
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
                        Become a Guest
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
                        Share your expertise and passion with anime and gaming fans
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
                                    <PersonIcon sx={{ color: 'white', mr: 2, fontSize: '2rem' }} />
                                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                                        Guest Opportunities
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    We're always looking for talented individuals to join us as guests at our anime conventions. 
                                    Whether you're a voice actor, artist, cosplayer, content creator, or industry professional, 
                                    we'd love to hear from you.
                                </Typography>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    Our guests have the opportunity to connect with passionate fans, share their knowledge through 
                                    panels and workshops, participate in meet & greets, and be part of creating memorable experiences 
                                    for our community.
                                </Typography>

                                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                                    What we offer:
                                </Typography>
                                <Box component="ul" sx={{ color: 'rgba(255,255,255,0.9)', pl: 2 }}>
                                    <li>Platform to showcase your work and expertise</li>
                                    <li>Engaged audience of anime and gaming fans</li>
                                    <li>Professional event management and support</li>
                                    <li>Networking opportunities with industry peers</li>
                                    <li>Flexible scheduling and activity options</li>
                                    <li>Marketing and promotional support</li>
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
                                Guest Application Form
                            </Typography>

                            {submitStatus === 'success' && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    Thank you for your application! We'll review it and get back to you soon.
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
                                    label="Guest Name/Group Name"
                                    name="guestName"
                                    value={formData.guestName}
                                    onChange={handleInputChange}
                                    error={!!errors.guestName}
                                    helperText={errors.guestName}
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
                                    label="Primary Contact Name"
                                    name="primaryContact"
                                    value={formData.primaryContact}
                                    onChange={handleInputChange}
                                    error={!!errors.primaryContact}
                                    helperText={errors.primaryContact}
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
                                    label="Website/Social Media Links"
                                    name="websiteSocials"
                                    value={formData.websiteSocials}
                                    onChange={handleInputChange}
                                    error={!!errors.websiteSocials}
                                    helperText={errors.websiteSocials}
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

                                <FormControl component="fieldset" error={!!errors.guestType} sx={{ mb: 3 }}>
                                    <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                        Guest Type (Check all that apply) *
                                    </FormLabel>
                                    <FormGroup>
                                        {guestTypeOptions.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={formData.guestType.includes(option)}
                                                        onChange={() => handleGuestTypeChange(option)}
                                                        sx={{ 
                                                            color: 'rgba(255,255,255,0.7)',
                                                            '&.Mui-checked': { color: '#feca57' }
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{ color: 'rgba(255,255,255,0.9)' }}
                                            />
                                        ))}
                                    </FormGroup>
                                    {errors.guestType && (
                                        <FormHelperText>{errors.guestType}</FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Please describe your work/interests in detail"
                                    name="guestDescription"
                                    multiline
                                    rows={4}
                                    value={formData.guestDescription}
                                    onChange={handleInputChange}
                                    error={!!errors.guestDescription}
                                    helperText={errors.guestDescription}
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

                                <FormControl component="fieldset" error={!!errors.guestAvailability} sx={{ mb: 3 }}>
                                    <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                        Guest Availability (Check all that apply) *
                                    </FormLabel>
                                    <FormGroup>
                                        {availabilityOptions.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={formData.guestAvailability.includes(option)}
                                                        onChange={() => handleAvailabilityChange(option)}
                                                        sx={{ 
                                                            color: 'rgba(255,255,255,0.7)',
                                                            '&.Mui-checked': { color: '#feca57' }
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{ color: 'rgba(255,255,255,0.9)' }}
                                            />
                                        ))}
                                    </FormGroup>
                                    {errors.guestAvailability && (
                                        <FormHelperText>{errors.guestAvailability}</FormHelperText>
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

export default Guests;
