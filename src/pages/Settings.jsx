import Header from '../components/Header';

function Settings(props) {
  return (
    <div className="container">   
      <Header balance={props.stats.balance}>settings</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>lemon stats</h2>
          <div>
            TODO stats
          </div>
        </div>
        TODO reset
      </div>
    </div>
  );
}

export default Settings;
