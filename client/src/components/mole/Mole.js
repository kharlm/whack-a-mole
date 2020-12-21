import React, {Component} from 'react';
import './Mole.css';
import MoleIcon from './Mole.svg';

class Mole extends Component {
    render() {
        if (this.props.isMoleVisible === true){

        
        return(
            <div className="den">
                <img src={MoleIcon} className="Mole" alt="Mole" onClick={this.props.handleClick}/>
            </div>
        )
        }

        return(
            <div className="den"></div>
        )
    }
}

export default Mole;