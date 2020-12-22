import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser,updateHighScore,loginUser } from "../../actions/authActions";
import '../mole/Mole.css';
import Mole from '../mole/Mole.js';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            dens: this._stopState(),
            points: 0,
            gameOver: false,
            highScore: 0,
            showTopScores: false,
            seconds: 30
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    componentDidMount(){
        this.setState({
            highScore: this.props.auth.user.highScore
        });
    }

    _setHighScore(){
       
        let highScore = this.props.auth.user
       if(this.state.points>this.state.highScore) {
        this.setState({
            highScore: this.state.points
        });
            highScore.points = this.state.points
            this.props.updateHighScore(highScore);
       }
    }
    _startGame() {
        this.setState({
            gameOver: false,
            points: 0
        });
        var startTime = new Date().getTime();
        
        var interval = setInterval(() => {
            if(new Date().getTime() - startTime > this.state.seconds){
                clearInterval(interval);
                this.setState({
                    dens: this._stopState(),
                    gameOver: true
                });
                
                
                //highScore.points = this.state.points
                this._setHighScore()
                return;
            }
            this.setState({
                dens: this._getDensState()
            });

        }, 1500)
    }

    _getDensState () {
        return new Array(9).fill({}).map(()=>{
            return {
                isMoleVisible: [true,false] [Math.round(Math.random())]
            }
        });
    }

    _stopState () {

        return new Array(9).fill({}).map(()=>{
            return {
                isMoleVisible: false
            }
        });
    }

    _MoleWhacked() {
        this.setState({
            points: this.state.points + 1
        });
    }

    _clearTopScore () {
      this.setState({
        showTopScores: !this.state.showTopScores
    });
    }

    render() {
        const { user } = this.props.auth;
        const { seconds } = this.state
        const dens = this.state.dens.map((den,index) =>{
            return (
                <Mole key={`mole-${index}`} isMoleVisible={this.state.dens[index].isMoleVisible} handleClick={this._MoleWhacked.bind(this)} />
            );
        });

        if(this.state.showTopScores) { 
          //Absolutely terrible syntax but was stumped on time
          return(
                    <div className='instruct'>
                    <h4 style={{fontSize: 20}}>Top Scores</h4>
                    <h6 style={{fontSize: 20}}>{this.props.auth.topScores[0].name}  {this.props.auth.topScores[0].highScore}</h6>
                    <h6 style={{fontSize: 20}}>{this.props.auth.topScores[1].name}  {this.props.auth.topScores[1].highScore}</h6>
                    <h6 style={{fontSize: 20}}>{this.props.auth.topScores[2].name}  {this.props.auth.topScores[2].highScore}</h6>
                    <h6 style={{fontSize: 20}}>{this.props.auth.topScores[3].name}  {this.props.auth.topScores[3].highScore}</h6>
                    <h6 style={{fontSize: 20}}>{this.props.auth.topScores[4].name}  {this.props.auth.topScores[4].highScore}</h6>
                    
                  <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  onClick={this._clearTopScore.bind(this)}
                  className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                >
                  Back
                </button>
                </div>
                    
          )
        }

        if(this.state.gameOver){
            return (
                <div>
                    <div className='instruct'>
                    
                    <h5 style={{fontSize: 20}}>GAME OVER!</h5>
                    <h6 style={{fontSize: 20}}>Points: {this.state.points}</h6>
                    <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  onClick={this._startGame.bind(this)}
                  className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                >
                  Play Again
                </button>
                </div>
                    <div className="dens">
                        {dens}
                    <div style={{clear: 'both'}}></div>
                   
                    </div>
                </div>
            )
        }

        else{
        return (
            
            <div>
                <div className='instruct'>
                <h4 style={{fontSize: 22}}>WHACK-A-MOLE!</h4>
                <h4 style={{fontSize: 15}}>Seconds: {seconds}</h4>
                <h5 style={{fontSize: 15}}>Points: {this.state.points}</h5>
                <h6 style={{fontSize: 15}}>Your High Score is: {this.state.highScore}</h6>
                <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              onClick={this._startGame.bind(this)}
              className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
            >
              Start
            </button>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              onClick={this._clearTopScore.bind(this)}
              className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
            >
              Top Scores
            </button>
            </div>
                <div className="dens">
                    {dens}
                <div style={{clear: 'both'}}></div>
               
                </div>
            </div>
        )
    }
    }

}

Home.propTypes = {
    updateHighScore: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser,updateHighScore,loginUser }
  )(Home);
