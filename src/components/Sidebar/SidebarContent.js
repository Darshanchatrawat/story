import React, { useContext } from 'react'
import { Avatar, Button, Dropdown, DropdownItem, Input, Label } from '@windmill/react-ui'

import routes from '../../routes/sidebar'
import { NavLink, Route, Link, useHistory } from 'react-router-dom'

import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'

import Logo from "../../assets/img/logo.png";
import AvatarCustom from "../Avatar"

//redux
import { AuthContext } from "../../context/AuthContext"
import { useRef } from 'react'
import { useEffect } from 'react'


function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  const history = useHistory();
  const { user } = useContext(AuthContext)


  const [selectAppDropdown, setselectAppDropdown] = React.useState({
    open: false,
    data: { title: "Select App", path: "" },
    list: [
      { title: "Interview App", path: "/app/interview" },
    ]
  });

  React.useEffect(() => {
    let app = selectAppDropdown.list.find((item) => history.location.pathname == item.path);
    if (!app) return;
    setselectAppDropdown((old) => ({ ...old, data: app }));
  }, []);

  //profile
  const [profileMenu, setprofileMenu] = React.useState({
    open: false,
    data: { title: user.name },
    list: [
      {
        title: "Profile", click: function () {
          history.push("/app/profile");
        }
      },
      {
        title: "Log out", click: function () {
          history.push("/app/logout");
        }
      }
    ]
  });

  const aboutSection = useRef(null);

  const handleClick = () => {
    setprofileMenu((old) => ({ ...old, open: true }));



  }
  useEffect(() => {
    if (!profileMenu.open) return;
    // window.scrollTo({ top: aboutSection.current.offsetTop, behavior: 'smooth' });
    aboutSection.current.scrollIntoView({ behavior: "smooth" });
  }, [profileMenu])

  return (
    <div style={{ height: "80%" }} className="py-4 pb-10 text-gray-500 dark:text-gray-400">
      <Link to="/" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        <img src={Logo} alt="" className="ml-3 h-6 w-auto" />
      </Link>


      <div className="relative mb-5 mt-5 ml-5 z-50">
        <div id="email" value="" className='mb-2'>
          <label style={{ fontSize: "13px" }}>Select App</label>
        </div>
        <Button style={{ width: 280, color: "var(--primary-color)", height: 50, background: "var(--light-gray)", border: "0.5px solid #848484", borderRadius: "10px", outline: "none" }} className='justify-between' onClick={() => setselectAppDropdown((old) => ({ ...old, open: !old.open }))} aria-label="Notifications" aria-haspopup="true">
          <span>{selectAppDropdown.data.title}</span>
          <Icons.DropdownIcon style={{ height: 20 }} />
        </Button>

        {selectAppDropdown.open && <Dropdown style={{ width: 280 }} isOpen={selectAppDropdown.open} onClose={() => setselectAppDropdown((old) => ({ ...old, open: !old.open }))}>
          {
            selectAppDropdown.list.map((item) => {
              return <DropdownItem className="justify-between" onClick={() => {
                setselectAppDropdown((old) => ({ ...old, data: item, open: false }));
                history.push(item.path);
              }}>
                <span>{item.title}</span>
              </DropdownItem>
            })
          }
        </Dropdown>}
      </div>

      <ul className="h-full mt-6 flex flex-col justify-between">
        <div>
          {routes.map((route, i) => {
            if (route.type == "bottom") return;
            return route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              route.name ? (
                <li className="relative px-6 py-3" key={route.name}>
                  <NavLink
                    exact
                    to={route.path}
                    className="inline-flex items-center w-full text-sm  transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    activeClassName="text-gray-800 dark:text-gray-100"
                  >
                    <Route path={route.path} exact={route.exact}>
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    </Route>

                    {
                      history.location.pathname == route.path ? <>
                        <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} color={"var(--primary-color) "} style={{ filter: "invert(11%) sepia(96%) saturate(5979%) hue-rotate(262deg) brightness(91%) contrast(112%)" }} />
                        <span className="ml-4 text-base " style={{ color: "var(--primary-color)" }} >{route.name}</span>
                      </> : <>
                        <Icon className="w-5 h-5 text-gray-900 " style={{ filter: "brightness(0)" }} aria-hidden="true" icon={route.icon} />
                        <span className="ml-4 text-black text-base" >{route.name}</span>
                      </>
                    }

                  </NavLink>
                </li>
              ) : (
                <li className={`relative px-6 py-3`} key={i}>
                  <hr />
                </li>
              )
            )
          }
          )}
        </div>
        <div>
          {routes.map((route, i) => {
            if (route.type != "bottom") return;

            return route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              route.name ? (
                <li className="relative px-6 py-3" key={route.name}>
                  <NavLink
                    exact
                    to={route.path}
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    activeClassName="text-gray-800 dark:text-gray-100"
                  >
                    <Route path={route.path} exact={route.exact}>
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    </Route>

                    {
                      history.location.pathname == route.path ? <>
                        <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} color={"var(--primary-color) "} style={{ filter: " invert(11%) sepia(96%) saturate(5979%) hue-rotate(262deg) brightness(91%) contrast(112%)" }} />
                        <span className="ml-4" style={{ color: "var(--primary-color)" }} >{route.name}</span>
                      </> : <>
                        <Icon className="w-5 h-5 " aria-hidden="true" icon={route.icon} style={{ filter: "brightness(0)" }} />
                        <span className="ml-4 text-black" >{route.name}</span>
                      </>
                    }

                  </NavLink>
                </li>
              ) : (
                <li className={`relative px-6 py-3`} key={i}>
                  <hr />
                </li>
              )
            )
          }
          )}

          <Label className='relative px-6 py-3 pt-0'>
            <Input placeholder='Quick Search' className="mt-1 search-input" />
          </Label>

          <div className="relative mb-5 ml-5 z-50">
            <Button style={{ width: 280, height: 50, color: "black", background: "transparent", borderRadius: "10px", outline: "none", border: "none" }} className='justify-between' onClick={handleClick} aria-label="Notifications" aria-haspopup="true">
              <div className='flex items-center'>
                <AvatarCustom name={user.name} color={user.profileColor} className="align-middle mr-3" />
                <span>{profileMenu.data.title}</span>
              </div>
              <Icons.DropdownIcon style={{ height: 20 }} />
            </Button>

            {profileMenu.open && <Dropdown style={{ width: 280 }} isOpen={profileMenu.open} onClose={() => setprofileMenu((old) => ({ ...old, open: false }))}>
              {
                profileMenu.list.map((item) => {
                  return <DropdownItem className="justify-between" onClick={() => item.click()}>
                    <span>{item.title}</span>
                  </DropdownItem>
                })
              }
            </Dropdown>}
          </div>
        </div>
      </ul>
      <div className=' ' ref={aboutSection}></div>

    </div>
  )
}

export default SidebarContent
