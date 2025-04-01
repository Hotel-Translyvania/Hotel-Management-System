import React from "react";

export default function GuestProfile(props) {
  const styles = {
    container: {
      width: '100%',
      borderRadius: '12px',
      padding: '24px',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      border: '1px solid #f0f0f0',
      maxWidth: '320px',
      margin: '10px auto'
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '16px',
      position: 'relative'
    },
    image: {
      borderRadius: '50%',
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      border: '4px solid #f8f9fa',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '8px'
    },
    name: {
      fontSize: '24px',
      fontWeight: '600',
      margin: '8px 0 4px',
      color: '#2d3436',
      lineHeight: '1.3'
    },
    id: {
      fontSize: '14px',
      color: '#636e72',
      letterSpacing: '0.5px'
    },
    status: {
      display: 'flex',
      justifyContent: 'center',
      margin: '16px 0'
    },
    statusBadge: {
      padding: '6px 18px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    active: {
      backgroundColor: '#00b894',
      color: 'white',
      boxShadow: '0 2px 8px rgba(0, 184, 148, 0.3)'
    },
    inactive: {
      backgroundColor: '#d63031',
      color: 'white',
      boxShadow: '0 2px 8px rgba(214, 48, 49, 0.3)'
    },
    divider: {
      height: '1px',
      width: '80%',
      background: 'linear-gradient(to right, transparent, #ddd, transparent)',
      margin: '20px 0',
      border: 'none'
    },
    actions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      width: '100%'
    },
    button: {
      padding: '12px 20px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flex: 1,
      maxWidth: '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    editButton: {
      backgroundColor: '#f0f0f0',
      color: '#2d3436',
      ':hover': {
        backgroundColor: '#e0e0e0',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }
    },
    checkoutButton: {
      backgroundColor: '#ff7675',
      color: 'white',
      ':hover': {
        backgroundColor: '#e84343',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(255, 118, 117, 0.3)'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img 
          src={props.data.image} 
          alt="Guest" 
          style={styles.image}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/128?text=Guest'
          }}
        />
      </div>

      <div style={styles.header}>
        <h1 style={styles.name}>{props.data.fname} {props.data.lname}</h1>
        <p style={styles.id}>Guest ID: {props.data.id}</p>
      </div>

      <div style={styles.status}>
        <span style={{
          ...styles.statusBadge,
          ...(props.data.active ? styles.active : styles.inactive)
        }}>
          {props.data.active ? "Active" : "Inactive"}
        </span>
      </div>

      <hr style={styles.divider} />

      <div style={styles.actions}>
        <button 
          style={{...styles.button, ...styles.editButton}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
        >
          Edit Profile
        </button>
        <button 
          style={{...styles.button, ...styles.checkoutButton}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e84343'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff7675'}
        >
          Check-out
        </button>
      </div>
    </div>
  );
}