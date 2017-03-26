import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconPerson from 'material-ui/svg-icons/social/person';
import Lock from 'material-ui/svg-icons/action/lock';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';

const HeaderNav = styled.header`
		background: #cc3d33;
		margin: 0px;
`;

const Navigation = styled.nav`
	margin-bottom: 0px;
	border-radius: 0px;
	position: relative;
	min-height: 50px;
	font-size: 14px;
	border: none;
	color: white;
`;

const MenuGroup = styled.ul`	
	display: flex;
	margin: 0;
	align-items: center;
	padding: 0;
	list-style-type: none;
`;

const MenuItem = styled.li`
	
`

const LogoItem = styled(MenuItem)`
	width: 100px;
	height: 50px;
	padding: 5px;
`

const Code = styled.code`
	background: none;
	color: white;
`;

const LogoImage = styled.img`
		padding-top: 5px;
		width: 85%;
		height: 85%;
`;

const CodeGroup = styled.div`
		line-height: 1.5em;
`;

const styles = {
  flex: {
    display: 'flex',
  },
	red: {
		backgroundColor: '#cc3d33'
	},
  fullWidth: {
    width: '100%',
  },
  spaceItems: {
    marginRight: 20,
  },
};

let logo = '/header.png';
if (process.env.BROWSER) {
		logo = require("./header.png");
}

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false
		}
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleTouchTap = this.handleTouchTap.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
	}
	
	handleRequestClose() {
		this.setState({
			open: false,
		});
	}	

	handleTouchTap() {
		this.setState({
			open: true,
		});
	}

	handleLogIn() {
		this.refs.form.submit();
	}

	render() {
		const standardActions = process.env.BROWSER ? [
			<RaisedButton
				label="Close"
				style={styles.spaceItems}
				onTouchTap={this.handleRequestClose}
			/>,
			<RaisedButton
				label="Log In"
				primary={true}
				backgroundColor={styles.red}
				onTouchTap={this.handleLogIn}
			/>
		] : [];
		return (
				<HeaderNav className="navbar">
					<Navigation className="wrapper">
						<MenuGroup>
							<LogoItem style={{'flex' : '2 0 0'}}>
								<LogoImage src={`/-/static${logo}`}/>
							</LogoItem>
							<MenuItem style={{'flex' : '10 0 0'}}>
								<CodeGroup>
									<div>
										<Code>
											{ `npm set registry ${this.props.baseUrl}` }
										</Code>
									</div>
									<div>
										<Code>
											{ `npm adduser --registry ${this.props.baseUrl}` }
										</Code>
									</div>
								</CodeGroup>
							</MenuItem>
							<MenuItem style={{'flex' : '1 0 0'}}>
								<Dialog
									open={this.state.open}
									title="Welcome Back"
									actions={standardActions}
									onRequestClose={this.handleRequestClose}>
									<form method="POST" ref="form" action="/-/login" autoComplete={false}>
										<List>
											<ListItem disabled leftIcon={<IconPerson />}>
												<TextField
													name="user"
													hintText="Username"
													fullWidth={true}
												/>
											</ListItem>
											<ListItem disabled leftIcon={<Lock />}>
												<TextField
													name="pass"
													hintText="Password"
													fullWidth={true}
													type="password"
												/>
											</ListItem>											
										</List>
									</form>
								</Dialog>
								<RaisedButton
									label="Login"
									onTouchTap={this.handleTouchTap}
								/>
							</MenuItem>
						</MenuGroup>
					</Navigation>
				</HeaderNav>
		);
	}
}

export default Header;
