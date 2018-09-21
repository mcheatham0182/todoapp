import React, { Component } from 'react';
import style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../../actions/actions';
import ContentEditable from 'react-contenteditable';

class MainContent extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            changes: {
                title: this.props.title,
                description: this.props.description
            },
            editedSomething: false
        };
    };

    handleChange(event, name){
        let regEX = /&nbsp;/gi
        let value = event.target.value.toString().replace(regEX,' ');
        this.props.actions.editTask(this.props.id, value, name)
    };

    deleteTask = () => {
        let confirm = window.confirm('Delete task?');
        if(confirm){
            this.props.actions.deleteTask(this.props.id);
            this.props.actions.timerStop();
            this.props.onTaskDelete();
        }
    };

    changeStatus = () => {
        this.props.actions.changeStatus(this.props.id);
    };

    startTimer = () => {
        let timerRunning = this.props.timerRunning;
        if(this.props.id !== this.props.timer.taskId && this.props.timer.timerRunning === null){
            this.props.actions.timerStart(this.props.id);
            this.props.actions.changeStatus({
                ...this.props, timerRunning: !timerRunning
            });
        } else {
            this.props.actions.timerStop(this.props.timer.taskId);
            this.props.actions.timerStart(this.props.id);

        }

    };

    stopTimer = () => {
        this.props.actions.timerStop(this.props.id, this.props.timer.time);
    };

    render() {
        let timeTracked;
        var time;
        if(this.props.time){
            timeTracked =  new Date(null);
            timeTracked.setSeconds(this.props.time);
            time = timeTracked.toISOString().substr(11, 8);
        }
        return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <label className="form-check-label margins" htmlFor="done">Done: <input type="checkbox" disabled={this.props.timerRunning} onChange={this.changeStatus} checked={this.props.completed} id="done"/></label>
                        {(this.props.completed) ? '' : (this.props.timerRunning) ? <button className='btn btn-danger margins start-timer' onClick={this.stopTimer}>Stop timer</button> :
                            <button className='btn btn-success margins start-timer' onClick={this.startTimer}>Start timer</button>}
                        {time ? time : '00:00:00'}
                    <div className='float-right'>
                        <span className='delete-span' onClick={this.deleteTask}>X</span>
                    </div>
                    </div>
                    <div className="panel-body">
                        <div className='content-header'>
                            <ContentEditable
                                html={this.props.title} // innerHTML of the editable div
                                disabled={false}       // use true to disable edition
                                onChange={(event) => this.handleChange(event, 'title')} // handle innerHTML change
                                tagName='h2' // Use a custom HTML tag (uses a div by default)
                            />
                        </div>
                        <div className='content-body'>
                            <ContentEditable
                                html={this.props.description} // innerHTML of the editable div
                                disabled={false}       // use true to disable edition
                                onChange={(event) => this.handleChange(event, 'description')} // handle innerHTML change
                                tagName='h3' // Use a custom HTML tag (uses a div by default)
                            />
                            <div></div>
                        </div>
                    </div>
                </div>

        )
    };

}

function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators(taskActions, dispatch)
    };
}

function  mapStateToProps(state, ownProps) {
    return {
        actions: state.tasksReducer.actions,
        timer: state.activeTaskReducer
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContent);