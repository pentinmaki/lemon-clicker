import { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import achievements from './config/achievements.js';
import { createDailyQuest, normaliseDailyQuest, updateQuestProgress } from './config/dailyQuests.js';
import items from './config/items.js';
import { playAmbientBubble, playBrewSound, playPurchaseSound } from './utils/sounds.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import useLocalStorage from './utils/useLocalStorage';
import './App.css'

const saveVersion = 3;
const moonSurgeDuration = 10000;
const newMoonRequirement = 1000000;

const getNextMoonSurge = (clicks) => clicks + Math.floor(Math.random() * 81) + 100;

const initialstats = {
  clicks: 0,
  balance: 0,
  increase: 1,
  itemstobuy: 0,
  upgrades: 0,
  collected: 0,
  moonstones: 0,
  prestigeCount: 0,
  dailyQuest: createDailyQuest(),
  unlockedAchievements: [],
  version: saveVersion
};

const initialSoundSettings = { enabled: true, volume: 35 };

const isValidNumber = (value) => Number.isFinite(value) && value >= 0;

const getItemPrice = (item, qty) =>
  Math.floor(item.baseprice * Math.pow(1.15, qty));

const countBuyableItems = (items, balance) => {
  let total = 0;
  getPurchasableItems(items).forEach(item => {
    if (item.price <= balance) total++;
  });
  return total;
};

const getCleanItems = () => items.map((item) => ({
  ...item,
  qty: 0,
  price: getItemPrice(item, 0),
}));

const addDerivedStats = (currentStats, currentItems) => {
  const upgrades = currentItems.reduce((total, item) => total + item.qty, 0);
  const moonstones = Number.isInteger(currentStats.moonstones) && currentStats.moonstones >= 0
    ? currentStats.moonstones
    : 0;
  const increase = round(
    1 + currentItems.reduce((total, item) => total + item.multiplier * item.qty, 0),
    1
  );
  const boostedIncrease = round(increase * (1 + moonstones * 0.05), 1);
  const derivedStats = {
    ...currentStats,
    version: saveVersion,
    moonstones,
    increase: boostedIncrease,
    upgrades,
    itemstobuy: countBuyableItems(currentItems, currentStats.balance),
  };
  const storedAchievements = Array.isArray(currentStats.unlockedAchievements)
    ? currentStats.unlockedAchievements
    : [];
  const newlyUnlocked = achievements
    .filter(({ stat, requirement }) => derivedStats[stat] >= requirement)
    .map(({ id }) => id);

  return {
    ...derivedStats,
    unlockedAchievements: [...new Set([...storedAchievements, ...newlyUnlocked])],
  };
};

function App() {

  // Esitellään pelin laskennalliset alkuarvot.

  const migrateStats = (savedStats) => {
    if (!savedStats || typeof savedStats !== 'object') return initialstats;

    return {
      ...initialstats,
      clicks: isValidNumber(savedStats.clicks) ? savedStats.clicks : 0,
      balance: isValidNumber(savedStats.balance) ? savedStats.balance : 0,
      collected: isValidNumber(savedStats.collected) ? savedStats.collected : 0,
      moonstones: Number.isInteger(savedStats.moonstones) && savedStats.moonstones >= 0
        ? savedStats.moonstones
        : 0,
      prestigeCount: Number.isInteger(savedStats.prestigeCount) && savedStats.prestigeCount >= 0
        ? savedStats.prestigeCount
        : 0,
      dailyQuest: normaliseDailyQuest(savedStats.dailyQuest),
      unlockedAchievements: Array.isArray(savedStats.unlockedAchievements)
        ? savedStats.unlockedAchievements.filter((id) => achievements.some((achievement) => achievement.id === id))
        : [],
    };
  };

  const migrateSoundSettings = (savedSettings) => ({
    enabled: typeof savedSettings?.enabled === 'boolean'
      ? savedSettings.enabled
      : initialSoundSettings.enabled,
    volume: Number.isInteger(savedSettings?.volume)
      ? Math.min(100, Math.max(0, savedSettings.volume))
      : initialSoundSettings.volume,
  });

  const migrateItems = (savedItems) => {
    if (!Array.isArray(savedItems)) return items;

    return items.map((item, index) => {
      // Aiemmat tallennukset käyttivät eri tunnisteita,
      // mutta samassa järjestyksessä olevat rakennukset voidaan säilyttää.
      const savedItem = savedItems.find((candidate) => candidate?.id === item.id)
        ?? savedItems[index];
      const qty = Number.isInteger(savedItem?.qty) && savedItem.qty >= 0
        ? savedItem.qty
        : 0;

      return { ...item, qty, price: getItemPrice(item, qty) };
    });
  };

  // Luodaan taltio, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats] = useLocalStorage(
    'lemon-stats', initialstats, migrateStats
  );

  // Luodaan taltio, johon tallennetaan tuotelista.
  const [storeitems, setStoreitems] = useLocalStorage(
    'lemon-items', items, migrateItems
  );
  const [soundSettings, setSoundSettings] = useLocalStorage(
    'witch-workshop-sound', initialSoundSettings, migrateSoundSettings
  );
  const [magicEvent, setMagicEvent] = useState(null);
  const [nextMoonSurgeAt, setNextMoonSurgeAt] = useState(() => getNextMoonSurge(stats.clicks));

  // Korjaa myös vanhat tallennukset, joissa tuotanto jäi ostoksen verran jälkeen.
  useEffect(() => {
    setStats((currentStats) => addDerivedStats(currentStats, storeitems));
  }, [storeitems, setStats]);

  useEffect(() => {
    if (!magicEvent) return undefined;

    const timeout = window.setTimeout(() => {
      setMagicEvent(null);
    }, Math.max(0, magicEvent.endsAt - Date.now()));

    return () => window.clearTimeout(timeout);
  }, [magicEvent]);

  useEffect(() => {
    if (!soundSettings.enabled) return undefined;

    const bubbles = window.setInterval(() => {
      playAmbientBubble(soundSettings.volume / 100);
    }, 5200);

    return () => window.clearInterval(bubbles);
  }, [soundSettings]);

  const handleClick = () => {
    if (!magicEvent && nextMoonSurgeAt === null) {
      setNextMoonSurgeAt(getNextMoonSurge(stats.clicks));
    }

    const isMoonSurgeActive = magicEvent?.endsAt > Date.now();
    const multiplier = isMoonSurgeActive ? magicEvent.multiplier : 1;
    const startsMoonSurge = !magicEvent
      && nextMoonSurgeAt !== null
      && stats.clicks + 1 >= nextMoonSurgeAt;

    if (soundSettings.enabled) playBrewSound(soundSettings.volume / 100);

    setStats((currentStats) => {
      const essenceGained = round(currentStats.increase * multiplier, 1);
      const newStats = {
        ...currentStats,
        clicks: currentStats.clicks + 1,
        balance: round(currentStats.balance + essenceGained, 1),
        collected: round(currentStats.collected + essenceGained, 1),
      };

      const withBrewProgress = updateQuestProgress(newStats, 'brew', 1);
      const withQuestProgress = updateQuestProgress(withBrewProgress, 'essence', essenceGained);

      return addDerivedStats(withQuestProgress, storeitems);
    });

    if (startsMoonSurge) {
      setNextMoonSurgeAt(null);
      setMagicEvent({
        id: 'moon-surge',
        title: 'Moon Surge',
        multiplier: 5,
        endsAt: Date.now() + moonSurgeDuration,
      });
    }
  }

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id === id);
    const item = storeitems[index];
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (item && stats.balance >= item.price) {
      const newstoreitems = storeitems.map((storeitem, itemIndex) => {
        if (itemIndex !== index) return storeitem;

        const qty = storeitem.qty + 1;
        return { ...storeitem, qty, price: getItemPrice(storeitem, qty) };
      });

      let newstats = {...stats};
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - item.price,1);
      newstats = updateQuestProgress(newstats, 'purchase', 1);
      newstats = addDerivedStats(newstats, newstoreitems);
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
      if (soundSettings.enabled) playPurchaseSound(soundSettings.volume / 100);
    }
  }

  const handleClaimDailyQuest = () => {
    setStats((currentStats) => {
      const quest = normaliseDailyQuest(currentStats.dailyQuest);
      if (quest.claimed || quest.progress < quest.target) {
        return { ...currentStats, dailyQuest: quest };
      }

      return addDerivedStats({
        ...currentStats,
        moonstones: currentStats.moonstones + quest.reward,
        dailyQuest: { ...quest, claimed: true },
      }, storeitems);
    });
  };

  const handlePrestige = () => {
    const earnedMoonstones = Math.floor(stats.balance / newMoonRequirement);
    if (earnedMoonstones === 0) return;

    const cleanItems = getCleanItems();
    const freshStats = {
      ...initialstats,
      moonstones: stats.moonstones + earnedMoonstones,
      prestigeCount: stats.prestigeCount + 1,
      dailyQuest: normaliseDailyQuest(stats.dailyQuest),
      unlockedAchievements: stats.unlockedAchievements,
    };

    setMagicEvent(null);
    setNextMoonSurgeAt(getNextMoonSurge(0));
    setStoreitems(cleanItems);
    setStats(addDerivedStats(freshStats, cleanItems));
  };

  const updateSoundSettings = (changes) => {
    setSoundSettings((currentSettings) => ({ ...currentSettings, ...changes }));
  };

  const handleReset = () => {
    // Palautetaan taltiot alkuarvoihin.
    const cleanItems = getCleanItems();
    setMagicEvent(null);
    setNextMoonSurgeAt(getNextMoonSurge(0));
    setStoreitems(cleanItems);
    setStats(addDerivedStats({ ...initialstats, dailyQuest: createDailyQuest() }, cleanItems));
  }

  return (
    <AppRouter stats={stats}
               storeitems={storeitems}
               handleClick={handleClick}
               handlePurchase={handlePurchase}
               handleReset={handleReset}
               magicEvent={magicEvent}
               newMoonRequirement={newMoonRequirement}
               handlePrestige={handlePrestige}
               handleClaimDailyQuest={handleClaimDailyQuest}
               soundSettings={soundSettings}
               updateSoundSettings={updateSoundSettings} />
  )
}

export default App
