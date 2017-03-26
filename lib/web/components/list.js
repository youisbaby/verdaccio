import React from 'react';
import Item from './item';
import styled from 'styled-components';

const ListItems = styled.ul`
	margin: 0px;
	padding: 0px;
`;

class List extends React.Component {

	constructor(props) {
		super();
	}
 
  render() {
      return ( 
				<ListItems className="list-container">
						{ this.props.packages.map((item)=> {
								// console.log("pgk::", item);
							return (<Item key={item.name} data={item}/>)
						})}
				</ListItems>
      );
  }
}

export default List;
