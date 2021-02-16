import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./SavedData.module.css";
import axios from "../../../axios-saved";
import Input from "../../../components/UI/Input/Input";

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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        //TODO dropdown with countries
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country ",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your@e.mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
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
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  saveDataHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formEl in this.state.player) {
      formData[formEl] = this.state.player[formEl].value;
    }
    const save = {
      attributes: this.props.attributes,

      playerData: formData,
    };
    axios
      .post("/saves.json", save)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, rules) => {
    //TODO create all validation rules
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
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
    updatedPlayerElem.valid = this.checkValidity(
      updatedPlayerElem.value,
      updatedPlayerElem.validation
    );
    updatedPlayerElem.touched = true;
    updatedPlayerForm[inputIdentifier] = updatedPlayerElem;

    let formValid = true;
    for (let inputIdentifier in updatedPlayerForm) {
      formValid = updatedPlayerForm[inputIdentifier].valid && formValid;
    }
    this.setState({  player: updatedPlayerForm, formIsValid: formValid });
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
            invalid={!elem.config.valid}
            shouldValidate={elem.config.validation}
            touched={elem.config.touched}
            changed={event => this.inputChangedHandler(event, elem.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          SAVE
        </Button>
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
