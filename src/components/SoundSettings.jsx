function SoundSettings({ settings, onChange }) {
  return (
    <section className="sound_settings" aria-labelledby="sound-settings-title">
      <div>
        <h2 id="sound-settings-title">workshop sounds</h2>
        <p>Gentle brews, purchases, and cauldron bubbles.</p>
      </div>
      <label className="sound_toggle">
        <input
          type="checkbox"
          checked={settings.enabled}
          onChange={(event) => onChange({ enabled: event.target.checked })}
        />
        <span aria-hidden="true" />
        Sound {settings.enabled ? 'on' : 'off'}
      </label>
      <label className="volume_control">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.volume}
          disabled={!settings.enabled}
          onChange={(event) => onChange({ volume: Number(event.target.value) })}
        />
        <output>{settings.volume}%</output>
      </label>
    </section>
  );
}

export default SoundSettings;
