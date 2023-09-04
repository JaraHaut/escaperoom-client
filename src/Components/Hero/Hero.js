import "./Hero.scss";

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero__img"></div>
        <div className="hero__text-wrapper">
          <h1 className="hero__title">escaperoom</h1>
          <h3 className="hero__description">
            EscapeRoom is an online platform where the tenants can share their
            experiences about renting or viewing a property. This
            social-oriented app aims to have an impact in the rental market by
            adding transparency and bringing accountability to landlords and
            letting agents.
          </h3>
        </div>
      </section>
    </>
  );
}
export default Hero;
