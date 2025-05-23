import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust this path as needed

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setLoading(true);
    
    try {
      const verificationPageUrl = 'https://itsmachou.github.io/app-verification-pages/verification_success';
      
      // Sign up via Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            // You can add more user data like birthdate here
          },
          emailRedirectTo: verificationPageUrl,
        },
      });
      
      if (authError || !data || !data.user) {
        setError(`Sign up failed: ${authError?.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }
      
      // If sign up is successful, show a verification message
      setLoading(false);
      setError('');
      
      // Show confirmation message
      alert(`Please check your email (${email}) to verify your account before logging in.`);
      
      // Redirect user to login page after successful sign-up
      window.location.href = '/login';
      
    } catch (error) {
      setError(`Unexpected error: ${error.message}`);
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div style={styles.loginPage}>
      {/* Honeycomb Background */}
      <div>
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{ width: '300px', position: 'absolute', top: '-100px', left: '-100px', transform: 'rotate(25deg)' }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{ width: '300px', position: 'absolute', bottom: '-100px', left: '-150px', transform: 'rotate(-60deg)' }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{ width: '300px', position: 'absolute', top: '-100px', right: '-100px', transform: 'rotate(-60deg)' }}
        />
        <img
          src="/assets/honeycomb.png"
          alt="Honeycomb"
          style={{ width: '300px', position: 'absolute', bottom: '-80px', right: '-50px', transform: 'rotate(25deg)' }}
        />
      </div>

      <div style={styles.container}>
        {/* Sign Up Form */}
        <div style={styles.loginContainer}>
          <div style={styles.logo}>
            <img src="/assets/honeycomb.png" alt="Honeycomb Logo" style={styles.logoImage} />
            <h1 style={styles.logoText}>ARTHIVE</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={togglePasswordVisibility} style={styles.togglePassword}>
                {passwordVisible ? 'Hide' : 'Show'}
              </span>
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span onClick={toggleConfirmPasswordVisibility} style={styles.togglePassword}>
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </span>
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? 'Signing up...' : 'SIGN UP'}
            </button>
          </form>

          <div style={styles.signupText}>
            Already have an account?{' '}
            <a href="/login" style={styles.signupLink}>Log in</a>
          </div>
        </div>

        {/* Mascot Section */}
        <div style={styles.mascotContainer}>
          <img src="/assets/bee2.png" alt="Bee mascot" style={styles.mascotImage} />
          <h2 style={styles.welcomeText}>Bee a part of our Hive ka BeeRkada!</h2>
        </div>
      </div>
    </div>
  );
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
    padding: '25px',
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
    fontSize: '22px',
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
    padding: '10px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5',
    fontSize: '13px',
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
    padding: '10px',
    backgroundColor: '#ffa000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
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
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default SignUpPage;
