import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./SavedData.module.css";
import axios from "../../../axios-saved";
import Spinner from "../../../components/UI/Spinner/Spinner";

class SavedData extends Component {
  state = {
    player: {
      //TODO write helper function to create the object and just call f to initialize it below
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Address",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      country: {
        //TODO dropdown with countries
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country ",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your@e.mail",
        },
        value: "",
      },
      downloadMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "smallest", displayValue: "Smallest Size" },
            { value: "largest", displayValue: "Full Size" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  saveDataHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formEl in this.state.player){
      formData[formEl] = this.state.player[formEl].value
    }
    const save = {
      attributes: this.props.attributes,
      playerData: formData
    };

    axios
      .post("/saves.json", save)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // const updatedPlayerForm = JSON.parse(JSON.stringify(this.state.player));
    // updatedPlayerForm[inputIdentifier].value = event.target.value;
    // this.setState({ player: updatedPlayerForm });
    const updatedPlayerForm = {
      ...this.state.player,
    };
    const updatedPlayerElem = {
      ...updatedPlayerForm[inputIdentifier],
    };

    updatedPlayerElem.value = event.target.value;
    updatedPlayerForm[inputIdentifier] = updatedPlayerElem;
    this.setState({ player: updatedPlayerForm });
  };

  render() {
    const formElemArr = [];
    for (let key in this.state.player) {
      formElemArr.push({
        id: key,
        config: this.state.player[key],
      });
    }

    let form = (
      <form onSubmit={this.saveDataHandler}>
        {formElemArr.map(elem => (
          <Input
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
            changed={event => this.inputChangedHandler(event, elem.id)}
          />
        ))}
        <Button btnType="Success">SAVE</Button>
      </form>
    );
    if (this.state.loading === true) {
      form = <Spinner />;
    }
    return (
      <div className={classes.SavedData}>
        <h4>Enter you Data</h4>
        {form}
      </div>
    );
  }
}

export default SavedData;
