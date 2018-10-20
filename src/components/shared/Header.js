import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            menuOuvert : false
        }
        this.ouvreMenu = this.ouvreMenu.bind(this);
    }

    ouvreMenu(){
        // En cliquant on met le menu à l'état contraire
        this.setState({
            menuOuvert: !this.state.menuOuvert
        })
    }

    render(){
        return(
            <div className="Header"> 
                <div className="container"> 
                    <header>
                        <div className="header-item logo">
                            <img src="img/yux.png" alt="LYF" />
                        </div>
                        <div className="header-item navigation" onClick={this.ouvreMenu} >  {/* En cliquant la sur Menu ou icon, on ouvre le menu */}
                            <div className="ouvre-menu">Menu</div>
                            <div className="ouvre-menu-icon">
                                {/* Met l'icon vers le haut (up) si le menu est ouvert sinon vers le bas (down)  */}
                                <i className={ `fas fa-chevron-${this.state.menuOuvert ? "up" : "down"}` } /> 
                            </div>
                            <ul className={this.state.menuOuvert ? "menu-ouvert" : "menu-ferme"} >
                                {/* L'onglet active aura la class "selected" */}
                                <li>
                                    <NavLink to="/" exact activeClassName="selected">Accueil</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/classement" activeClassName="selected">Classement</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/scores" activeClassName="selected">Scores</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/calendrier" activeClassName="selected">Calendrier</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/equipes" activeClassName="selected">Equipes</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="header-item connexion">
                            <a href="/logout"> 
                                <i className="fas fa-power-off" /> { window.innerWidth > 768 && "Se Déconnecter"} {/*Le texte "Se Déconnecter" ne sera pas visible en-dessous de 768px */}
                            </a>
                        </div>
                    </header>
                </div>    
            </div>    
        )
    }
                            
}

export default Header;