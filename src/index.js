"use strict";
import "./index.html";
import "./index.scss";
import { getSomeData } from "./scripts/es6";
import { sayHello } from "./scripts/hello";


console.log(sayHello("World"));
console.log(getSomeData("EcmaScript", "2015"));