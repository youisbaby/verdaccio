import React from 'react';
import styled from 'styled-components';
import request from 'superagent';	
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Readme from './Readme/Readme';

const ItemWrap = styled.li`
	padding: 9px 10px;
	border-bottom: 1px solid #E7E7E7;
	list-style-type: none;
	&:nth-child(even) {
    background: #f3f3f3;
	}
`;

const Description = styled.p`
		margin: 0 0 0 18px;
		font-size: 13px;
`;

const Group = styled.div`
	display: flex;
	align-items: center;
	line-height: 10px;
`;

const GroupItems = styled.div`
	margin: 0 5px;
`;

const Small = styled.small`
	color: #666;
`;

const Title = styled.h4`
	margin: 0px;
`;

const Link = styled.a`
	color: #cc3d33;
	fill: currentColor;
	text-decoration: none;
`

class Item extends React.Component {

	constructor() {
		super();
		this.state = {
			open: false
		}
		this.displayReadme = this.displayReadme.bind(this);
	}

	/**
	 * 
	 * @param {*} event 
	 */
	displayReadme(event) {
		event.preventDefault();
		if (!this.state.open) {
			this.req = request
			.get(`/-/readme/${encodeURIComponent(this.props.data.name)}/${encodeURIComponent(this.props.data.version)}`)
			.set('Content-Type', 'text/html; charset=utf8')
			.end((err, res) => {
					this.setState({
						open: true,
						readme: res.text
				})
			});
		} else {
			this.setState({
				open: false
			})
		}
	}

	render() {
		return ( 
		<ItemWrap>
			<div>
				<Group>
					<GroupItems>
							<Link href={'#'}>
								<Group>
								<span>
									{ this.state.open ? <ArrowDown/> : <ArrowRight/> }
								</span>	
									<Title onClick={this.displayReadme}>
										{this.props.data.name}
									</Title>
								</Group>
							</Link>
					</GroupItems>
					<GroupItems>
						<Small>
							{ `v${this.props.data.version}` }
						</Small>
					</GroupItems>
					<GroupItems>
						<Small>
							{ `By: ${this.props.data.author ?  this.props.data.author.name : ''}` }
						</Small>	
					</GroupItems>
				</Group>
			</div>	
			<Description>
				{this.props.data.description}
			</Description>
			{ this.state.open ? <Readme html={ this.state.readme }/> : '' }
		</ItemWrap>
		);
	}
}

export default Item;
