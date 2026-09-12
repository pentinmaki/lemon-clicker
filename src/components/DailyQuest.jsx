import shortenNumber from '../utils/shortenNumber';

function DailyQuest({ quest, onClaim }) {
  const isComplete = quest.progress >= quest.target;
  const progress = Math.min(100, (quest.progress / quest.target) * 100);

  return (
    <section className="daily_quest" aria-labelledby="daily-quest-title">
      <div className="daily_quest_heading">
        <span aria-hidden="true">☾</span>
        <div>
          <h2 id="daily-quest-title">daily familiar</h2>
          <p>Returns with a new task tomorrow.</p>
        </div>
      </div>
      <div className="quest_card">
        <span className="quest_icon" aria-hidden="true">{quest.icon}</span>
        <div className="quest_details">
          <h3>{quest.title}</h3>
          <p>{quest.description}</p>
          <div className="quest_progress" aria-label={`${shortenNumber(quest.progress)} of ${shortenNumber(quest.target)}`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <small>{shortenNumber(quest.progress)} / {shortenNumber(quest.target)}</small>
        </div>
        <div className="quest_reward">
          <span>☾</span>
          <strong>+{quest.reward}</strong>
        </div>
      </div>
      {quest.claimed ? (
        <p className="quest_claimed">Moonstone collected — see you tomorrow.</p>
      ) : (
        <button className="quest_claim" type="button" disabled={!isComplete} onClick={onClaim}>
          {isComplete ? 'Claim moonstone' : 'Complete the task'}
        </button>
      )}
    </section>
  );
}

export default DailyQuest;
