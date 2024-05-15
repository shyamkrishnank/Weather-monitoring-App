import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { Outlet, useNavigate } from 'react-router-dom';


function InitialContents() {
    const navigate = useNavigate()

  return (
    <div>
     <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Weather App</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem onClick={()=>navigate('/user/records')} key="settings">My Records</DropdownItem>
            <DropdownItem key="settings">Add Records</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    <Outlet/>
        
      
    </div>
  )
}

export default InitialContents
