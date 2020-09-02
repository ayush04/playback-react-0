export class Song {
    private id: string;
    private title: string;
    private description: string;
    private artistName: string;
    private thumbnail: string;
    private videoId: string | undefined;

    constructor(id: string, title: string, description: string, artistName: string, thumbnail: string, videoId?: string) {
        this.id = id;
        this.title = title;
        this.artistName = artistName;
        this.description = description;
        this.thumbnail = thumbnail;
        this.videoId = videoId;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getArtistName(): string {
        return this.artistName;
    }

    public getThumbnail(): string {
        return this.thumbnail;
    }

    public getVideoId(): string | undefined {
        return this.videoId;
    }

    public setVideoId(videoId: string): void {
        this.videoId = videoId;
    }

    static getSongFromList(list: Array<Song>, id: string | null): Song | null {
        let filteredList = list.filter(song => song.getId() == id);
        if (filteredList.length === 0) {
            filteredList = list.filter(song => song.getVideoId() == id);
        }
        return filteredList.length > 0 ? filteredList[0]: null;
    }
}