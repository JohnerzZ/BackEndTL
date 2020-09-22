import React, { Component } from 'react';
import { UserContext } from './UserContext';

export class Login extends Component {        
    
    static contextType = UserContext;
    
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        console.log('ref to username: ', this.username.current);
        
        const u = this.username.current.value;
        const p = this.password.current.value;
        console.log('Submitting...', u, p);
        
        fetch('http://localhost:8765/energy/api/Login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                "username": u,
                "password": p
            })
        }).then((response) => {
            console.log(response)
            return response.json()})
        .then(json => {   
        
            console.log(json);
            
            //store the user's data in local storage
            //to make them available for the next
            //user's visit
            localStorage.setItem('token', json.token);
            localStorage.setItem('username', u);
            
            //use the setUserData function available
            //through the UserContext
            this.context.setUserData(json.token, u);
            
            //use the history prop available through
            //the Route to programmatically navigate
            //to another route            
            this.props.history.push('/main');
        });
        
        event.preventDefault();
    }
    
    render() {        
        return (         
        
        <div className="container">
        <div className="row">
            <div className="col-md-12 min-vh-100  flex-column justify-content-center">
                <div className="row">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <div className="card rounded shadow shadow-sm">
                            <div className="card-header">
                                <h2 className="mb-0">Login</h2>
                            </div>
                            <div className="card-body">
                                <form className="form-lg" id="formLogin" onSubmit={this.handleSubmit}>
                                    <div className="form-group-lg">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" ref={this.username} placeholder="Enter username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" ref={this.password} placeholder="Enter password"/>
                                    </div>
                                
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>        
        );        
            

    }    
}

export class Logout extends Component {
    
    static contextType = UserContext;
    
    doLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
                    
        this.context.setUserData(null, null);
        
        this.props.history.push('/');
    }
    
    componentDidMount() {
        //perform an ajax call to logout
        //and then clean up local storage and
        //context state.
        console.log(this.context.token)
        fetch('http://localhost:8765/energy/api/Logout',{
            method: 'POST',
            headers: {
                'X-TOKEN-AUTH': this.context.token,
                'Content-Type':'application/x-www-form-urlencoded',
            }
        }).then(() => this.doLogout());
    }
    
    render() {
        return (<h2>Loggin out...</h2>);
    }
}
