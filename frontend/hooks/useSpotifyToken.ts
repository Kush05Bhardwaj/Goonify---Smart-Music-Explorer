import { useState, useEffect } from 'react';

export function useSpotifyToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to get token from cookie (if you expose it)
    // Or fetch from a dedicated endpoint
    const getToken = async () => {
      try {
        // This would need a new endpoint that returns the token
        // For now, we'll pass it from the user data
        const response = await fetch('http://127.0.0.1:4000/api/auth/token', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        }
      } catch (error) {
        console.error('Failed to get token:', error);
      }
    };

    getToken();
  }, []);

  return token;
}
