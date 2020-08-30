import React from 'react';

const Player = () => {
    return (
        <div className="container-fluid bg-light wrapper-sm">
            <div className="player">
                <div className="player-controls">
                    <button className="player-attribute" id="previous-button">
                        <i className="fas fa-backward"></i>
                    </button>
                    <button className="player-attribute" id="play-button">
                        <i className="fas fa-play"></i>
                    </button>
                    <button className="player-attribute hidden" id="pause-button">
                        <i className="fas fa-pause"></i>
                    </button>
                    <button className="player-attribute" id="next-button">
                        <i className="fas fa-forward"></i>
                    </button>
                    <div className="col-md-8 inline-block">
                        <div className="track-data">
                            <span id="elapsed-time"></span>
                        </div>
                        <div className="col-md-9 track-data ellipsis">
                            <span id="title"></span>
                        </div>
                        <div className="track-data">
                            <span id="total-time"></span>
                        </div>
                    </div>
                    <div className="inline-block float-right">
                        <button className="player-attribute" id="next-button">
                            <i className="fas fa-random"></i>
                        </button>
                        <button className="player-attribute" id="next-button">
                            <i className="fas fa-retweet"></i>
                        </button>
                        <button className="player-attribute" id="vol-up">
                            <i className="fas fa-volume-up"></i>
                        </button>
                        <button className="player-attribute hidden" id="vol-mute">
                            <i className="fas fa-volume-mute"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;