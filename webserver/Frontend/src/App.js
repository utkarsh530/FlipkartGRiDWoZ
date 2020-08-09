import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./footer"
import axios, { post } from 'axios';
import listReactFiles from 'list-react-files'
import FlashMessage from 'react-flash-message';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      dir: [],
      flashMessage: false,
      message: "File Successfully Uploaded"
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  componentDidMount() {
    axios.get(`http://13.233.87.14:7000/getDir`)
      .then(res => {
        const files = res.data;
        console.log(res.data);
        this.setState({ dir: res.data });
      })
  }

  handleClick() {
    axios.post(`http://13.233.87.14:7000/runPythonScript`, {})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
          this.setState({
            dir: response.data,
            flashMessage: true
          });
        })

    
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  fileUpload(file) {
    const url = 'http://13.233.87.14:7000/fileUpload';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)

  }
  render() {
    const { dir, message } = this.state
    const outputfiles = dir.map(file => (
      <audio controls>
        {/* <source src="../files/sample.mp3" type="audio/mpeg" /> */}
        <source src={`/files/${file}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
      </audio>

    ))
    console.log(__dirname)
    return (
      <div>
        <Navbar />
        <div className="container" style={{ textAlign: "center" }}>

          <form onSubmit={this.onFormSubmit} style={{ paddingBottom: "20px" }} >
            <h1 style={{ paddingBottom: "10px" }}>Upload a File</h1>
            <input style={{ paddingBottom: "10px" }} type="file" onChange={this.onChange} />
            <br />
            <button type="submit" class="btn btn-primary">Upload</button>

          </form>
          <button onClick={() => this.handleClick()} class="btn btn-success">Execute Script</button>

          {(this.state.flashMessage == true) ? <FlashMessage duration={2500}>
            <strong className="alert alert-success" role="alert">{message} </strong>
          </FlashMessage> : <div />
          }
          <hr />
          <h2> Output Files </h2>
          {outputfiles}
        </div>


        <Footer />
      </div>
    );
  }
}

export default App;
