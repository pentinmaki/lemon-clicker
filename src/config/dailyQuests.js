const questTemplates = [
  {
    id: 'patient-brewer',
    type: 'brew',
    target: 100,
    title: 'Patient Brewer',
    description: 'Brew essence 100 times.',
    icon: '⚗',
  },
  {
    id: 'market-visitor',
    type: 'purchase',
    target: 3,
    title: 'Market Visitor',
    description: 'Buy 3 arcane tools.',
    icon: '🪄',
  },
  {
    id: 'essence-hunt',
    type: 'essence',
    target: 50000,
    title: 'Essence Hunt',
    description: 'Brew 50,000 essence.',
    icon: '✦',
  },
];

export const getCurrentDay = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${today.getFullYear()}-${month}-${day}`;
};

const getTemplateForDay = (day) => {
  const index = [...day].reduce((total, character) => total + character.charCodeAt(0), 0)
    % questTemplates.length;

  return questTemplates[index];
};

export const createDailyQuest = (day = getCurrentDay()) => {
  const template = getTemplateForDay(day);

  return {
    ...template,
    day,
    progress: 0,
    claimed: false,
    reward: 1,
  };
};

export const normaliseDailyQuest = (quest) => {
  const currentDay = getCurrentDay();
  const expectedQuest = getTemplateForDay(currentDay);

  if (!quest || quest.day !== currentDay || quest.id !== expectedQuest.id) {
    return createDailyQuest(currentDay);
  }

  return {
    ...expectedQuest,
    day: currentDay,
    progress: Math.min(
      expectedQuest.target,
      Number.isFinite(quest.progress) && quest.progress >= 0 ? quest.progress : 0
    ),
    claimed: Boolean(quest.claimed),
    reward: 1,
  };
};

export const updateQuestProgress = (stats, action, amount) => {
  const quest = normaliseDailyQuest(stats.dailyQuest);

  if (quest.claimed || quest.type !== action) {
    return { ...stats, dailyQuest: quest };
  }

  return {
    ...stats,
    dailyQuest: {
      ...quest,
      progress: Math.min(quest.target, quest.progress + amount),
    },
  };
};
