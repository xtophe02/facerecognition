import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import ParticlesOptions from "./components/ParticlesOptions/ParticlesOptions";
//import Clarifai from 'clarifai';

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  //  }

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  };

  calculationFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    //console.log(box)

    this.setState({
      box: box
    });
  };

  onInputChange = ev => {
    //console.log(ev.target.value)
    this.setState({
      input: ev.target.value
    });
  };
  onButtonChange = ev => {
    //console.log('click')

    this.setState(
      {
        imageUrl: this.state.input
      },
      () =>
        fetch("http://localhost:3000/api/imageURL", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input: this.state.input
          })
        })
          .then(res => res.json())
          .then(response => {
            if (response) {
              fetch("http://localhost:3000/api/image", {
                method: "put",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
                .then(res => res.json())
                .then(count => {
                  this.setState(
                    Object.assign(this.state.user, {
                      entries: count
                    })
                  );
                })
                .catch(console.log);
            }
            this.displayFaceBox(this.calculationFaceLocation(response));
          })
          .catch(err => console.log(err))
    );
  };

  onRouteChange = route => {
    //console.log(route)
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState(
        this.setState({
          isSignedIn: true
        })
      );
    }

    this.setState({
      route: route
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={ParticlesOptions} />{" "}
        <div
          style={{
            zIndex: 1
          }}
        >
          <Navigation
            isSignedIn={this.state.isSignedIn}
            onRouteChange={this.onRouteChange}
          />{" "}
          {this.state.route === "home" ? (
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />{" "}
              <ImageLinkForm
                inputChange={this.onInputChange}
                onButtonChange={this.onButtonChange}
              />{" "}
              <FaceRecognition
                box={this.state.box}
                imgInput={this.state.imageUrl}
              />{" "}
            </div>
          ) : this.state.route === "signin" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
