import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';

const initialState = {
  input: '',
imageUrl: '',
box: {},
route : 'signin',
isSignedIn : false,
user:{
      id:'',
      name:'',
      email:'',
      entries: 0,
      joined:''
}
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

 

  calculateFaceLocation = (data) => {
    if (data && data.outputs && data.outputs.length > 0 && data.outputs[0].data && data.outputs[0].data.regions) {
      const regions = data.outputs[0].data.regions;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
  
      const faceBoxes = regions.map((region) => {
        const clarifaiFace = region.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
  
      return faceBoxes;
    } else {
      return [];
    }
  };
  
  
  displayFaceBox = (box) => {
    this.setState({ box: Array.isArray(box) ? box : [box] });
  };
  

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    console.log('Button clicked');
    this.setState({ imageUrl: this.state.input });
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "rahulr18",
        "app_id": "face"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // eslint-disable-next-line
        'Authorization': 'Bearer eb2daf05d5344b48851c7320785a8979 '
      },
      body: raw
    };
    fetch('https://api.clarifai.com/v2/models/face-detection/versions/5e026c5fae004ed4a83263ebaabec49e/outputs', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Clarifai API response:', result);
        if (result && result.outputs && result.outputs.length > 0) {
          const box = this.calculateFaceLocation(result);
          console.log('Calculated face boxes:', box);
          this.displayFaceBox(box);
        } else {
          console.log('Error in Clarifai API response:', result);
          // Handle the error case here, such as displaying an error message to the user
        }
      })
      .catch(error => console.log('Error:', error));
  };

  onRouteChange = (route) => {
    if(route === 'signout' ){
      this.setState(initialState)
    }else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route.toLowerCase()});
  }
  
  loadUser = (data) => {
    // Update the user state or perform necessary actions
    // For example:
    this.setState( {user : {
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined:data.joined

    
  }
});
  }

  render() {
    const { imageUrl, box } = this.state;

    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
        ?<div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
        :(
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
  }
      </div>
    );
  }
}

export default App;
