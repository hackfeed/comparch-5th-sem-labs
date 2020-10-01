import express from "express";

const games = [
  { title: "Ghost Of Tsushima", imageUrl: "/images/got.jpg", age: 18 },
  { title: "The Last Of Us Part II", imageUrl: "/images/tlou.jpg", age: 18 },
  { title: "Uncharted Collection", imageUrl: "/images/uncharted.jpg", age: 18 },
  { title: "Fortnite", imageUrl: "/images/fortnite.jpg", age: 12 },
  { title: "FIFA 21", imageUrl: "/images/fifa21.jpg", age: 0 },
];

export const getGames = (req: express.Request, res: express.Response) => {
  let age: number;
  if (!req.query.age) {
    age = Math.max(...games.map((game) => game.age));
  } else {
    age = +req.query.age;
  }
  const ageGames = games.filter((game) => game.age <= age);
  res.render("exercise_01/task", { pageTitle: "Exercise 1", games: ageGames, age });
};
