import component from "./component";
import "./css/main.css";
import "purecss"
import "react";
import "react-dom";
import { bake } from "./shake";


bake();

document.body.appendChild(component());