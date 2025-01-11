import Menu from '../components/Menu'
import { Outlet } from "react-router-dom";

function Root(props) {
  return (
    <div className="root">
      <div className="root_content">
        <Outlet />
      </div>
      <Menu items={props.items}/>
    </div>
  )
}

export default Root;
