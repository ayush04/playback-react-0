import CONFIG from "../config/config";
import { Song } from "../models/song";
import { Authentication } from "./authentication";

class Search {

  static youTubeSearch(q: string, part?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
        gapi.load('client', () => {
            //@ts-ignore
            if (!gapi.client.youtube) {
                Authentication.loadClient().then(() => {
                    return Search._search(q, part)
                        .then((response: Array<Song>) => resolve(Search._processYoutubeResponse(response)))
                        .catch((err: Error) => {
                            console.log(err);
                            reject(err);
                        });
                });                    
            }
            else {
                return Search._search(q, part)
                    .then((response: Array<Song>) => resolve(Search._processYoutubeResponse(response)))
                    .catch((err: Error) => {
                        console.log(err);
                        reject(err);
                    });
            }
        });
    });
}

  static search = async (q: string) => {
    const response = await fetch(
      CONFIG.apiPath + "/search/" + encodeURIComponent(q)
    );
    const responseJSON = await response.json();
    return Search._processResponse(responseJSON);
  };

  private static _processResponse = (response: any): Array<Song> => {
    let processedResponse = new Array<Song>();

    if (!response || !response.results) {
      return processedResponse;
    }
    for (let item of response.results) {
      let thumbnail = item.artworkUrl100
        ? item.artworkUrl100
        : item.artworkUrl60
        ? item.artworkUrl60
        : item.artworkUrl30
        ? item.artworkUrl30
        : "";

      const resObj = new Song(
        item.trackId,
        item.trackName,
        item.collectionName,
        item.artistName,
        thumbnail
      );

      processedResponse.push(resObj);
    }
    return processedResponse;
  };

  private static _search(q: string, part?: string): Promise<any> {
    // @ts-ignore
    return gapi.client.youtube.search.list({
        part: part ? part : 'snippet',
        q: q,
        type: 'video',
        maxResults: CONFIG.maxSearchResults
    })
}

private static _processYoutubeResponse(response: any): String {
    let songId = '';
    if (response && response.result && response.result.items) {
        songId = response.result.items[0].id.videoId;
    }
    return songId;
}
};

export default Search;
