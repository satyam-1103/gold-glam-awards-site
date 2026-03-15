import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const EVENT_DATE = new Date("2026-05-30T18:00:00").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, EVENT_DATE - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-background">
      <ScrollReveal className="container mx-auto px-4 text-center">
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-8">Event Countdown</p>
        <div className="flex justify-center gap-4 md:gap-8 mb-6">
          {units.map(({ label, value }) => (
            <div key={label} className="glass-card rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px]">
              <div className="font-serif text-3xl md:text-5xl font-bold gradient-gold-text">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-muted-foreground text-xs md:text-sm mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-primary font-medium animate-pulse">⚡ Limited nominations open</p>
      </ScrollReveal>
    </section>
  );
};

export default CountdownTimer;
