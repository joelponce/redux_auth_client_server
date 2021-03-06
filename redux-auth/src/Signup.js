import React from 'react';
import {connect} from 'react-redux';
import {signup} from './actions';
import Flash from './Flash'

class Signup extends React.Component {
    // pretty standard
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        // change a key in state with whatever the name attribute is
        // either username or password
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        // make sure we use an arrow function here to correctly bind this to this.context.router
        this.props.signup(this.state).then(() => {
                this.setState({error: false})
                // route to /login once signup is complete
                this.context.router.push('/login');
            },
            // if we get back a status code of >= 400 from the server...
            (err) => {
                // not forr production - but good for testing for now!
                this.setState({error: true})



            });
    }

    render() {

        if (this.state.error === true) {
            return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <Flash></Flash>
                        <h1>Sign up!</h1>
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <input placeholder="username" type="text" id="username" name="username"
                                   value={this.state.username} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input type="password" placeholder="password" id="password" name="password"
                                   value={this.state.password} onChange={this.onChange}/>
                        </div>
                        <button className="button-content">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
            )
        }
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <h1>Sign up!</h1>
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <input placeholder="username" type="text" id="username" name="username"
                                   value={this.state.username} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input type="password" placeholder="password" id="password" name="password"
                                   value={this.state.password} onChange={this.onChange}/>
                        </div>
                        <button className="button-content">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

Signup.contextTypes = {
    router: React.PropTypes.object.isRequired
}
Signup.propTypes = {
    signup: React.PropTypes.func.isRequired
}

export default connect(null, {signup})(Signup);
