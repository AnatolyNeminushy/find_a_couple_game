import bgCard from "../assets/bgCard.png";

type Props = {
  card: string; // icon asset path
  revealed: boolean;
  matched: boolean;
  onClick: () => void;
};

export default function Card({ card, revealed, matched, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`card-outer ${
        matched
          ? "opacity-0 pointer-events-none transition-opacity delay-300"
          : "opacity-100"
      }`}
    >
      <div
        className={`card-inner ${revealed ? "card-inner--flipped" : ""}`}
        aria-hidden={matched}
      >
        <div
          className="card-face card-face--front"
          style={{ backgroundImage: `url(${bgCard})` }}
        />

        <div className="card-face card-face--back">
          <img src={card} alt="" className="card-icon" />
        </div>
      </div>
    </div>
  );
}
