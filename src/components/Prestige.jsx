import { useState } from 'react';
import shortenNumber from '../utils/shortenNumber';

function Prestige({ balance, moonstones, rituals, onPrestige, requirement }) {
  const [confirming, setConfirming] = useState(false);
  const earnedMoonstones = Math.floor(balance / requirement);
  const progress = Math.min(100, (balance / requirement) * 100);

  return (
    <section className="prestige" aria-labelledby="new-moon-title">
      <div className="prestige_heading">
        <span aria-hidden="true">🌙</span>
        <div>
          <h2 id="new-moon-title">new moon ritual</h2>
          <p>{rituals} rituals · {moonstones} moonstones · +{moonstones * 15}% permanent brew power</p>
        </div>
      </div>
      <p className="prestige_description">
        Begin again with fresh tools. Moonstones stay forever and awaken a New Moon glow in your workshop.
      </p>
      <div className="prestige_progress" aria-label={`${shortenNumber(balance)} of ${shortenNumber(requirement)} essence`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="prestige_requirement">
        {earnedMoonstones > 0
          ? `The ritual will grant ${earnedMoonstones} moonstone${earnedMoonstones === 1 ? '' : 's'}.`
          : `${shortenNumber(requirement - balance)} essence until the next moonstone.`}
      </p>
      {confirming ? (
        <div className="prestige_confirm">
          <p>Your essence and arcane tools will reset. Moonstones, achievements, and today’s quest stay.</p>
          <button type="button" className="prestige_begin" onClick={onPrestige}>Begin new moon</button>
          <button type="button" className="prestige_cancel" onClick={() => setConfirming(false)}>Not yet</button>
        </div>
      ) : (
        <button
          type="button"
          className="prestige_begin"
          disabled={earnedMoonstones === 0}
          onClick={() => setConfirming(true)}
        >
          Begin new moon
        </button>
      )}
    </section>
  );
}

export default Prestige;
