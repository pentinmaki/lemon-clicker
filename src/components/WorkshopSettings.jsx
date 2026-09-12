import { useState } from 'react';
import SoundSettings from './SoundSettings';

function WorkshopSettings({ soundSettings, updateSoundSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="workshop_settings">
      <button
        className="workshop_settings_toggle"
        type="button"
        aria-label="Workshop settings"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">⚙</span>
      </button>
      {isOpen && (
        <div className="sound_popover" role="dialog" aria-label="Workshop settings" onClick={() => setIsOpen(false)}>
          <div className="sound_popover_card" onClick={(event) => event.stopPropagation()}>
            <button
              className="sound_popover_close"
              type="button"
              aria-label="Close workshop settings"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <SoundSettings settings={soundSettings} onChange={updateSoundSettings} />
          </div>
        </div>
      )}
    </aside>
  );
}

export default WorkshopSettings;
