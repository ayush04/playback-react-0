import CONFIG from "../config/config";
import { Song } from "../models/song";

class Search {
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
};

export default Search;
