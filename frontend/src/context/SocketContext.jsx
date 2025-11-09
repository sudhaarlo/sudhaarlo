// src/context/SocketContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth.js'; // Use the hook to get user info

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth(); // Get the logged-in user

    useEffect(() => {
        // Only connect if there is a logged-in user
        if (user && user.id) { 
            // Connect to the server
            const newSocket = io("http://localhost:5000"); // Your backend server URL
            setSocket(newSocket);

            // Register this user with the server
            newSocket.emit('registerUser', user.id); 

            // Clean up connection on logout or component unmount
            return () => newSocket.close();
        } else {
            // If no user, disconnect any existing socket
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]); // Re-run this effect whenever the user object changes

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};