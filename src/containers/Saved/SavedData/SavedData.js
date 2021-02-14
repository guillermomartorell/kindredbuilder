import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./SavedData.module.css";
import axios from "../../../axios-saved";
import Spinner from "../../../components/UI/Spinner/Spinner";

class SavedData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
    loading: false,
  };

  saveDataHandler = event => {
    event.preventDefault();
    console.log(this.props.attributes);
    this.setState({ loading: true });
    const save = {
      attributes: this.props.attributes,
      player: {
        name: "GM",
        address: {
          street: "Teststreet 1",
          zipCode: "123456",
          country: "Uruguay",
        },
        email: "test@test.com",
      },
      downloadMethod: "smallest",
    };

    axios
      .post("/saves.json", save)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="zip" placeholder="Zip Code" />
        <Button btnType="Success" clicked={this.saveDataHandler}>
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
