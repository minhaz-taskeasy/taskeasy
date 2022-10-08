import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const [auth, setAuth] = useState({});
	useEffect(() => {
		const a = localStorage.getItem("auth");
		const auth = JSON.parse(a);
		console.log(auth);
		setAuth(auth);
	}, []);
	console.log(auth);
	const location = useLocation();

	return auth?.user ? (
		<Outlet children={children} />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
