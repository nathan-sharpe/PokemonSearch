import apiLogo from "./assets/PokeAPI_Logo.png"

function Footer() {
    return(
        <>
            <div className="footerContainer">
                <div className="footerColumn">
                    <h3>Thank you for using PokemonSearch!</h3>
                    <ul className="footerList">
                        <li><a href="https://github.com/nathan-sharpe/PokemonSearch/tree/master" className="footerLink" target="_blank" rel="noopener noreferrer">GitHub Page</a></li>
                        <li>Feel free to report any feedback or issues there!</li>
                    </ul>
                </div>
                <div className="footerColumn">
                    <p className="poweredBy">Powered By</p>
                    <img src={apiLogo} alt="PokeAPI Logo" className="apiLogo"></img>
                </div>
            </div>
        </>
    )
}

export default Footer