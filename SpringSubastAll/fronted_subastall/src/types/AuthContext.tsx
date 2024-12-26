import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    token: string | null;
    user: {username: string} | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{username: string} | null>(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUsername = localStorage.getItem('authUsername');
        if (storedToken && storedUsername) {
            setToken(storedToken);
            setUser({ username: storedUsername });
        }
    }, []);


    const login = (token: string, username: string) => {
        setToken(token);
        setUser({ username });
        localStorage.setItem('authToken', token); // Guardar token en localStorage
        localStorage.setItem('authUsername', username);
    };
    
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUsername');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};