import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../action'
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robot,
        ispending :state.requestRobots.ispending,
        error:state.requestRobots.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobot: ()=> dispatch(requestRobots())
    }

}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));

    }
    render() {
        const { robots } = this.state;
        const {searchField,onSearchChange}=this.props;
        const filteredSearch = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ?
            <h1>Loading Robot</h1> :
            (
                <div className='tc  '>
                    <h1 className='f1'>RoboFriend</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredSearch} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);