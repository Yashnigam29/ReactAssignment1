import React from 'react';
import './form.css'
import { Link } from 'react-router-dom';
import history from '../../history';
import { bindActionCreators } from 'redux';
import { setNameInStore, setEmailandPasswordInStore } from '../../Actions/actions'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setNameInStore,
            setEmailandPasswordInStore
        },
        dispatch
    );


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            formErrors: {},
            issubmit: false
        };
    }
    handlechange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },)
        // this.validateAllFeilds();
    }

    handleSubmit = (e) => {
        const { name, email, password } = this.state
        const isvalid = this.validateAllFeilds();
        const data = {
            "email": email,
            "password": password
        }
        if (isvalid) {
            this.setState({ issubmit: true })
            this.props.setNameInStore(name);
            this.props.setEmailandPasswordInStore(data)
            console.log(`submiting data: NAME- ${name} EMAIL- ${email} PASSWORD- ${password}`)
            history.push('/login')
        }
        else {
            e.preventDefault();
        }
    }

    validateAllFeilds = () => {
        const formErrors = {};
        const { name, email, password } = this.state
        let isvalid = true;
        const regex = /^[A-Za-z0-9.]+@[a-z]+\.[a-z]{2,}$/g;
        if (!name) {
            formErrors.name = "*Name is Required";
            isvalid = false;
        }
        if (!email) {
            formErrors.email = "*Email is Required";
            isvalid = false;
        }
        else if (!regex.test(email)) {
            formErrors.email = "*Please enter valid format eg:(hdgf@gmail.com)";
            isvalid = false;
        }
        if (!password) {
            formErrors.password = "*Password is Required";
            isvalid = false;
        }
        else if (password.length < 4) {
            formErrors.password = "*Password must be more than 4 characters";
            isvalid = false;
        } else if (password.length > 10) {
            formErrors.password = "*Password cannot exceed more than 10 characters";
            isvalid = false;
        }

        if (document.getElementById('checkbox').checked === false) {
            formErrors.checkbox = "*Please accept (tick) term and condition";
            isvalid = false;
        }
        this.setState({ formErrors })
        return isvalid;

    }
    render() {
        const { name, email, password } = this.state
        return (
            <div className="container">
                <div className='col-7'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <h1 className='signup'>Sign Up</h1>
                            <div className="line">_____
                                <div className='sub-title'>Sign up with</div></div>
                            <div className="col-md-6">
                                <div id="customBtn" className="customGPlusSignIn" onClick={() => { window.location.replace("https://accounts.google.com/") }}>
                                    <span className="icon"><img className="GoogleImage" alt="GoogleImage" src="https://thumbs.dreamstime.com/s/google-logo-124289805.jpg" /></span>
                                    <span className="buttonText">Sign Up with Google</span>
                                </div>
                                {/* <GoogleButton className="form-group"
                                    onClick={() => { window.location.replace("https://accounts.google.com/") }}
                                /> */}
                            </div>
                            <div className="col-md-6">
                                {/* <FacebookLogin className="form-group"
                                    onClick={() => { window.location.replace("https://www.facebook.com/") }}
                                /> */}

                                <div id="customBtn" className="customGPlusSignIn" onClick={() => { window.location.replace("https://www.facebook.com/") }}>
                                    <span className="icon"><img className="FBImage" alt="FBImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwyKxe8uiiQdHxdaRQaBsKTw27iLy6kF-sKOZ5raeug&s" /></span>
                                    <span className="buttonText">Sign Up with Facebook</span>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label >Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    data-testid="name-input"
                                    placeholder="Name"
                                    value={name}
                                    onChange={this.handlechange}
                                    autoFocus
                                />
                                <p>{this.state.formErrors.name}</p>
                            </div>
                            <div className='col-md-6'>
                                <label>Email: </label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    data-testid="email-input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handlechange}
                                />
                                <p>{this.state.formErrors.email}</p>
                            </div>

                            <div className='col-md-12'>
                                <label>Password: </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    data-testid="password-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handlechange}
                                />
                                <p>{this.state.formErrors.password}</p>
                            </div>
                            <div className='col-md-12'>
                                <input type="checkbox" name="checkbox" id="checkbox" value="check" /> I've read and agree with terms of Service and our privacy Policy
                                <p>{this.state.formErrors.checkbox}</p>
                            </div>
                            <button className='btn btn-danger subButton' data-testid="submit" name="submit" type="submit"><i className="bi bi-arrow-right"></i></button>
                            <div className='submitted'>
                                {this.state.issubmit ? "data is submitted successfully" : ""}
                            </div>
                            <div>
                                Already have an account?<Link to={'/login'} className="nav-link">Sign In</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-5'>
                    <img alt="RocketImage" src="https://thumbs.dreamstime.com/z/space-shuttle-booster-rocket-rockets-propel-spaceship-outer-space-to-explore-cosmos-universe-113959295.jpg" className='rocketimage' />
                </div>
            </div >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);
