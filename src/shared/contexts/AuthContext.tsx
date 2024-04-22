import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}
interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [acessToken, setAccessToken] = useState<string>();

    const isAuthenticated = useMemo(() => !!acessToken, [acessToken]);

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (token) {
            setAccessToken(JSON.parse(token));
        } else {
            setAccessToken(undefined);
        }

    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);

        if (result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.token));
            setAccessToken(result.token);
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
    }, []);

    return (
        <div>
            <AuthContext.Provider 
                value={{ isAuthenticated, login: handleLogin, logout: handleLogout}}
            >
                {children}
            </AuthContext.Provider>
        </div>
    );
}

export const useAuthContext = () => useContext(AuthContext);