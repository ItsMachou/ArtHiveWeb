import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false; // Cleanup on unmount
    };
  }, []);

  const isEmail = (input) => {
    return input.includes('@') && input.includes('.');
  };

  const validateForm = () => {
    if (!loginInput.trim()) {
      setError('Email or Username is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hide any active toasts
    toast.dismiss();
    
    if (!validateForm() || loading) return;

    setLoading(true);
    setError('');

    const loginInputTrimmed = loginInput.trim();
    let emailToUse;

    try {
      if (isEmail(loginInputTrimmed)) {
        emailToUse = loginInputTrimmed;
      } else {
        // Username lookup
        console.log("Attempting lookup for username:", loginInputTrimmed);
        try {
          const { data: response, error: lookupError } = await supabase
            .from('users_tb')
            .select('u_em')
            .eq('u_un', loginInputTrimmed)
            .maybeSingle();

          if (lookupError) {
            console.error("Database lookup error:", lookupError.message);
            throw new Error(`Login failed. Please try again. DB Error: ${lookupError.code || 'Unknown'}`);
          }

          if (!response || !response.u_em) {
            console.log("No email found for username:", loginInputTrimmed);
            throw new Error('Invalid Credentials');
          }

          emailToUse = response.u_em;
          console.log("Found email:", emailToUse, "for username:", loginInputTrimmed);
        } catch (dbError) {
          throw new Error(dbError.message || 'Username lookup failed');
        }
      }

      // Proceed with email sign-in
      console.log("Attempting login with email:", emailToUse);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: password
      });

      if (mounted.current) {
        if (authError) {
          console.error("Auth Error:", authError.message);
          toast.error("Login failed: Invalid Credentials", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }

        if (!authData.user) {
          console.log("Login seemed successful but no user object returned.");
          throw new Error('Login failed: Unexpected response.');
        }

        console.log("Login successful for user:", authData.user.id);

        // Optional: Load Cart Here
        try {
          // await CartService.loadCartFromDatabase();
          console.log("Cart loading initiated after login.");
        } catch (cartError) {
          console.error("Error loading cart after login:", cartError);
          // Continue with navigation even if cart fails to load
        }

        navigate('/home');
      }
    } catch (error) {
      if (mounted.current) {
        console.error("Login error:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        
        if (error.message.includes('Invalid Credentials')) {
          errorMessage = "Login failed: Invalid Credentials";
        } else if (error.message.includes("Failed to create order record")) {
          errorMessage = "Login error related to order system. Please contact support.";
        } else {
          errorMessage = error.message;
        }

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  const styles = {
    loginPage: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      position: 'relative',
      zIndex: 1,
    },
    loginContainer: {
      backgroundColor: 'rgba(255, 250, 240, 0.97)',
      padding: '40px',
      borderRadius: '20px',
      width: '360px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 193, 7, 0.1)',
      transform: 'translate(-50px, 20px)',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '25px',
    },
    logoImage: {
      width: '80px',
      height: 'auto',
      margin: '0 auto',
    },
    logoText: {
      fontSize: '24px',
      color: '#ffa000',
      marginTop: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    formGroup: {
      marginBottom: '20px',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      backgroundColor: '#f5f5f5',
      fontSize: '14px',
      color: '#333',
    },
    togglePassword: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '12px',
      color: '#9e9e9e',
      cursor: 'pointer',
      fontSize: '14px',
    },
    loginBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ffa000',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      textTransform: 'uppercase',
    },
    signupText: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '14px',
      color: '#757575',
    },
    signupLink: {
      color: '#ffa000',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    mascotContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mascotImage: {
      width: '220px',
      height: 'auto',
      marginBottom: '20px',
    },
    welcomeText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
    },
  };

  return (
    <div style={styles.loginPage}>
      {/* Honeycomb Background */}
      <div>
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{
            width: '300px',
            height: 'auto',
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            transform: 'rotate(25deg)',
          }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{
            width: '300px',
            height: 'auto',
            position: 'absolute',
            bottom: '-100px',
            left: '-150px',
            transform: 'rotate(-60deg)',
          }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{
            width: '300px',
            height: 'auto',
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            transform: 'rotate(-60deg)',
          }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{
            width: '300px',
            height: 'auto',
            position: 'absolute',
            bottom: '-80px',
            right: '-50px',
            transform: 'rotate(25deg)',
          }}
        />
      </div>

      <div style={styles.container}>
        {/* Login Form Section */}
        <div style={styles.loginContainer}>
          <div style={styles.logo}>
            <img
              src="/assets/honeycomb.png"
              alt="Honeycomb Logo"
              style={styles.logoImage}
            />
            <h1 style={styles.logoText}>ARTHIVE</h1>
          </div>

          <form onSubmit={handleSubmit} ref={formRef}>
            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Username or Email"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div 
                style={{
                  ...styles.togglePassword,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </span>
                <span>I Forgot?</span>
              </div>
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>

          <div style={styles.signupText}>
            Don't have an account?{' '}
            <a href="/signup" style={styles.signupLink}>Sign up</a>
          </div>
        </div>

        {/* Mascot Section */}
        <div style={styles.mascotContainer}>
          <img
            src="/assets/bee1.png"
            alt="Bee mascot with skateboard"
            style={styles.mascotImage}
          />
          <h2 style={styles.welcomeText}>Welcome Back!</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
