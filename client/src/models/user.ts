export class User {
    private id: string;
    private email: string;
    private name: string;
    private imageUrl: string | undefined;
    private isLoggedIn: boolean;

    constructor(id: string, email: string, name: string, imageUrl?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
        this.isLoggedIn = false;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getName(): string {
        return this.name;
    }

    public getImageUrl(): string {
        return this.imageUrl ? this.imageUrl : '';
    }

    public setImageUrl(imageUrl: string): void {
        this.imageUrl = imageUrl;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public setIsLoggedIn(isLoggedIn: boolean): void {
        this.isLoggedIn = isLoggedIn;
    }
}