import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Enhanced device type detection function
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      
      // More comprehensive detection pattern for mobile
      if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|webOS/i.test(ua)) {
        // Determine if it's a tablet or mobile
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
          return 'tablet';
        }
        return 'mobile';
      }
      
      return 'desktop';
    };

    // Helper function to fetch with timeout
    const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(id);
        return response;
      } catch (error) {
        clearTimeout(id);
        throw error;
      }
    };

    // Function to send analytics data
    const sendAnalytics = async () => {
      try {
        // Generate a session ID
        let sessionId = localStorage.getItem('metrics_session_id');
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15);
          localStorage.setItem('metrics_session_id', sessionId);
        }
        
        const deviceType = getDeviceType();
        
        // Prepare the track data without country info 
        let trackData = {
          projectApiKey: '95a8287ac5d341f3389961a512e5d953',
          page: window.location.pathname,
          referrer: document.referrer || 'direct',
          sessionId: sessionId,
          userAgent: navigator.userAgent,
          deviceType: deviceType
        };
        
        // Try to get country information if possible (with timeout)
        try {
          const countryResponse = await fetchWithTimeout('https://ipapi.co/json/', {}, 2000);
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
          // Silently fail for country detection - no need to log to console
          // Just continue with basic tracking data
        }
        
        // Now send the analytics data (with or without country info)
        try {
          await fetchWithTimeout('https://metrics-hub.netlify.app/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trackData),
            keepalive: true
          }, 2000);
          
          // No need to check response.ok or log errors
        } catch (err) {
          // Silently fail for analytics tracking - no need to log to console
        }
      } catch (err) {
        // Catch any other unexpected errors without logging
      }
    };

    // Send analytics on page load and route changes
    // Use setTimeout to avoid blocking initial render
    const initialTimer = setTimeout(() => {
      sendAnalytics();
    }, 500);
    
    // send a ping less frequently (10 minutes instead of 4)
    const pingInterval = setInterval(() => {
      sendAnalytics();
    }, 10 * 60 * 1000); // Every 10 minutes
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(pingInterval);
    };
  }, [location]);

  return null; 
};

export default Analytics;