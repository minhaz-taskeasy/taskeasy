import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	//get auth data from local storage
	useEffect(() => {
		const a = localStorage.getItem("auth");
		a && JSON.parse(a) ? setAuth(a) : setAuth({});
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
