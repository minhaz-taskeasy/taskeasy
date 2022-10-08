import { Col, Row, Typography } from "antd";
import Login from "../components/Login";

const { Title } = Typography;

const LoginPage = () => {
	return (
		<Row justify="center">
			<Col xs={{ span: 0, offset: 0 }} lg={{ span: 12, offset: 0 }}>
				<div className="login-content">
					<Title>Ready to scale your business?</Title>
					<p>
						Easily collaborate with your team with shared Zaps and app
						connections, a centralized login , and more
					</p>
				</div>
			</Col>
			<Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 4 }}>
				<Login />
			</Col>
		</Row>
	);
};

export default LoginPage;
