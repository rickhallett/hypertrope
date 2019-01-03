PROJECT TODO LIST

1. Provide validation for submission form

   - name, drop dpwn
   - default integers at zero

2. Pages

   - Home
   - Login
   - List
   - Edit workout
   - Delete workout
   - Flash messages library
   - D3 chart

3. Routes

   - Seperate into seperate files

4. Error log middleware

5. Authentication middleware

6. Quote submission (either place quotes in database or have the server read/write from the json file)

7. Inputs for bodyweight, weights lifted and calories

8. Align nav items to the right hand side

9. Convert all code to ES6

10. Apply best practices for Express and modularity

11. workout/new date field needs border

12. If the user changes the number of exercises with items in the form filled out, these values are copied into each new accordian panel

13. Get undefined passed from empty forms so that the default triggers

14. Work out how to use node-statsd middleware

15. Slide up lost space gently when alert message disappears

16. Use passports inherent session/user logic, as opposed to passing it into a new render post login

17. Auth error message page/flash messages

18. Prevent unauthorised viewing of pages if not logged in

19. Have a dynamic information sheet; calculate TDEE based on user profile information

20. Have index increment counter set up as middle ware as opposed to external function.

21. When sorting the exercise data, hard remove 'n/a', sort the remainder, then concatenate with 'n/a' leading

FROM NODE COURSE

1. Move to dotenv package to manage environmental variables

2. ES6 mongoose global.Promise /promisify for mongo async/await

3. Helpers.js for site wide locals (defined in one place only) (pull in helpers.js in some app.js use function on res.locals.variable )

BUGS
