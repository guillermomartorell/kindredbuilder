import React, { Component } from 'react'
import KindredSummary from '../../components/Overview/KindredSummary/KindredSummary'
class Saved extends Component {
state ={
    attributes: {
        str: 1,
        dex: 1,
        sta: 1,
    }
}
    render(){

        return (
            <KindredSummary attributes={this.state.attributes}/>
        )
    }

}

export default Saved