import React, { Component } from 'react';
import './App.css';
const people = ['john', 'ori', 'joel', 'dani'];

const chores = [
  {
    name: 'dishes',
    state: [
      'P',
      2,
      0,
      1
    ]
  },
  {
    name: 'mopping',
    state: [
      1,
      'P',
      5,
      0
    ]
  },
  {
    name: 'fucking',
    state: [
      0,
      2,
      'P',
      0
    ]
  }
];

export default class App extends Component {
  state = {
    chores,
    pelletMode: false, 
    user: 'john',
  }

  toggleMode = () => {
    this.setState({ pelletMode: !this.state.pelletMode });
  }

  handlePelletClick = (chore, i) => () => {
    const indexOfUser = people.indexOf(this.state.user);

    // todo, add a pellet to this cell
    const newChore = {
      name: chore.name,
      state: chore.state.map((cell) => {
        console.log(i, indexOfUser)
        if (i === indexOfUser) return cell + 1;

        return cell;
      })
    }

    const finalState = this.state.chores.map(stateChore => {
      if (stateChore.name === chore.name) {
        return newChore
      }

      return stateChore
    })

    this.setState({ chores: finalState })



  }

  handlePacmanClick = (chore) => () => {
    const state = chore.state;
    let done = false
    let pCell = state.indexOf('P');

    const weNeedToLoopAround = !state.some((cell, i) => (i > pCell && cell === 0))

    let newState;

    if (!weNeedToLoopAround) {
       newState = state.map((cell, i) => {
        if (i < pCell || done) return cell;

        if (i === pCell) return 0;

        if (cell > 0) return cell - 1;
        
        done = true;
        return 'P'
      })
    } else {
      newState = state.map((cell, i) => {
        if (i === pCell) return 0;
        if (i > pCell) return cell - 1;
        if (done) return cell;

        if (cell > 0) return cell - 1;

        done = true;
        return 'P'
      })
    }      
    const finalState = this.state.chores.map(stateChore => {
      if (stateChore.name === chore.name) {
        return {
          ...chore,
          state: newState
        }
      }

      return stateChore
    })

    this.setState({ chores: finalState })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Welcome { this.state.user}</p>
          { this.state.pelletMode ? 'add pellets' : 'move pacman' }
          <button onClick={this.toggleMode}>toggle mode</button>
          <div className="names">
            <p>people:</p>
            {people.map(name => <p onClick={() => this.setState({ user: name})}>{name}</p>)}
          </div>
          { this.state.chores.map(chore => <div 
          onClick={!this.state.pelletMode &&this.handlePacmanClick(chore)} className="chore">
         <p> { chore.name }</p>
            { chore.state.map((cell, i) => {
              if (cell === 'P')  return <p>😮</p>;
              
              else return <p onClick={this.handlePelletClick(chore, i)}>{Array(cell).fill('*').join('')}</p>
            })}
          </div>)}
        </header>
      </div>
    );
  }
}
