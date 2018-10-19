import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return(
        <div>
            <footer>
                <p>Ligue Yux Football &copy; { new Date().getFullYear() }. Tous Droits Reservés</p>
            </footer>
        </div>    
    )
                            
}

export default Footer;