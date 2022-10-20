export function setNameInStore(name) {
    return {
      type: 'Name',
      payload: name,
    }
  }

  export function setEmailandPasswordInStore(response) {
    return {
      type: 'Set_Email_Password',
      payload: response,
    }
  }