import { useEffect, useMemo, useState } from "react";
import Card from "./components/Card";
import burningBookIcon from "./assets/icons/game-icons_burning-book.svg";
import monsterGraspIcon from "./assets/icons/game-icons_monster-grasp.svg";
import seaDragonIcon from "./assets/icons/game-icons_sea-dragon.svg";
import spartanHelmetIcon from "./assets/icons/game-icons_spartan-helmet.svg";
import warlordHelmetIcon from "./assets/icons/game-icons_warlord-helmet.svg";
import axeBattleIcon from "./assets/icons/mdi_axe-battle.svg";
import shieldIcon from "./assets/icons/solar_shield-linear.svg";
import swordIcon from "./assets/icons/vaadin_sword.svg";
import bgBoard from "./assets/bgBoard.png";
import bgWood from "./assets/bgWood.png";

const iconSet = [
  burningBookIcon,
  monsterGraspIcon,
  seaDragonIcon,
  spartanHelmetIcon,
  warlordHelmetIcon,
  axeBattleIcon,
  shieldIcon,
  swordIcon,
];

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const initial = useMemo(() => shuffle([...iconSet, ...iconSet]), []);
  const [deck, setDeck] = useState(initial);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<boolean[]>(
    Array(initial.length).fill(false)
  );
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isTimerActive) return;
    const id = window.setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isTimerActive]);

  useEffect(() => {
    if (matched.length && matched.every(Boolean)) {
      setIsTimerActive(false);
      setShowModal(true);
    }
  }, [matched]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  function onCardClick(i: number) {
    if (locked) return;
    if (matched[i]) return;
    if (open.includes(i)) return;

    const next = [...open, i];
    setOpen(next);

    if (next.length === 2) {
      setMoves((prev) => prev + 1);
      setLocked(true);
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        const m = [...matched];
        m[a] = m[b] = true;
        setTimeout(() => {
          setMatched(m);
          setOpen([]);
          setLocked(false);
        }, 250);
      } else {
        setTimeout(() => {
          setOpen([]);
          setLocked(false);
        }, 700);
      }
    } else if (next.length > 2) {
      setOpen([i]);
    }
  }

  function newGame() {
    const d = shuffle([...iconSet, ...iconSet]);
    setDeck(d);
    setOpen([]);
    setMatched(Array(d.length).fill(false));
    setLocked(false);
    setMoves(0);
    setTime(0);
    setIsTimerActive(true);
    setShowModal(false);
  }

  return (
    <div
      className="flex w-full items-center justify-center px-4 py-4"
      style={{ minHeight: "100dvh", overflow: "hidden" }}
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-6">
        <div
          className="flex w-full   p-4 rounded-xl border-4 border-[#582710] max-w-md flex-wrap items-center justify-between gap-4"
          style={{
            backgroundImage: `url(${bgWood})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-1 flex-col gap-1 text-center sm:text-left">
            <span className="text-sm uppercase tracking-wide text-slate-100">
              Время
            </span>
            <span className="text-2xl font-semibold text-slate-200">
              {formatTime(time)}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 items-start sm:text-right">
            <span className="text-sm uppercase tracking-wide text-slate-100">
              Ходы
            </span>
            <span className="text-2xl font-semibold text-slate-200">
              {moves}
            </span>
          </div>
          <button
            onClick={newGame}
            className="w-full rounded-xl bg-green-400 text-green-800 px-4 py-2 text-center text-sm font-semibold hover:bg-green-500 sm:w-auto"
          >
            Новая игра
          </button>
        </div>

        <div className="board grid grid-cols-4 place-items-center gap-3">
          {deck.map((color, i) => {
            const revealed = matched[i] || open.includes(i);
            return (
              <Card
                key={`${color}-${i}`}
                card={color}
                revealed={revealed}
                matched={matched[i]}
                onClick={() => onCardClick(i)}
              />
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div
            className="w-full  max-w-xl   rounded-3xl p-24 text-center  text-slate-50"
            style={{
              backgroundImage: `url(${bgBoard})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="text-sm mt-4 font-semibold uppercase tracking-wider text-emerald-400">
              Молодец!
            </p>
            <h2 className=" text-2xl font-bold text-white">Уровень пройден</h2>
            <p className="mt-3 text-sm text-slate-100/80">
              Ты справился со всеми карточками. Готов начать заново?
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/70 backdrop-blur-lg p-4">
                <span className="text-xs uppercase tracking-wide text-slate-700">
                  Время
                </span>
                <p className=" text-2xl font-semibold text-slate-900">
                  {formatTime(time)}
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 backdrop-blur-lg p-4">
                <span className="text-xs uppercase tracking-wide text-slate-700">
                  Ходы
                </span>
                <p className="text-2xl font-semibold text-slate-900">{moves}</p>
              </div>
            </div>
            <button
              onClick={newGame}
              className="mt-4 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-600"
            >
              Начать заново
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
