#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import { addCar, findCar, updateCar, removeCar, listAllCars } from "./index.js";

const { prompt } = inquirer;
const program = new Command();

// Cars Questions
const questions = [
  {
    type: "input",
    name: "brand",
    message: "Type car brand",
  },
  {
    type: "input",
    name: "model",
    message: "Type car model",
  },
  {
    type: "input",
    name: "year",
    message: "Type car year",
  },
  {
    type: "input",
    name: "color",
    message: "Type car color",
  },
  {
    type: "input",
    name: "type",
    message: "Type car type",
  },
  {
    type: "input",
    name: "imageURL",
    message: "Type car picture URL",
  },
];

program.version("1.0.0").description("Client Management System");

// Add Command
program
  .command("add")
  .alias("a")
  .description("Add a car in stock")
  .action(() => {
    prompt(questions).then((answers) => addCar(answers));
  });

// Find Command
program
  .command("find <brand>")
  .alias("f")
  .description("Find a specific car")
  .action((brand) => findCar(brand));

//Update Command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a car in stock")
  .action((_id) => {
    prompt(questions).then((answers) => updateCar(_id, answers));
  });

// Remove Command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a car")
  .action((_id) => removeCar(_id));

// List Command

program
  .command("list")
  .alias("l")
  .description("List all cars")
  .action(() => listAllCars());

program.parse(process.argv);
