# MaRecipe SPA

![](./assets/images/DashboardscreenShot.jpg)

## About

MaRecipe is an application that is geared towards fitness and cooking enthusiasts as it allows users to save recipes, but also provide the macros per serving. Like other recipe applications, users would input recipe details such as ingredients, instructions, etc. But the key difference here is that MaRecipe requires users to input the macros per ingredient. The application then will provide a breakdown of the calories and macros per serving for the user.

This application is a small part of a bigger planned project.

## For Developers & Individuals Interested In The Application

If you would like to help, please note that I am using json-server for back-end at the moment.

Also using VScodes Live Sass Compiler and do not have Sass dependencies installed.

If you would like to get started, please clone this repository.
You will need two terminal windows open in order to experience the entire application, one for the MaRecipe application and another for initialize the json-server-auth.

1. In first terminal, type 'npm start'
2. In second terminal, type 'npm run server-auth'
3. You should now be able to access the application via localhost.

### Using the Application

1. You can sign up and explore features.
2. You can use the following credentials to log in.
    1. Email: admin@admin.com
    2. Password: admin1

## Retrospect

My goal in developing this project was to learn fundamentals of Typescript, Jest and Redux. It took some time to understand the fundamentals while building this project, but I am grateful for learning the fundamentals and want to explore these further after seeing the benefits.

I did struggle to write tests for Redux and mocking fetch request as they resided within my Redux action creators. I plan on working on a smaller project that does not require Redux so I can fully understand and properly write tests for HTTP requests (fetch / axios). Before I move on to implementing Typescript, Jest and Redux in a bigger application, I do want to fully learn how to implement these in a smaller controlled project that focuses on these individual technologies/libraries.

After building this recipe project, I realized that I could have restructure my code to be more efficient and plan on rebuilding this application along side building a RESTful API. The plan is to implement additional features when I revisit this project idea.

This project ended up taking longer to complete a MVP due to learning the new technologies and libraries, but I am happy I took the opportunity to learn and understand as much as I could.
