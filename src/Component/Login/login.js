import React, { Component } from 'react';
import authnGateway from '../../utils/authnGateway/authnGateway';
import './login.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      token:"",
      response: [],
      formErrors: {},
    }
    this.onChangeEvent = this.onChangeEvent.bind(this); 
  }
  onChangeEvent(event) {
    this.setState({[event.target.name] :  event.target.value});
  }

  onClickLogin = (e) => {
    e.preventDefault();
    const isvalid = this.validateAllFeilds();
    console.log("VALUE",this.state.username);
    if(isvalid){
  
      authnGateway.getCommentData()
        .then(res => {
          console.log("VALUE"+JSON.stringify(res));   
          this.setState({response: res})   
        })
      
        // setTimeout(()=>{
        //   history.push('/dashboard')
        // },3000)
    }
    else {
      e.preventDefault();
  }
  }

  validateAllFeilds = () => {
    const formErrors = {};
    const { username, password } = this.state
    let isvalid = true;
    if (!username) {
        formErrors.username = "*UserName is Required";
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
    this.setState({ formErrors })
    return isvalid;

}
  render() {
    const { username, password,response } = this.state
    return (
      <div className="containers">
                <div className='col-12'>
                    <form onSubmit={this.onClickLogin}>
                        <div className="form-group">
                            <h1 className='login'>Login</h1>
                            <div >
                                <label className='label'>UserName: </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    data-testid="username-input"
                                    placeholder="UserName"
                                    value={username}
                                    onChange={this.onChangeEvent}
                                    autoFocus
                                />
                                <p>{this.state.formErrors.username}</p>
                            </div>
                            <div>
                                <label className='label'>Password: </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    data-testid="password-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.onChangeEvent}
                                />
                                <p>{this.state.formErrors.password}</p>
                            </div><br/>
                            <div>
                            <button className='btn btn-danger subButton' data-testid="submit" name="submit" type="submit"><i className="bi bi-arrow-right"></i></button>
                            </div>
                            <div className='submitted'>
                              {response.length !== 0 && (<h5 className='titleDisplay'>After Receiving response Title is:</h5>)}
                                {
                                  response.map((data) =>(
                                    <div key={data.id}>
                                        {data.title}
                                  </div>
                                  ))
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div >
    );
  }
}

export default Login;