import React, { useEffect, useState } from "react";
import { Drawer, Button, Menu, Divider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../images/taskeasy.png";
import { leftMenu, rightMenu } from "./controller";
const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(!visible);
	};
	let { pathname: location } = useLocation();
	console.log(location);
	useEffect(() => {
		setVisible(false);
	}, [location]);
	return (
		<Menu
			theme="light"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between !important",
				width: "100%",
			}}
		>
			<div className="logo">
				<Link to="/">
					<img style={{ width: "150px" }} src={Logo} alt="Logo" />
				</Link>
			</div>
			<div
				className="navbar-menu"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "end",
					width: "100%",
				}}
			>
				<div className="leftMenu">
					{leftMenu.map((item) => (
						<Menu.Item
							key={item.slug}
							style={{
								backgroundColor: `${
									item.slug === location ? "#8cf9ff" : "transparent"
								}`,
							}}
						>
							<Link to={item.slug}>{item.title}</Link>
						</Menu.Item>
					))}
				</div>

				<Button className="menuButton" type="tex" onClick={showDrawer}>
					<MenuOutlined />
				</Button>

				<div className="rightMenu">
					{rightMenu.map((item) => (
						<Menu.Item
							key={item.slug}
							style={{
								backgroundColor: `${
									item.slug === location ? "#8cf9ff" : "transparent"
								}`,
							}}
						>
							<Link to={item.slug}>{item.title}</Link>
						</Menu.Item>
					))}
				</div>

				<Drawer
					title={<img style={{ width: "150px" }} src={Logo} alt="Logo" />}
					placement="right"
					closable={true}
					onClose={showDrawer}
					visible={visible}
					style={{ zIndex: "9999", textAlign: "center" }}
				>
					{leftMenu.map((item) => (
						<div
							key={item.slug}
							style={{
								backgroundColor: `${
									item.slug === location ? "#8cf9ff" : "transparent"
								}`,
							}}
						>
							<Link to={item.slug}>{item.title}</Link>
						</div>
					))}
					<Divider />
					{rightMenu.map((item) => (
						<div
							key={item.slug}
							style={{
								backgroundColor: `${
									item.slug === location ? "#8cf9ff" : "transparent"
								}`,
							}}
						>
							<Link to={item.slug}>{item.title}</Link>
						</div>
					))}
				</Drawer>
			</div>
		</Menu>
	);
};
export default Navbar;
