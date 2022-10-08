import { Button, Divider, Form, Input, Typography } from "antd";
import axios from "axios";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App.config";
const { Title } = Typography;

const Register = () => {
	const [errMgs, setErrMgs] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const onFinish = (values) => {
		axios
			.post(`${BASE_URL}/auth/register`, values)
			.then((res) => {
				if (res.data.status_code === 200) {
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
				Sign up to join with Taskeasy
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
					name="registerForm"
					style={{ width: "100%" }}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					initialValues={{
						remember: true,
					}}
				>
					<Form.Item
						name="name"
						label="Name"
						tooltip="What do you want others to call you?"
						rules={[
							{
								required: true,
								message: "Please input your Name!",
								whitespace: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="E-mail"
						rules={[
							{
								type: "email",
								message: "The input is not valid E-mail!",
							},
							{
								required: true,
								message: "Please input your E-mail!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
							{ min: 8, message: "Username must be minimum 8 characters." },
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error(
											"The two passwords that you entered do not match!"
										)
									);
								},
							}),
						]}
					>
						<Input.Password />
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
					Have a Taskeasy account yet? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
