const inquirer = require("inquirer-promise");

let quantity, style;
inquirer.prompt([{type: "list",name:"style",message:"Type of list with id", choices:["icon", "number"]},{type: "list",name:"quantity",message:"Number of list", choices:["1","2","3","4","5","6","7","8","9","10"]}])
	.then(animal => console.log(animal));
// inquirer.list(`Type of list with id 1111`, ["icon", "number"])
// 	.then(response => style=response);
// inquirer.list("Number of list", [1, 2, 3,4,5,6,7,8,9,10])
// 	.then(response => quantity=response);

