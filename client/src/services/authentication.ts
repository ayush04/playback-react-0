import CONFIG from '../config/config';

export class Authentication {
    private static _isAuthenticated: boolean = window.sessionStorage.getItem('google-authenticated') === 'true'? true: false;

    static isAuthenticated(): boolean {
        return Authentication._isAuthenticated;
    }

    static authenticate(): Promise<any> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            gapi.load('auth2', () => {
                fetch(CONFIG.apiPath + '/secret/id')
                    .then(response => response.json())
                    .then(responseJson => {
                        // @ts-ignore
                        gapi.auth2.getAuthInstance({
                            client_id: responseJson.CLIENT_ID
                        });
                        
                        // @ts-ignore
                        return gapi.auth2.getAuthInstance().signIn({
                            scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
                        }).then(() => {
                            Authentication._isAuthenticated = true;
                            window.sessionStorage.setItem('google-authenticated', 'true');
                            console.log('Authenticated');
                            return resolve(Authentication.loadClient());
                        }).catch((err: Error) => {
                            console.log(err);
                            return reject(true);
                        });
                    });
            });
        });
    }

    static async loadGAPIClient() {
        // @ts-ignore
        await gapi.load('auth2', async () => {
            const secretId = await fetch(CONFIG.apiPath + '/secret/id');
            const secretIdJSON = await secretId.json();
            // @ts-ignore
            gapi.auth2.getAuthInstance({
                client_id: secretIdJSON.CLIENT_ID
            });
            // @ts-ignore
            await gapi.auth2.getAuthInstance().signIn({
                scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
            })
            window.sessionStorage.setItem('google-authenticated', 'true');
        });

        /// @ts-ignore
        gapi.load('client', async () => {
            const response = await fetch(CONFIG.apiPath + '/secret/key');
            const responseJSON = await response.json();
            // @ts-ignore
            gapi.client.setApiKey(responseJSON.API_KEY);
            // @ts-ignore
            gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3");
        });
    };
    static loadClient() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            gapi.load('client', () => {
                
                fetch('http://localhost:3000/secret/key')
                    .then(response => response.json())
                    .then(responseJson => {
                        // @ts-ignore
                        gapi.client.setApiKey(responseJson.API_KEY);
                        // @ts-ignore
                        return resolve(gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3"));
                    });
            });
        });
    }
}