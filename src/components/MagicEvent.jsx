import { useEffect, useState } from 'react';

function MagicEvent({ event }) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!event) return undefined;

    const initialTick = window.setTimeout(() => setNow(Date.now()), 0);
    const interval = window.setInterval(() => setNow(Date.now()), 100);

    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(interval);
    };
  }, [event]);

  if (!event || now === 0 || now >= event.endsAt) return null;

  const secondsLeft = Math.max(1, Math.ceil((event.endsAt - now) / 1000));

  return (
    <div className="magic_event" role="status">
      <span className="magic_event_moon" aria-hidden="true">☾</span>
      <span><strong>{event.title}</strong> — {event.multiplier}× essence</span>
      <time dateTime={`PT${secondsLeft}S`}>{secondsLeft}s</time>
    </div>
  );
}

export default MagicEvent;
