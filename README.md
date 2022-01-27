# Pyramid of Numbers

A pyramid of numbers as a web application for practicing arithmetic with plus and minus.

* Try it as GitHub Page: https://tigion.github.io/webapp-pyramid-of-numbers/

![Screenshot: Pyramid of Numbers](README-screenshot.png)

## About

The number of a stone in the pyramid results from the addition of the numbers of the two stones below it. The goal is to fill all the stones in the pyramid with the correct number.

The idea was originally implemented in 2015 as a practical exercise for the Swift programming language. This version of "Pyramid of Numbers" as a web application is *work in progress* and a playground for web technologies.

## Usage

### Menu

- **New** ... clears all stone numbers and chooses new random start numbers
- **Clear** ... clears all stone numbers without the start numbers
- **Solve** ... shows the solution of the filled pyramid of numbers

### Mode

- **Build up** ... empty stones are calculated from the stones below with numbers (addition)
- **Fill up** ... empty stones are calculated from the stones randomly assigned with numbers (subtraction)

### Settings

- **Pyramid height** ... height in stone rows of the pyramid
- **Start numbers (from/to)** ... range (from/to) of random start numbers of the lowest stone row.
- **Numbers can be negativ** ... if activated, starting numbers can also be negative
- **Show errors** ... if activated, the input is marked as correct or incorrect

## Feedback

Feel free to send me feedback, e.g. improvements, feature requests or bugs, via GitHub [Issues](https://github.com/tigion/webapp-pyramid-of-numbers/issues).