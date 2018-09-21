import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from './actions/actions'

import MainContent from './containers/maincontent/MainContent'

class App extends Component {

  constructor(props){
        super(props);
        this.state = {
            filter: false,
            activeTaskId: 0
        };
    };

  setFilter = (filter) => {
      this.setState({filter: filter});
    };

  addTask = () => {
        this.props.actions.addTask();
    };

  filterTasks = (element) => {
        return (element.completed === this.state.filter);
    };

  clearTask = () => {
      this.setState({activeTaskId: 0});
  };

  setTaskActive = (id) => {
        this.setState({activeTaskId: id});

    };

  render() {
    let tasks = this.props.tasks;
    let activeTask = this.props.tasks.filter(item => item.id === this.state.activeTaskId)[0];

    return (
        <div className="wrapper">
            <div className="box sidebar">
              <div className="btn-group filter-buttons">
                  <button type="button" onClick={() => this.setFilter(false)} className="btn btn-secondary filter-buttons-button">Ongoing</button>
                  <button type="button" onClick={() => this.setFilter(true)} className="btn btn-secondary filter-buttons-button">Done</button>
              </div>
                  <button type="button" onClick={this.addTask} className="btn btn-primary filter-buttons-button">Add new task</button>
                {tasks.filter(this.filterTasks).map((element)=>
                    <div className={this.state.activeTaskId === element.id ? 'task-single active' : 'task-single'}  key={element.id} onClick={() => this.setTaskActive(element.id)}>
                        <p className={(element.timerRunning) ? 'green' : ''}>{(element.title === '' ? 'NO TITLE PROVIED!' : element.title )}</p>
                    </div>
                )}
            </div>
            <div className="box content">
                {(this.state.activeTaskId !== 0 ? <MainContent
                                            onTaskDelete={this.clearTask}
                                            title={activeTask.title}
                                            description={activeTask.description}
                                            completed={activeTask.completed}
                                            time={activeTask.time}
                                            timerRunning={activeTask.timerRunning}
                                            id={activeTask.id}/> : null)}
            </div>
        </div>
    );
  };

}

function mapDispatchToProps(dispatch) {
    return{
      actions: bindActionCreators(todoActions, dispatch)
    };
}

function  mapStateToProps(state) {
    return {
        tasks: state.tasksReducer,
        timer: state.activeTaskReducer
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
