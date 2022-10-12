import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Client } from "@microsoft/microsoft-graph-client";
import { blobToBase64 } from '../helpers/blobToBase64';
import { config, scopes } from './config';
import { User } from 'microsoft-graph';


let graphClient: Client | undefined;
const msalInstance = new PublicClientApplication(config);

class GraphService {

  static AuthProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msalInstance as PublicClientApplication,
    {
      account: msalInstance.getActiveAccount()!,
      scopes: scopes,
      interactionType: InteractionType.Popup
    }
  );

  static async getUser(): Promise<User> {
    this.ensureClient();
    const user: User = await graphClient!.api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName,jobTitle ')
      .get();

    return user;
  }

  static async getPhoto() {
    this.ensureClient();

    const photo = await graphClient?.api('me/photo/$value').get();
    //Convierte el blod en base64
    const photoFormatted = blobToBase64(photo);
    return photoFormatted;

  }

  static async getAccestToken() {

    const result = await msalInstance.loginPopup({
      scopes: scopes,
      prompt: 'select_account'
    });
    return result.accessToken;
  }

  static ensureClient() {
    if (!graphClient) {
      graphClient = Client.initWithMiddleware({
        authProvider: this.AuthProvider
      });
    }
    return graphClient;
  }
}

export default GraphService;