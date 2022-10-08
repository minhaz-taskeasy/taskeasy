import { Button, Divider, Form, Input, Typography } from "antd";
import axios from "axios";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App.config";
import useAuth from "../hooks/useAuth";
const { Title } = Typography;

const Login = () => {
	const [errMgs, setErrMgs] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	const onFinish = (values) => {
		axios
			.post(`${BASE_URL}/auth/login`, values)
			.then((res) => {
				if (res.data.success) {
					setAuth(res.data);
					localStorage.setItem("auth", JSON.stringify(res.data));
					const destination = location?.state?.from || "/";
					navigate(destination, { replace: true });
				} else {
					setErrMgs(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrMgs(err.response?.data.message);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
			<Title level={3} style={{ textAlign: "center" }}>
				Log in to your account
			</Title>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					border: "1px solid #e6e6e6",
					borderRadius: "5px",
					padding: "0 20px",
				}}
			>
				<Button
					style={{
						marginTop: "20px",
						width: "100%",
						backgroundColor: "rgb(66, 133, 244)",
						border: "none",
					}}
					type="primary"
				>
					<GoogleOutlined />
					Continue with Google
				</Button>
				<Button
					style={{
						marginTop: "20px",
						width: "100%",
						backgroundColor: "rgb(59, 89, 153)",
						border: "none",
					}}
					type="primary"
				>
					<FacebookFilled />
					Continue with Facebook
				</Button>
				<Divider>OR</Divider>
				<Form
					name="loginform"
					style={{ width: "100%" }}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					initialValues={{
						remember: true,
					}}
				>
					<Form.Item
						name="email"
						label="Email (required)"
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input type="email" placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password (required)"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
							{ min: 8, message: "Username must be minimum 8 characters." },
						]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							style={{ marginBottom: "20px", width: "100%" }}
							type="primary"
						>
							Login
						</Button>
						<h5 style={{ textAlign: "center", color: "#ff5816" }}>{errMgs}</h5>
					</Form.Item>
				</Form>
				<p>
					Don't have a Taskeasy account yet? <Link to="/register">Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
