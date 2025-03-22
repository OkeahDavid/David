import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Function to send analytics data
    const sendAnalytics = () => {
      // Generate a session ID
      let sessionId = localStorage.getItem('metrics_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('metrics_session_id', sessionId);
      }
      
      // Send pageview data
      fetch('http://localhost:3000/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectApiKey: '155dbe305c18ac4ba5d33800be544c3a', // Replace with your actual API key
          page: window.location.pathname,
          referrer: document.referrer,
          sessionId: sessionId,
          userAgent: navigator.userAgent,
          deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        })
      }).catch(err => console.error('Analytics error:', err));
    };

    // Send analytics on page load and route changes
    sendAnalytics();
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;