import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingHearts, Sparkles } from "@/components/FloatingHearts";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "A Special Birthday Wish 💖" },
      { name: "description", content: "A magical birthday surprise made just for you." },
    ],
  }),
});

function Index() {
  const [step, setStep] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-play birthday song when reaching the cake page
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (step === 3) {
      audio.currentTime = 0;
      audio.volume = 0.8;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [step]);

  // Birthday confetti
  useEffect(() => {
    if (step === 3) {
      const fire = () => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#ff6b9d", "#ffd93d", "#c490ff", "#ff8fab"] });
      };
      fire();
      const t = setTimeout(fire, 600);
      return () => clearTimeout(t);
    }
    if (step === 5 || step === 9) {
      const interval = setInterval(() => {
        confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#ff6b9d", "#ffd93d"] });
        confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#c490ff", "#ff8fab"] });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step]);

  const dodgeNo = () => {
    setNoCount((c) => c + 1);
    setNoPos({
      x: (Math.random() - 0.5) * 240,
      y: (Math.random() - 0.5) * 160,
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-dreamy flex items-center justify-center px-4 py-8">
      <audio ref={audioRef} src="/happy-birthday.ogg" loop preload="auto" />
      <FloatingHearts />
      <Sparkles />

      <div className="relative z-10 w-full max-w-lg">
        <div className="relative rounded-3xl bg-card/30 backdrop-blur-2xl border border-border shadow-glow p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-romance opacity-10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {step === 0 && (
                <>
                  <motion.img
                    src="/welcome.gif"
                    alt="Cute animal welcoming you"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.9, bounce: 0.5 }}
                    className="mx-auto mb-4 h-44 w-44 sm:h-52 sm:w-52 object-cover rounded-3xl shadow-glow border-4 border-white/40 bg-white/10"
                  />
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-shadow-glow">
                    I made something special for you
                  </h1>
                  <p className="mt-3 text-lg text-foreground/90">Do you wanna see it? 💖</p>
                  <div className="mt-7 flex gap-4 justify-center items-center relative h-14">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-gradient-button text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-soft hover:scale-110 transition-transform"
                    >
                      Yes 💕
                    </button>
                    <motion.button
                      onMouseEnter={dodgeNo}
                      onClick={dodgeNo}
                      animate={{ x: noPos.x, y: noPos.y }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-muted text-muted-foreground px-7 py-3 rounded-full font-semibold"
                    >
                      {noCount > 3 ? "Please? 🥺" : "No 😒"}
                    </motion.button>
                  </div>
                </>
              )}


              {step === 2 && (
                <>
                  <motion.img
                    src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
                    alt="Floating love letter with hearts"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="mx-auto mb-4 h-44 w-44 sm:h-52 sm:w-52 object-contain rounded-3xl shadow-glow border-4 border-white/40 bg-white/10"
                  />
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-shadow-glow">
                    A special message is coming...
                  </h1>
                  <p className="mt-3 text-foreground/80">Tap the heart to reveal 💗</p>
                  <motion.button
                    onClick={() => setStep(3)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-7 bg-gradient-button text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-glow animate-heartbeat"
                  >
                    ❤️ Click the Heart
                  </motion.button>
                </>
              )}


              {step === 3 && (
                <>
                  {/* Happy Birthday music */}
                  
                  {/* Floating party emojis */}
                  <div className="flex justify-center gap-2 text-2xl mb-2">
                    {["🎉", "✨", "🎊", "✨", "🎉"].map((e, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [-4, -14, -4], rotate: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.15 }}
                      >
                        {e}
                      </motion.span>
                    ))}
                  </div>

                  {/* Happy Birthday heading ABOVE the cake */}
                  <motion.h1
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.9 }}
                    className="text-4xl sm:text-5xl font-extrabold text-foreground text-shadow-glow tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #ff8fab, #ffd93d, #c490ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      paddingBottom: "0.1em",
                      lineHeight: 1.15,
                    }}
                  >
                    Happy Birthday!
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-base sm:text-lg text-foreground/90 font-medium"
                  >
                    You are so special to me 💖
                  </motion.p>

                  {/* HUGE cake with flickering candles */}
                  <div className="relative my-6 flex flex-col items-center">
                    {/* Candle flames */}
                    <div className="flex gap-6 mb-[-18px] z-10">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="text-3xl"
                          animate={{
                            scale: [1, 1.25, 0.9, 1.15, 1],
                            rotate: [-6, 6, -4, 4, -6],
                            y: [0, -3, 0, -2, 0],
                          }}
                          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                          style={{ filter: "drop-shadow(0 0 10px #ffb84d)" }}
                        >
                          🕯️
                        </motion.span>
                      ))}
                    </div>
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 1.2, bounce: 0.5 }}
                      className="text-[10rem] sm:text-[12rem] leading-none select-none"
                      style={{ filter: "drop-shadow(0 12px 28px rgba(255,107,157,0.45))" }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        🎂
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Dancing birthday penguin gif */}
                  <div className="flex justify-center items-end gap-3 mt-2 mb-4">
                    <motion.img
                      src="https://media.giphy.com/media/MRHOk4gSHfcuq55Lcj/giphy.gif"
                      alt="Penguin celebrating birthday"
                      animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                      transition={{ repeat: Infinity, duration: 1.6 }}
                      className="h-36 w-36 sm:h-44 sm:w-44 object-contain rounded-2xl shadow-glow border-4 border-white/40 bg-white/10"
                    />
                  </div>


                  <motion.button
                    onClick={() => setStep(4)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 bg-gradient-button text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-glow animate-heartbeat"
                  >
                    Next →
                  </motion.button>
                </>
              )}

              {step === 4 && (
                <>
                  <h1 className="text-2xl font-semibold text-foreground">I wrote you a letter 💌</h1>
                  <p className="mt-2 text-foreground/80">Tap to open</p>
                  <motion.img
                    src="https://media.giphy.com/media/ChKGaBXZTW9CgGt2s9/giphy.gif"
                    alt="Cute cat with floating hearts holding a letter"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mx-auto mt-4 h-40 w-40 sm:h-48 sm:w-48 object-contain rounded-3xl shadow-glow border-4 border-white/40 bg-white/10"
                  />
                  <motion.button
                    onClick={() => setStep(5)}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.85 }}
                    className="text-7xl mt-4 cursor-pointer block mx-auto"
                  >
                    ✉️
                  </motion.button>
                </>
              )}


              {step === 5 && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="text-5xl mb-3"
                  >
                    💖
                  </motion.div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-shadow-glow">
                    My Dearest,
                  </h1>
                  <p className="mt-4 text-foreground/95 leading-relaxed">
                    You are the most amazing person in my life. Every day with you feels like magic.
                    On your special day, I just want you to know — you are loved, cherished, and adored. 🌹
                  </p>
                  <button
                    onClick={() => setStep(6)}
                    className="mt-7 bg-gradient-button text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-soft hover:scale-105 transition-transform"
                  >
                    See your gifts 🎁
                  </button>
                </>
              )}

              {step === 6 && (
                <>
                  <h1 className="text-2xl font-bold text-foreground text-shadow-glow">🎟️ Love Coupons</h1>
                  <p className="text-foreground/80 text-sm mt-1">Redeem anytime 💕</p>
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    {[
                      { label: "Dinner Date", emoji: "🍽️" },
                      { label: "Movie Night", emoji: "🎬" },
                      { label: "Day Out", emoji: "💕" },
                      { label: "Surprise Gift", emoji: "🎁" },
                    ].map((c, i) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
                        className="bg-card/70 backdrop-blur border border-border rounded-2xl p-4 shadow-soft cursor-pointer"
                      >
                        <div className="text-3xl">{c.emoji}</div>
                        <div className="text-sm mt-1 font-semibold text-card-foreground">{c.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(7)}
                    className="mt-6 bg-gradient-button text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-soft hover:scale-105 transition-transform"
                  >
                    Flowers for you 💐
                  </button>
                </>
              )}

              {step === 7 && (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-shadow-glow">
                    A bouquet, just for you 💐
                  </h1>
                  <p className="mt-2 text-foreground/80">Because you brighten my world.</p>

                  <motion.img
                    src="https://media.giphy.com/media/5SbA6ZRhiI5jriUwqu/giphy.gif"
                    alt="Cute cat giving flowers"
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.9, bounce: 0.5 }}
                    className="mx-auto mt-4 h-36 w-36 sm:h-40 sm:w-40 object-contain rounded-3xl shadow-glow border-4 border-white/40 bg-white/10"
                  />

                  {/* Real bouquet built from layered, arranged flowers */}
                  <div className="relative mx-auto mt-6 h-72 w-64 sm:h-80 sm:w-72 select-none">
                    {/* soft glow behind */}
                    <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-romance opacity-40" />

                    {/* falling petals */}
                    {["🌸", "🌷", "🌹", "🌺", "💮", "🌻"].map((p, i) => (
                      <motion.span
                        key={`petal-${i}`}
                        className="absolute text-xl"
                        style={{ left: `${10 + i * 14}%`, top: "-10%" }}
                        animate={{ y: [0, 340], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 6, delay: i * 0.8, ease: "linear" }}
                      >
                        {p}
                      </motion.span>
                    ))}

                    {/* flower cluster — arranged like a real bouquet */}
                    <motion.div
                      initial={{ scale: 0, y: 30 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: "spring", duration: 1, bounce: 0.4 }}
                      className="absolute inset-x-0 top-2 flex justify-center"
                    >
                      <div className="relative w-56 h-44">
                        {/* back row */}
                        <span className="absolute left-2 top-2 text-5xl rotate-[-15deg]" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" }}>🌹</span>
                        <span className="absolute right-2 top-2 text-5xl rotate-[15deg]" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" }}>🌹</span>
                        <span className="absolute left-1/2 -translate-x-1/2 top-0 text-6xl" style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,.35))" }}>🌷</span>
                        {/* mid row */}
                        <span className="absolute left-6 top-12 text-5xl rotate-[-8deg]" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" }}>🌸</span>
                        <span className="absolute right-6 top-12 text-5xl rotate-[8deg]" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" }}>🌺</span>
                        <span className="absolute left-1/2 -translate-x-1/2 top-10 text-6xl" style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,.35))" }}>🌻</span>
                        {/* front row */}
                        <span className="absolute left-10 top-24 text-4xl rotate-[-12deg]">💮</span>
                        <span className="absolute right-10 top-24 text-4xl rotate-[12deg]">🌼</span>
                        <span className="absolute left-1/2 -translate-x-1/2 top-24 text-5xl">🌹</span>
                        {/* leaves */}
                        <span className="absolute left-0 top-20 text-4xl rotate-[-30deg]">🍃</span>
                        <span className="absolute right-0 top-20 text-4xl rotate-[30deg]">🍃</span>
                      </div>
                    </motion.div>

                    {/* wrapper paper (cone) */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-2 w-0 h-0"
                      style={{
                        borderLeft: "70px solid transparent",
                        borderRight: "70px solid transparent",
                        borderTop: "110px solid #ffd1e0",
                        filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))",
                      }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-2 w-0 h-0"
                      style={{
                        borderLeft: "55px solid transparent",
                        borderRight: "55px solid transparent",
                        borderTop: "90px solid #ffb3c8",
                      }}
                    />
                    {/* ribbon */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-12 text-3xl">🎀</div>
                  </div>

                  <button
                    onClick={() => setStep(8)}
                    className="mt-6 bg-gradient-button text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-soft hover:scale-105 transition-transform"
                  >
                    One more thing →
                  </button>
                </>
              )}

              {step === 8 && (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-shadow-glow">
                    A little something for you 🎁
                  </h1>
                  <p className="mt-2 text-foreground/80">Press play and enjoy 💕</p>
                  <motion.video
                    src="/special-video.mp4"
                    controls
                    autoPlay
                    loop
                    playsInline
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                    className="mx-auto mt-5 w-full max-w-sm rounded-3xl shadow-glow border-4 border-white/40 bg-black/40"
                  />
                  <button
                    onClick={() => setStep(9)}
                    className="mt-6 bg-gradient-button text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-soft hover:scale-105 transition-transform"
                  >
                    Continue →
                  </button>
                </>
              )}


              {step === 9 && (
                <>
                  {/* Big animated heart instead of basic gif */}
                  <div className="relative mx-auto mb-4 h-44 w-44 sm:h-52 sm:w-52 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(255,94,138,0.55), transparent 65%)" }}
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.6 }}
                    />
                    <motion.div
                      className="text-[10rem] sm:text-[11rem] leading-none relative"
                      style={{ filter: "drop-shadow(0 0 30px rgba(255,94,138,0.7))" }}
                      animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    >
                      ❤️
                    </motion.div>
                    {["💕", "💖", "💗", "💝", "💘"].map((h, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-2xl"
                        style={{ left: `${15 + i * 16}%`, top: "50%" }}
                        animate={{ y: [-10, -90], opacity: [0, 1, 0], scale: [0.6, 1.2, 0.8] }}
                        transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.3 }}
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>

                  <motion.h1
                    className="love-text mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    I Love You
                  </motion.h1>
                  <p className="mt-4 text-lg text-foreground/95">
                    Stay with me forever. Happy Birthday, my love. ❤️
                  </p>
                  <button
                    onClick={() => setStep(0)}
                    className="mt-6 bg-muted/40 backdrop-blur text-foreground px-6 py-2 rounded-full text-sm border border-border hover:bg-muted/60 transition"
                  >
                    Play again 🔁
                  </button>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
