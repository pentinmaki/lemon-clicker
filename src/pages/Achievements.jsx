import Header from '../components/Header';
import achievements from '../config/achievements';
import useGame from '../hooks/useGame';
import shortenNumber from '../utils/shortenNumber';

function Achievements() {
  const { stats } = useGame();
  const unlocked = achievements.filter(({ id }) => stats.unlockedAchievements?.includes(id));

  return (
    <div className="container achievements_page">
      <Header balance={stats.balance}>achievements</Header>
      <div className="scrollbox achievements_scroll">
        <div className="achievements_intro">
          <span aria-hidden="true">✦</span>
          <div>
            <h2>arcane milestones</h2>
            <p>{unlocked.length} of {achievements.length} discoveries unlocked</p>
          </div>
        </div>
        <div className="achievements_grid">
          {achievements.map((achievement) => {
            const isUnlocked = stats.unlockedAchievements?.includes(achievement.id);

            return (
              <article
                className={isUnlocked ? 'achievement is_unlocked' : 'achievement'}
                key={achievement.id}
              >
                <span className="achievement_icon" aria-hidden="true">{achievement.icon}</span>
                <div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
                <span className="achievement_status">
                  {isUnlocked ? 'unlocked' : `${shortenNumber(achievement.requirement)} required`}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
