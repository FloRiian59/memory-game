function Header({ theme }) {
  return (
    <div className="logo-container">
      <img
        src={
          theme === "light"
            ? "../assets/Logo/DarkLogo.png"
            : "../assets/Logo/LightLogo.png"
        }
        className="starwars-logo"
        alt="StarWarsLogo"
      />
      <img
        src={
          theme === "light"
            ? "../assets/Logo/DarkLogo2.png"
            : "../assets/Logo/LightLogo2.png"
        }
        className="memory-logo"
        alt="MemoryGameLogo"
      />
      <span className="logo-separator">X</span>
      <img
        src="../assets/Logo/LegoLogo.png"
        alt="Lego Logo"
        className="lego-logo"
      />
    </div>
  );
}

export default Header;
