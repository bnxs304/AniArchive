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
import { Send as SendIcon, Store as StoreIcon } from '@mui/icons-material';
import { submitVendorApplication, validateVendorForm } from '../../services/formSubmissionService';

const VendorPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [formData, setFormData] = useState({
        businessName: '',
        primaryContact: '',
        email: '',
        phoneNumber: '',
        websiteSocials: '',
        eventNameDate: '',
        productServiceType: [],
        productServiceDescription: '',
        specialRequirements: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const productServiceOptions = [
        'Anime Merchandise',
        'Manga/Comics',
        'Art Prints & Posters',
        'Cosplay Accessories',
        'Gaming Accessories',
        'TCG Cards & Games',
        'Handmade Crafts',
        'Food & Beverages',
        'Digital Art Services',
        'Photography Services',
        'Other (specify in description)'
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

    const handleProductServiceChange = (option) => {
        setFormData(prev => ({
            ...prev,
            productServiceType: prev.productServiceType.includes(option)
                ? prev.productServiceType.filter(item => item !== option)
                : [...prev.productServiceType, option]
        }));
    };

    const validateForm = () => {
        const newErrors = validateVendorForm(formData);
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
            const result = await submitVendorApplication(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    businessName: '',
                    primaryContact: '',
                    email: '',
                    phoneNumber: '',
                    websiteSocials: '',
                    eventNameDate: '',
                    productServiceType: [],
                    productServiceDescription: '',
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
                        Become a Vendor
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
                        Showcase your products and services to anime and gaming enthusiasts
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
                                    <StoreIcon sx={{ color: 'white', mr: 2, fontSize: '2rem' }} />
                                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                                        Vendor Opportunities
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    Join us as a vendor and showcase your products to hundreds of anime and gaming fans. 
                                    Our events provide excellent opportunities to connect with your target audience and grow your business.
                                </Typography>
                                
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                                    We welcome vendors offering anime merchandise, manga, art prints, cosplay accessories, 
                                    gaming products, handmade crafts, food & beverages, and more. We offer flexible pricing options and booth sizes to suit your needs.
                                </Typography>

                                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                                    What we offer:
                                </Typography>
                                <Box component="ul" sx={{ color: 'rgba(255,255,255,0.9)', pl: 2 }}>
                                    <li>Prime vendor locations with high foot traffic</li>
                                    <li>Access to engaged <b>anime and gaming</b> community</li>
                                    <li>Marketing support and event promotion</li>
                                    <li>Networking opportunities with other vendors</li>
                                    <li><b>Flexible </b>booth sizes and<b> affordable </b>pricing options</li>
                                    <li>Event staff support and assistance</li>

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
                                Vendor Application Form
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
                                    label="Business Name"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleInputChange}
                                    error={!!errors.businessName}
                                    helperText={errors.businessName}
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
                                    label="Event Name & Date"
                                    name="eventNameDate"
                                    value={formData.eventNameDate}
                                    onChange={handleInputChange}
                                    error={!!errors.eventNameDate}
                                    helperText={errors.eventNameDate}
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

                                <FormControl component="fieldset" error={!!errors.productServiceType} sx={{ mb: 3 }}>
                                    <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                        Product/Service Type (Check all that apply) *
                                    </FormLabel>
                                    <FormGroup>
                                        {productServiceOptions.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={formData.productServiceType.includes(option)}
                                                        onChange={() => handleProductServiceChange(option)}
                                                        sx={{ 
                                                            color: 'rgba(255,255,255,0.7)',
                                                            '&.Mui-checked': { color: theme.palette.secondary.main }
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{ color: 'rgba(255,255,255,0.9)' }}
                                            />
                                        ))}
                                    </FormGroup>
                                    {errors.productServiceType && (
                                        <FormHelperText>{errors.productServiceType}</FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Please describe your products in detail, including any featured anime series, original works, etc."
                                    name="productServiceDescription"
                                    multiline
                                    rows={4}
                                    value={formData.productServiceDescription}
                                    onChange={handleInputChange}
                                    error={!!errors.productServiceDescription}
                                    helperText={errors.productServiceDescription}
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

export default VendorPage;
