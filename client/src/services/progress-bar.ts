import { Player } from './player';

export class ProgressBar {
    private totalTime: number = 0;
    private currentPosition: number = 0;
    private tick: number = 0;
    private static timer: any;
    private element: string;
    private progressBarEl: HTMLElement | null;
    private static _instance: ProgressBar;

    private constructor(element: string) {
        this.element = element;
        this.progressBarEl = document.getElementById(this.element);
        this._addClickListener();
    }

    static getInstance(element: string): ProgressBar {
        if (!ProgressBar._instance) {
            ProgressBar._instance = new ProgressBar(element);
        }
        return ProgressBar._instance;
    }

    setTime(totalTime: number): void {
        this.totalTime = totalTime;
        this.tick = this.totalTime / 100;
    }
    private update(): void {
        if (this.currentPosition < 100) { 
            if (this.progressBarEl) {
                this.currentPosition = this.currentPosition + 0.1;
                this.progressBarEl.style.width = this.currentPosition + '%'; 
            }
        }
    }

    start(): void {
        ProgressBar.timer = setInterval(() => {
            this.update(); 
        }, (this.tick * 100));
    }

    stop(): void {
        clearInterval(ProgressBar.timer);
    }

    reset(): void {
        this.stop();
        this.currentPosition = 0;
        this.tick = 0;
        this.update();
    }

    private _addClickListener(): void {
        if (this.progressBarEl && this.progressBarEl.parentElement) {
            this.progressBarEl.parentElement.addEventListener('click', (event) => {
                if (this.progressBarEl && this.progressBarEl.parentElement) {
                    const seek = (this.totalTime / this.progressBarEl.parentElement.clientWidth) * (event.pageX - 200);
                    this.stop();
                    const pos = (seek / this.totalTime) * 100;
                    this.currentPosition = parseFloat((Math.round(pos * 10) / 10).toFixed(1));
                    Player.seekTo(seek);
                }
            });
        }
    }
}