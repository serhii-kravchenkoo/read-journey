
import Navigation from "../Navigation/Navigation";

const MobileMenu = ({ isOpen, toggleMenu, handleLogOut }) => {
  return (
    <div
      className={clsx("mobile-menu-overlay", isOpen && "open")}
      onClick={toggleMenu} // закриваємо меню при кліку на overlay
    >
      <div
        className={clsx("mobile-menu-panel", isOpen && "open")}
        onClick={(e) => e.stopPropagation()} // запобігаємо закриттю при кліку всередині
      >
        {/* Кнопка закриття */}
        <button className="close-btn" onClick={toggleMenu}>
          <Icon w={28} iconName="icon-close-menu" />
        </button>

        {/* Навігація */}
        <div className="menu-content">
          <Navigation />
        </div>

        {/* Кнопка виходу */}
        <Button
          type="button"
          primary={false}
          title="Log out"
          className="logout-btn"
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default MobileMenu;