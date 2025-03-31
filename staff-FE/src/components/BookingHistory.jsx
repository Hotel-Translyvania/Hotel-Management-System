import React, { useState, useEffect } from 'react';

const BookingHistory = (props) => {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    
    checkScreenSize();
    
    
    window.addEventListener('resize', checkScreenSize);
    
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
      margin:"0px",
      fontFamily: 'Arial, sans-serif',
      padding: isMobile ? '0 10px' : '0'
    },
    heading: {
      color: '#333',
      marginBottom: '20px',
      fontSize: isMobile ? '20px' : '24px',
      paddingLeft: isMobile ? '10px' : '0'
    },
    tableContainer: {
      overflowX: 'auto',
      borderRadius: isMobile ? '8px' : '0',
      boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: !isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
    },
    tableHeaderCell: {
      padding: isMobile ? '8px 10px' : '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#f5f5f5',
      fontWeight: '600',
      color: '#444',
      fontSize: isMobile ? '14px' : 'inherit'
    },
    tableCell: {
      padding: isMobile ? '8px 10px' : '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #e0e0e0',
      fontSize: isMobile ? '14px' : 'inherit'
    },
    tableRow: {
      '&:hover': {
        backgroundColor: '#f9f9f9'
      }
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: isMobile ? '11px' : '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusCompleted: {
      backgroundColor: '#e6f7ee',
      color: '#00a65a'
    },
    statusPending: {
      backgroundColor: '#fff8e6',
      color: '#ff9900'
    },
    statusCancelled: {
      backgroundColor: '#fee',
      color: '#f44336'
    },
    mobileCard: {
      display: 'flex',
      flexDirection: 'column',
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    },
    mobileRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px'
    },
    mobileLabel: {
      fontWeight: '600',
      color: '#666',
      fontSize: '14px'
    },
    mobileValue: {
      textAlign: 'right'
    }
  };

  const getStatusStyle = (status) => {
    const statusLower = status.toLowerCase();
    return {
      ...styles.statusBadge,
      ...(statusLower === 'completed' && styles.statusCompleted),
      ...(statusLower === 'pending' && styles.statusPending),
      ...(statusLower === 'cancelled' && styles.statusCancelled)
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking History</h2>
      <div style={styles.tableContainer}>
        {isMobile ? (
          <div>
            {props.bookings.bookings.map((booking, index) => (
              <div key={index} style={styles.mobileCard}>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Booking ID:</span>
                  <span style={styles.mobileValue}>{booking.id}</span>
                </div>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Room:</span>
                  <span style={styles.mobileValue}>{booking.room}</span>
                </div>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Check-in:</span>
                  <span style={styles.mobileValue}>{booking.checkIn}</span>
                </div>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Check-out:</span>
                  <span style={styles.mobileValue}>{booking.checkOut}</span>
                </div>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Total Cost:</span>
                  <span style={styles.mobileValue}>{booking.totalCost}</span>
                </div>
                <div style={styles.mobileRow}>
                  <span style={styles.mobileLabel}>Status:</span>
                  <span style={styles.mobileValue}>
                    <span style={getStatusStyle(booking.status)}>
                      {booking.status}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeaderCell}>Booking ID</th>
                <th style={styles.tableHeaderCell}>Room</th>
                <th style={styles.tableHeaderCell}>Check-in</th>
                <th style={styles.tableHeaderCell}>Check-out</th>
                <th style={styles.tableHeaderCell}>Total Cost</th>
                <th style={styles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {props.bookings.bookings.map((booking, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{booking.id}</td>
                  <td style={styles.tableCell}>{booking.room}</td>
                  <td style={styles.tableCell}>{booking.checkIn}</td>
                  <td style={styles.tableCell}>{booking.checkOut}</td>
                  <td style={styles.tableCell}>{booking.totalCost}</td>
                  <td style={styles.tableCell}>
                    <span style={getStatusStyle(booking.status)}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;