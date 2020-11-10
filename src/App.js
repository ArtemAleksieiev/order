import React from 'react';
import { AmplifyAuthenticator, AmplifyGreetings} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Form from './Form.js';

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
}, []);
  console.log(user)
  return authState === AuthState.SignedIn && user ?(
    <div className="App">
        <AmplifyGreetings username={user.attributes.email}></AmplifyGreetings>
      <div className="flex flex-column items-center justify-center pa3 bg-blue">
      <Form />
      </div>
    </div>
    ) : (
    <AmplifyAuthenticator />
    );
}
//export default withAuthenticator(App, {initialAuthState: 'signup'});
export default App;
