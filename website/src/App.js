import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import PrettyProps from 'pretty-proptypes';
import ert from 'extract-react-types';
import './App.css';

class App extends Component {
  state = {
    code: `type test = {
      name: string
    }
    
    class Ajay extends React.Component<test>{
    
    }`,
    dataForPropTypes: null,
  };

  updateCode = code => {
    try {
      const ast = ert(code, 'flow');
      this.setState({
        dataForPropTypes: ast,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { code, dataForPropTypes } = this.state;
    return (
      <div className="container">
        <div className="block">
          <CodeMirror
            style={{ height: '100%' }}
            value={code}
            options={{ lineNumbers: true }}
            onChange={this.updateCode}
          />
        </div>
        <div className="block">
          {dataForPropTypes && (
            <PrettyProps className="block" props={dataForPropTypes} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
