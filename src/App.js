import { Col, Layout, Row } from "antd";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
const { Header, Content } = Layout;

function App() {
	return (
		<Layout style={{ height: "100vh" }}>
			<Header style={{ backgroundColor: "white" }}>
				<Navbar />
			</Header>
			<Content>
				<Routes>
					{/*Public Routes */}
					<Route
						path="/"
						element={
							<Row justify="center">
								<Col
									lg={{ span: 18, offset: 4 }}
									xs={{ span: 24, offset: 0 }}
									style={{ margin: "0 auto", padding: "50px 0" }}
								>
									<Outlet />
								</Col>
							</Row>
						}
					>
						<Route path="login" element={<LoginPage />} />
						<Route path="register" element={<RegisterPage />} />
					</Route>

					{/*Private Routes */}
					<Route path="/*" element={<ProtectedRoute />}>
						<Route path="profile" element={<UserProfile />} />
						<Route path="dashboard" element={<Dashboard />} />
					</Route>

					{/*Catch All Routes */}
				</Routes>
			</Content>
		</Layout>
	);
}

export default App;
