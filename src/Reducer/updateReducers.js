
const initialState = {
    name: '',
    formData: {
        email:'',
        password:''
      },
  
  }

export default function data(prevState = initialState, action) {
  switch (action.type) {
  case "Name":
    return {
      ...prevState,
      name: action.payload,
    }
  case "Set_Email_Password":
    return {
      ...prevState,
      formData: {
        ...prevState.formData,
        email: action.payload.email,
        password: action.payload.password
      }
    }
  default:
    return prevState;
  }
}