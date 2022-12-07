# Azura Developer Test

## How to run this app

1. Clone this repo
2. `cd` into the project directory
3. Assuming you have docker installed, run `docker-compose up -d`
4. Once the container is up, run `npm i`
5. After npm is done installing, run `npm run start`
6. Click on the link in the console or go to `localhost:3000` in your browser

---

## Assignment Details

Please read through in detail. Before beginning the project to ensure that you understand exactly what needs to be done

## Create a website in NodeJS/HTML consisting of two pages

### Page 1: (Capture Vehicle Info)

Create a webpage that contains input fields that captures a Vehicle’s Make, Model, KM, Color, Location and Value. This page should capture the information, and save it to a database called "*Azura*". You can use any table names you like.

Once captured, there should be a message reading "Vehicle captured successfully" below the submit button. Also create a link anywhere on this page to link to Page 2.

### Page 2: (Display captured information)

Display the information captured on page 1, in a grid format. (Read from your database)

- ID
- Make
- Model
- KM (mileage)
- Color
- Location
- Value

Once a vehicle is captured on Page 1 and the user navigates to the second page (Page 2), the captured details should be listed on this screen as shown in the grid above. This screen should also have an input text field, where the user can input the vehicle ID, and it will display the Vehicle's value below this input text box.

---

## Database (MSSQL)

>THE FOLLOWING SECTION IS NOT REQUIRED

Create a SQL job that runs every 20mins that inserts records into a table where the vehicle information is stored. Two vehicle records should be inserted (BMW, and Volkswagen) every time the job runs (every 20 mins). There are to be no changes to the already captured vehicles which have been manually entered on screen 1.

The criteria of the job should be as follows:

- The vehicle model should start at year 2000, and should increment every time the job runs by 1 year.
- The km should be a random generated number between 50000 and 100000 km every time the job runs.
- Color should always be white for BMW, and black for the Volkswagen.
- The location should always be CT for the BMW and JHB for the Volkswagen.
- The value of the vehicle should be a random generated number between R100000 and R150000 every time the job runs.
- The job should execute a stored proc that inserts these vehicles into the grid database table.
- The grid screen will now look similar to the grid below after an hour of running the job (Job executed 3 times in the hour), populating the table with 6 additional records (3 BMW's & 3 VW's).

If you now go back to your Second page (Page 2) after an hour, you should see a grid displayed on this screen.

Please script the job and send it along with the project. You will also need to script the database and upload it, along with the code, to the DropBox folder provided.

Best of luck!
