## Table of Contents

* [Demo](#demo)
* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Installation](#installation)
* [Usage](#usage)
* [Compatibility](#compatibility)
* [License](#license)
* [Contact](#contact)

## Demo
Preview: [Issuezaur](https://issuezaur.web.app/)

## About The Project
Simple graph application that helps to manage reported issues by users. Allows to assign available maintainers to specific threads.
Mainainers can be added through app interface. 

App consits of two views:
* Users - contains a table of all maintainers, which correspond to *User* GraphDB nodes: <br/> 
![image](https://user-images.githubusercontent.com/48987014/114276850-c63a2200-9a28-11eb-87f8-558456951e57.png)
<br/>

* Issues - contains a table of all opened threads, which correspond to *Issue* GraphDB nodes: <br/> 
![image](https://user-images.githubusercontent.com/48987014/114278017-0d76e180-9a2e-11eb-8b01-41f426505b2e.png)


## Built With
* [React.js](https://pl.reactjs.org/)
* [Ant Design](https://ant.design/)
* [Styled components](https://styled-components.com/)
* [Neo4j](https://neo4j.com/)

## Installation
Download source files from this repostiory, and use them to host or run the app locally. <br/>
* **Steps:**
1. Connect your GraphDB to the project<br />
2. Host or run the app locally <br />

## Usage

The usability of the application comes down to the interface to the database: <br/>
![image](https://user-images.githubusercontent.com/48987014/114279883-17511280-9a37-11eb-995c-f0b40954af79.png)

By default, project provides view for GraphDB that stores two kinds of nodes, which correspond to app views:

![image](https://user-images.githubusercontent.com/48987014/114280293-dce87500-9a38-11eb-9019-85e22ec36e26.png)

Default properies of supported nodes:

* User node properties:

![image](https://user-images.githubusercontent.com/48987014/114280387-45cfed00-9a39-11eb-89c4-37074919e7eb.png)

* Issue node properties:

![image](https://user-images.githubusercontent.com/48987014/114280399-4bc5ce00-9a39-11eb-9e3a-e0729db5071e.png)

Every *User* node can be related to an *Issue* node as a *AUTHOR* or *ASIGNEE*. Can't be both. 

* Example of default nodes relations: <br/>
![image](https://user-images.githubusercontent.com/48987014/114280571-2f766100-9a3a-11eb-9d56-1d441c4468f8.png)

## Compatibility
Every, commonly used web browsers. 

## License
Free to use and modify.

## Contact
Michal Pabjan - michaelpabjan@gmail.com<br />
Project Link: [https://github.com/L0GI0/Issuezaur](https://github.com/L0GI0/Issuezaur)
