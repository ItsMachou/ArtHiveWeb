import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check credentials against admin_accounts table
      const { data: adminAccount, error } = await supabase
        .from('admin_accounts')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) {
        console.error('Error checking admin credentials:', error);
        setError('An error occurred while logging in');
        return;
      }

      if (adminAccount) {
        // Successful login
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
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
      zoom: 0.8,
      color: '#333',
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
            <h1 style={styles.logoText}>ADMIN LOGIN</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? 'Logging in...' : 'ADMIN LOGIN'}
            </button>
          </form>
        </div>

        {/* Mascot Section */}
        <div style={styles.mascotContainer}>
          <img
            src="/assets/bee1.png"
            alt="Bee mascot with skateboard"
            style={styles.mascotImage}
          />
          <h2 style={styles.welcomeText}>Welcome Admin!</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;