import React from 'react';

import Image from 'react-bootstrap/Image';


class Map extends React.Component{
    render(){
        return(
            <>
             <Image src={this.props.imgaeurl} alt={this.props.city} title={this.props.city}   />
            </>
        )
    }
}


export default Map;