#!usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'JavaScript Quiz Master \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('COMO JOGAR')}
    Eu sou um processo no seu computador.
    Se você errar alguma questão eu serei ${chalk.bgRed('encerrado')}
    Então, analise muito bem suas respostas...
    
    `);

}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'Digite o seu nome:',
    default() {
      return 'Jogador';
    }
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Qual operador é usado para atribuir um valor a uma variável em JavaScript?\n',
    choices: [
      '==',
      '=',
      '===',
      '=>'
    ],
  });

  return handleAnswer(answers.question_1 === '=');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Qual é o método utilizado para remover o último elemento de um array em JavaScript?\n',
    choices: [
      'array.shift()',
      'array.pop()',
      'array.slice()',
      'array.remove()'
    ],
  });

  return handleAnswer(answers.question_2 === 'array.pop()');
}


async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: 'O que a função Array.prototype.reduce() faz em JavaScript?\n',
    choices: [
      'Itera sobre os elementos do array, aplicando uma função a cada um e produzindo um único valor de retorno',
      'Adiciona todos os elementos do array',
      'Filtra elementos do array com base em uma condição',
      'Mapeia elementos de um array para outro'
    ],
  });

  return handleAnswer(answers.question_3 === 'Itera sobre os elementos do array, aplicando uma função a cada um e produzindo um único valor de retorno');
}


async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Qual é o resultado da expressão typeof function(){} === "function" em JavaScript?\n',
    choices: [
      'true',
      'false',
      'undefined',
      'SyntaxError'
    ],
  });

  return handleAnswer(answers.question_4 === 'true');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message: 'Qual é o resultado de ([] + []) em JavaScript?\n',
    choices: [
      'undefined',
      '0',
      '"" (string vazia)',
      'NaN'
    ],
  });

  return handleAnswer(answers.question_5 === '"" (string vazia)');
}



async function handleAnswer(isCorrect) {
  const spinner = createSpinner ('Checando sua resposta...').start();
  await sleep();

  if (isCorrect) {
    spinner.success( { text: `Bom trabalho, ${playerName}! Resposta correta.`});
  } else {
    spinner.error ( { text: `💀💀💀 Resposta incorreta. Você perdeu, ${playerName}.`});
    process.exit(1);
  }
  
}

function winner(){
  console.clear();
  const msg = `Parabéns, ${playerName}!\n R$ 1 , 0 0 0 , 0 0 0`

  figlet (msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();






