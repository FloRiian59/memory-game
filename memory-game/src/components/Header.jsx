import "../css/Header.css";
function Header({ theme }) {
  return (
    <div className="logo-container">
      <img
        src={
          theme === "light"
            ? "public/assets/Logo/DarkLogo.png"
            : "public/assets/Logo/LightLogo.png"
        }
        className="starwars-logo"
        alt="StarWarsLogo"
      />
      <img
        src={
          theme === "light"
            ? "public/assets/Logo/DarkLogo2.png"
            : "public/assets/Logo/LightLogo2.png"
        }
        className="memory-logo"
        alt="MemoryGameLogo"
      />
      <span className="logo-separator">x</span>
      <img
        src="public/assets/Logo/LegoLogo.png"
        alt="Lego Logo"
        className="lego-logo"
      />
    </div>
  );
}

export default Header;
