import React from 'react';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AmplifyGreetings }  from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import Main from './Main.js';

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
      <div className="flex flex-column items-center justify-center pa3">
      <Main />
      </div>
    </div>
    ) : (
    <AmplifyAuthenticator />
    );
}
//export default withAuthenticator(App, {initialAuthState: 'signup'});
export default App;
