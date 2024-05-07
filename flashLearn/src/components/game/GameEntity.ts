
export  interface GameEntity{
    gameId:string;
    active:boolean;
    playerId:string;
    secondPlayerId:string;
    secondPlayerName:string;
}


export interface CardWithPosition{
    concept: string;
    definition: string;
    image: string;
    position: number;
    visible: boolean;
}
export default interface GameWrapper{
    game: GameEntity;
    cards: CardWithPosition[]; 
}
