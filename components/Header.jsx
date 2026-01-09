"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import "@/styles/header.css";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";

import storeIcon from "@/public/images/store.png";
import logo from "@/public/images/logo.svg";
import abfrlLogo from "@/public/images/abfrlLogo.svg";
import cartIcon from "@/public/images/cart.png";
import heartIcon from "@/public/images/heart.png";
import manIcon from "@/public/images/man.png";
import searchIcon from "@/public/images/search.png";
import editIcon from "@/public/images/edit.png";

function Header() {
  const [storeActive, setStoreActive] = useState(false);
  const topHeaderNavElements = [
    "GREENCARD",
    "GIFT CARD",
    "STORE LOCATOR",
    "TRACK ORDER",
    "CONTACT",
  ];

  const menuItems = ["WOMEN", "MEN", "KIDS", "HOME & LIVING", "BRANDS", "SALE"];
  return (
    <div className="header-container">
      <div className="top-header">
        <div className="top-header-wrapper">
          <div className="top-header-nav">
            {topHeaderNavElements.map((element, index) => {
              return (
                <a href="#" key={index} className="top-header-nav-ele">
                  <span>{element}</span>
                </a>
              );
            })}
          </div>
          <div className="top-header-store-nav">
            <span>ENTIRE COLLECTION</span>
            <Switch
              checked={storeActive}
              onChange={() => {
                setStoreActive(!storeActive);
              }}
              size="small"
              sx={{
                width: 34,
                height: 14,
                padding: 0,
                '& .MuiSwitch-switchBase': {
                  padding: 0,
                  margin: '1px',
                  transitionDuration: '300ms',
                  '&.Mui-checked': {
                    transform: 'translateX(20px)',
                    color: '#fff',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#4da09fff',
                      opacity: 1,
                      border: 0,
                    },
                  },
                },
                '& .MuiSwitch-thumb': {
                  boxSizing: 'border-box',
                  margin: 0.1,
                  width: 10,
                  height: 10,
                },
                '& .MuiSwitch-track': {
                  borderRadius: 7,
                  backgroundColor: '#808080',
                  opacity: 1,
                },
              }}
            />
            <Image src={storeIcon} alt="Store icon" className="store-icon" />
            {storeActive ? (
              <>
                <div key="active" className="store-scroll-box">
                  <div className="store-scroll-text">BROOKFIELDS PLAZA</div>
                </div>
                <div className="edit-icon-container">
                  <EditIcon className="mui-edit-icon" />
                </div>
              </>
            ) : (
              <div key="inactive">
                <span>STORE MODE</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="scroll-header">
        <div className="scroll-header-wrapper">
          <span className="scroll-header-text">
            The SALE just got bigger & better! <b>Flat 50% OFF* </b>is Now Live
            - Shop before it&apos;s gone | Offer valid on select merchandise* |
            T&Cs Apply
          </span>
        </div>
      </div>
      <div className="main-header">
        <div className="main-header-logo">
          <Image src={logo} alt="Logo" width={250} height={30} />
        </div>
        <div className="main-header-nav">
          {menuItems.map((element, index) => {
            return (
              <a href="#" key={index} className="main-header-nav-ele">
                <span>{element}</span>
              </a>
            );
          })}
        </div>
        <div className="main-header-actions">
          <div className="search-container">
            <Image src={searchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>
          <Image src={heartIcon} alt="Wishlist" className="action-icon" />
          <Image src={manIcon} alt="Profile" className="action-icon" />
          <Image src={cartIcon} alt="Cart" className="action-icon" />
          <Image src={abfrlLogo} alt="ABFRL" className="abfrl-logo" />
        </div>
      </div>
    </div>
  );
}

export default Header;
