import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Output extends Component {
  componentDidUpdate() {
    var thing = ReactDOM.findDOMNode(this);
    thing.scrollTop = thing.scrollHeight - thing.clientHeight;
  }

  render() {
    return (
      <textarea className="output" style={{width: 600 + 'px', height:400 + 'px'}} value={this.props.value}></textarea>
    );
  }
}

class Command extends Component {
  constructor() {
    super();
    this.state = {url:"", output:""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClear(e) {
     this.setState({url:this.state.url, output:""}, function () {});
  }
  handleChange(e) {
    // this.state.defaultValue = e;
    // alert(e.target.value);
    this.state.url = e.target.value;
    this.setState({
      url:e.target.value,
      output:this.state.output
    }, function () {});
  }

  handleSubmit(e) {
    //we don't want the form to submit, so we prevent the default behavior
    e.preventDefault();

    var params = new URLSearchParams();
    var url = this.state.url;
    // var output = this.state.output + "\n" + url + "?" + unescape(params);
    var output = this.state.output + "\n" + url;
    this.setState({output:output}, function () {});
    var querystring = require('querystring');
    var thisobj = this;
    params.append("webapi", url);
    axios.post(`/webapi`, params)
      .then(function (response) {
        var output = thisobj.state.output + "\n" + response.data;
        thisobj.setState({output:output}, function () {});
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    var rows = [];
    return (
      <div  className="Command">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="CommandTop">
              <div className="box">
                <div className="boxItem">
                  URL:
                </div>
                <div className="boxInput">
                  <input type="text" id = {"boxi"} style={{width: 600 + 'px'}}
                    onChange={this.handleChange}
                    value={this.state.url} ></input>
                </div>        
                <br />
              </div>
            </div>
            <div className="CommandTop">
              <input type="submit" value="click" />
            </div>
          </div>
        </form>
        <div className="outputDiv">
          <Output value={this.state.output}></Output>
          <br />
          <input type="button" value="clear" onClick={this.handleClear} />
        </div>
      </div>
    );
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      output:""
    };
  }

  render() {
    return (
      <div className="App">
          <div>
            <div className="App-header">
              <h2>Welcome to React</h2>
            </div>
            <div className="App-intro">
              <Command  />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
