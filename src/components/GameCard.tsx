import { Game } from '@/types';
import Image from 'next/image';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="game-card">
      <div className="game-image">
        <Image
          src={game.image.original.src}
          alt={game.gameText}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.gameText}</h3>
        <p className="game-provider">{game.provider}</p>
      </div>
    </div>
  );
};

export default GameCard;