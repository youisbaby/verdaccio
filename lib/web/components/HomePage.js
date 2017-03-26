import React from 'react';
import List from './list';

class HomePage extends React.Component {
  render() {
      return ( 
        <div>
          <List items={this.props.items}/>
        </div>
      );
  }
}

export default App;
