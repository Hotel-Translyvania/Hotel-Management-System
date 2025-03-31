import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Booking from './Booking';
import GuestPreference from './GuestPrefrences';
import BookingHistory from './BookingHistory';
import Header from './Header';
import StaffNotes from './StaffNotes';
import {guest, contactInfo, bookingHistory, preferences, currentBooking} from './dummy_datas';
import React from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const urls = [
  //     "https://hotel.free.beeceptor.com/api/guest",
  //     "https://hotel.free.beeceptor.com/api/contactInfo",
  //     "https://hotel.free.beeceptor.com/api/currentBooking",
  //     "https://hotel.free.beeceptor.com/api-booking-details",
  //     "https://hotel.free.beeceptor.com/api/preference"
  //   ];

  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setIsError(false);
  //     try {
  //       const responses = await Promise.all(
  //         urls.map(url => 
  //           fetch(url, {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //               // "Authorization":
  //             },
  //           })
  //         )
  //       );

       
  //       const errors = responses.filter(response => !response.ok);
  //       if (errors.length > 0) {
  //         throw new Error(`HTTP error! status: ${errors.map(e => e.status).join(', ')}`);
  //       }

  //       const jsonData = await Promise.all(responses.map(res => res.json()));
  //       setData(jsonData);
  //     } catch (error) {
  //       setIsError(true);
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    
    checkScreenSize();
    
    
    window.addEventListener('resize', checkScreenSize);
    
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  useEffect(() => {
    // Simulating a delay like fetching data from an API
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }


    // ... [keep existing state and effects]
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Header />
        <div><hr></hr></div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '500px 1fr', // Adjust sidebar width
        
        }}>
          {/* Left Sidebar - Sticky with independent scroll */}
          <div>
            <SideBar 
              guestData={guest} 
              contactInfo={contactInfo}
            />
          </div>
  
          {/* Main Content Area - Primary scroll */}
          <div style={{
            overflowY: 'auto',
            height: '100vh',
            padding: '1rem'
          }}>
            <Booking currentBooking={currentBooking} />
            <GuestPreference preferences={preferences} />
            <BookingHistory bookings={bookingHistory} />
            <StaffNotes  /> 
            
            {/* Footer in normal document flow */}
            <div style={{
              padding: '2rem 0',
              textAlign: 'center',
              color: '#666'
            }}>
              <div></div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
export default App;

