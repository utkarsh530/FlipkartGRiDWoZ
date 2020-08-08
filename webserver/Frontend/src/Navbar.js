import React, { Component } from 'react';



class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            
        }       
    }
    
    render() {
  
        
        
        return(
            <div style={{width:"100%"}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Noise Eliminator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  {/* <Link className="nav-link" to={{ pathname: '/selectDepartment', state: { platform: platform, ip:ip,  img:img } }} >Switch USER</Link>  */}
                </li>
                <li className="nav-item">
                 
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                </li> */}
              </ul>
              {/* <img src={img} width={30} height={30} alt=""  /> */}
             
            </div>
          </nav>
          </div>
        )

    }
}

export default Navbar


