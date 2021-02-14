import React, { Component } from "react";
import Overview from "../../components/Overview/Overview";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-saved";

class Saves extends Component {
  state = {
    saves: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/saves.json")
      .then(res => {
        const fetchedSaves = [];
        for (let key in res.data) {
          fetchedSaves.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, saves: fetchedSaves });
        console.log(this.state.saves);
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.saves.map(save => (
          <Overview key={save.id} attributes={save.attributes} />
        ))}
      </div>
    );
  }
}
export default withErrorHandler(Saves, axios);
