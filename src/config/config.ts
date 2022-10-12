import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from '@azure/msal-browser';
import { Configuration } from '@azure/msal-browser';

export const scopes = [
  'user.read',
  'mailboxsettings.read',
  'calendars.readwrite'
]

export const config: Configuration = {
  auth: {
    clientId: 'ID_APP',
  },
};

// <MsalInstanceSnippet>
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.auth.clientId,

  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true
  }
});

const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {

  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = event.payload as AuthenticationResult;
    msalInstance.setActiveAccount(authResult.account);
  }

});

export default msalInstance;