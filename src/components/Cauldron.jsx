import { useState } from 'react';
import shortenNumber from '../utils/shortenNumber';

function Cauldron(props) {
  const [brewCount, setBrewCount] = useState(0);

  const handleBrew = () => {
    setBrewCount((count) => count + 1);
    props.onClick();
  };

  return (
    <div className={props.isMoonSurgeActive ? 'cauldron moon_surge_active' : 'cauldron'}>
      {props.moonstones > 0 && (
        <span className="new_moon_aura" aria-hidden="true">
          <span className="new_moon_orbit new_moon_orbit_outer" />
          <span className="new_moon_orbit new_moon_orbit_inner" />
          <span className="new_moon_crescent">☾</span>
          <span className="new_moon_sparkle new_moon_sparkle_one">✦</span>
          <span className="new_moon_sparkle new_moon_sparkle_two">✧</span>
          <span className="new_moon_sparkle new_moon_sparkle_three">✦</span>
        </span>
      )}
      {props.isMoonSurgeActive && <span className="moon_surge_halo" aria-hidden="true" />}
      <span className="ambient_mote ambient_mote_one" aria-hidden="true">✦</span>
      <span className="ambient_mote ambient_mote_two" aria-hidden="true">✧</span>
      <span className="ambient_mote ambient_mote_three" aria-hidden="true">✦</span>
      <span className="ambient_bubble ambient_bubble_one" aria-hidden="true" />
      <span className="ambient_bubble ambient_bubble_two" aria-hidden="true" />
      <span className="ambient_bubble ambient_bubble_three" aria-hidden="true" />
      <button type="button" onClick={handleBrew} aria-label="Brew essence">
        <span
          key={`cauldron-${brewCount}`}
          className={brewCount ? 'cauldron_icon is-brewing' : 'cauldron_icon'}
          aria-hidden="true"
        >
          ⚗️
        </span>
        {brewCount > 0 && (
          <span key={`sparkles-${brewCount}`} className="brew_sparkles" aria-hidden="true">
            ✦ ✧ ✦
          </span>
        )}
        {brewCount > 0 && (
          <span key={`gain-${brewCount}`} className="brew_gain" aria-hidden="true">
            +{shortenNumber(props.value * (props.isMoonSurgeActive ? 5 : 1))}
          </span>
        )}
      </button>
    </div>
  );
}

export default Cauldron;
