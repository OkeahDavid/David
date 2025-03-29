import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Enhanced device type detection function
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      console.log("User Agent:", ua);
      
      // More comprehensive detection pattern for mobile
      if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|webOS/i.test(ua)) {
        // Determine if it's a tablet or mobile
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
          console.log("Detected as: tablet");
          return 'tablet';
        }
        console.log("Detected as: mobile");
        return 'mobile';
      }
      
      console.log("Detected as: desktop");
      return 'desktop';
    };

    // Function to send analytics data
    const sendAnalytics = async () => {
      // Generate a session ID
      let sessionId = localStorage.getItem('metrics_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('metrics_session_id', sessionId);
      }
      
      const deviceType = getDeviceType();
      console.log("Sending analytics with device type:", deviceType);
      
      // Prepare the track data without country info initially
      let trackData = {
        projectApiKey: '95a8287ac5d341f3389961a512e5d953',
        page: window.location.pathname,
        referrer: document.referrer,
        sessionId: sessionId,
        userAgent: navigator.userAgent,
        deviceType: deviceType
      };
      
      // Try to get country information if possible
      try {
        const countryResponse = await fetch('https://ipapi.co/json/');
        if (countryResponse.ok) {
          const countryData = await countryResponse.json();
          // Add country info to the track data
          trackData = {
            ...trackData,
            country: countryData.country_name,
            region: countryData.region,
            city: countryData.city
          };
        }
      } catch (err) {
        console.error('Country detection error:', err);
        // Continue with basic tracking data
      }
      
      // Now send the analytics data (with or without country info)
      try {
        console.log("Sending track data:", trackData);
        
        const response = await fetch('http://localhost:3000/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackData),
          keepalive: true
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Track API response:", data);
        } else {
          console.error("Track API error:", await response.text());
        }
      } catch (err) {
        console.error('Analytics tracking error:', err);
      }
    };

    // Send analytics on page load and route changes
    sendAnalytics();
    
    // send a ping every few minutes
    const pingInterval = setInterval(() => {
      sendAnalytics();
    }, 4 * 60 * 1000); // Every 4 minutes
    
    
    return () => clearInterval(pingInterval);
  }, [location]);

  return null; 
};

export default Analytics;