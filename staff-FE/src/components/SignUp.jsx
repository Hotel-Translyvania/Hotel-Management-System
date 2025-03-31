import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Countries from './Countries';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    nationality: '',
    dob: '',
    idType: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Styles object
  const styles = {
    a: {

    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '20px',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif"
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      padding: '40px',
      width: '100%',
      maxWidth: '500px'
    },
    header: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#2d3436',
      marginBottom: '24px',
      textAlign: 'center'
    },
    oauthSection: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0',
      color: '#64748b'
    },
    dividerLine: {
      flex: 1,
      borderBottom: '1px solid #e2e8f0'
    },
    dividerText: {
      padding: '0 10px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#2d3436'
    },
    input: {
      width: '95%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border 0.2s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#0984e3',
      boxShadow: '0 0 0 2px rgba(9, 132, 227, 0.1)'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: 'white'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      minHeight: '80px',
      resize: 'vertical'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '5px',
      display: 'block'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    nextButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      width: '100%'
    },
    backButton: {
      backgroundColor: '#e2e8f0',
      color: '#64748b',
      width: '100%'
    },
    submitButton: {
      backgroundColor: '#10b981',
      color: 'white',
      width: '100%'
    },
    formButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '30px'
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#64748b'
    },
    loginLinkA: {
      color: '#3b82f6',
      textDecoration: 'none'
    },
    apiError: {
      color: '#ef4444',
      backgroundColor: '#fee2e2',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2 && !formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (step === 3) {
      if (!formData.idType) newErrors.idType = 'ID type is required';
      if (!formData.idNumber) newErrors.idNumber = 'ID number is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    setApiError('');
    const url = '/api/signup'; // Replace with  API endpoint
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const result = await response.json();
      console.log('Signup successful:', result);
      // Redirect or show success message
    } catch (error) {
      console.error('Signup error:', error);
      setApiError(error.message || 'An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('', {   // Replace with API endpoint where the backend handles Google token
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential })
      });

      if (!response.ok) throw new Error('Google authentication failed');
      
      const result = await response.json();
      console.log('Google auth success:', result);
    } catch (error) {
      console.error('Google auth error:', error);
      setApiError('Failed to authenticate with Google');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Create Your Account</h2>
        
        {apiError && <div style={styles.apiError}>{apiError}</div>}
        
        <div style={styles.oauthSection}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setApiError('Google Login Failed')}
            size="medium"
            text="signup_with"
            shape="rectangular"
            theme="filled_blue"
          />
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step" style={styles.textarea}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                  
                />
                {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                  
                />
                {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  
                />
                {errors.phone && <span style={styles.error}>{errors.phone}</span>}
              </div>

              <button 
                type="button" 
                style={{ ...styles.button, ...styles.nextButton }}
                onClick={nextStep}
                disabled={isSubmitting}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.select}><Countries /></div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  style={styles.input}
                 
                />
                {errors.dob && <span style={styles.error}>{errors.dob}</span>}
              </div>

              <div style={styles.formButtons}>
                <button 
                  type="button" 
                  style={{ ...styles.button, ...styles.backButton }}
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  style={{ ...styles.button, ...styles.nextButton }}
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div style={styles.formGroup}>
                <label style={styles.label}>Identification Type</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select</option>
                  <option value="passport">Passport</option>
                  <option value="national-id">National ID</option>
                  <option value="driver-license">Driver License</option>
                </select>
                {errors.idType && <span style={styles.error}>{errors.idType}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Identification Number</label>
                <input
                  name="idNumber"
                  type="text"
                  value={formData.idNumber}
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
                {errors.idNumber && <span style={styles.error}>{errors.idNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
                {errors.password && <span style={styles.error}>{errors.password}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
                {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
              </div>

              <div style={styles.formButtons}>
                <button 
                  type="button" 
                  style={{ ...styles.button, ...styles.backButton }}
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  style={{ ...styles.button, ...styles.submitButton }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div style={styles.loginLink}>
          Already have an account? <a href="/login" style={styles.loginLinkA}>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;