import Menu from '../components/Menu'
import { Outlet } from "react-router-dom";
import useGame from '../hooks/useGame';

function Root() {
  const { stats } = useGame();

  return (
    <div className="root">
      <div className="root_content">
        <Outlet />
      </div>
      <Menu items={stats.itemstobuy}/>
    </div>
  )
}

export default Root;
