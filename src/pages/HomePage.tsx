const HomePage = () => {
  return (
    <div className="py-3">
      <h1 className="h2 orbitron">
        Welcome to the{" "}
        <span style={{ color: "#ffff00", textShadow: "7px 7px 2px black" }}>
          Star Wars
        </span>{" "}
        Encyclopedia
      </h1>
      <p className="roboto-mono">
        Whether you're a lifelong fan of the galaxy far, far away or a newcomer
        eager to explore its rich lore, you've come to the right place. This
        comprehensive guide is your portal to the vast universe of Star Wars,
        filled with detailed information about films, characters, planets,
        species, starships, vehicles and events from across the saga. Here, you
        can dive deep into the stories of the Jedi and Sith, the Rebellion and
        the Empire, the Clone Wars, the Galactic Civil War, and beyond. From the
        ancient history of the Old Republic to the rise of the First Order, and
        even the adventures of the Mandalorians, we cover it all.
      </p>
      <p className="roboto-mono">
        Discover the legendary heroes like Luke Skywalker, Princess Leia, and
        Rey, and the iconic villains such as Darth Vader, Emperor Palpatine, and
        Kylo Ren. Learn about the intricate politics of the Galactic Senate, the
        mystical teachings of the Jedi Order, and the dark secrets of the Sith.
        Explore the diverse worlds of Tatooine, Coruscant, and Dagobah, and
        uncover the mysteries of the Force that binds the galaxy together.
      </p>
      <p className="orbitron h5">
        May the{" "}
        <span style={{ color: "#ffff00", textShadow: "7px 7px 2px black" }}>
          FORCE
        </span>{" "}
        be with you!
      </p>
    </div>
  );
};

export default HomePage;
