import React, { Component } from "react";
import { Menu } from "antd";
const RightMenu = ({ mode }) => {
	return (
		<Menu mode={mode}>
			<Menu.Item key="mail">
				<a href="www.marca.com">Signin</a>
			</Menu.Item>
			<Menu.Item key="app">
				<a href="www.marca.com">Signup</a>
			</Menu.Item>
		</Menu>
	);
};

export default RightMenu;
