import React, { Component } from 'react';
import Link from 'react-router';
import LauncherList from '../components/LauncherList';
import LauncherTile from '../components/LauncherTile';
import LauncherInfo from '../components/LauncherInfo';

class LauncherShow extends Component {
  constructor(props){
    super(props)
      this.state = {
        launcherInfo: {}
    }
  }

  componentDidMount(){
    let launcherId= this.props.params.id
    fetch(`http://localhost:4567/api/v1/launcher/${launcherId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(launcher => {
      this.setState({ launcherInfo: launcher})
    })
  }

  render(){
    return(
      <LauncherInfo
        id={this.state.launcherInfo.id}
        name={this.state.launcherInfo.name}
        bio={this.state.launcherInfo.bio}
      />
    )
  }
}

export default LauncherShow;
