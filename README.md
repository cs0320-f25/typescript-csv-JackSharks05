# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
In the CSV specification, the functionality of the parser might not account for there being commas in the fields, empty strings, an uneven number of rows, or quotes in the fields with commas.
- #### Step 2: Use an LLM to help expand your perspective.
The LLM I prompted suggested similar things that I thought of, especially with the commas. Though commas are the most common delimiter for CSVs (well, it's in the name, of course), there are many strings that could use commas (formatting of names) which could confuse a parser. As suggested in the appendix, we could use quotes to mark that a comma is part of a field, but then the quotes wouldn't be included in that field; if we wanted quotes in a field, we'd have to add more quotes (or escape characters, which I think is convention!). Something the LLM pointed out that I missed was what to do with whitespaces; the tests I wrote left all whitespace in, but my testing while doesn't have spaces in between commas and the CSV row entry, while the examples in the Sprint document do have spaces, so I'm not sure what the standard is for that. The LLM also suggested a lot of complicated/advanced features that seem helpful but don't seem relevant for our implementation.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    User Story:
    "As a user of this application, I want to not worry about what characters I put into my CSV nor how I format each entry so I can efficiently complete my tasks."
    
    the top 4 enhancements / edge cases:
    1. accounting for commas in the fields: functionality
    2. how to parse escape characters in the fields (whether that be quotes or something else): functionality
    3. what to do with empty lines: functionality
    4. what to do with whitespace: extensibility
    The first three were from my thinking, while the last one was from the LLM.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 
    My initial ideas were all edge cases (functionality), as the user may want to put anything (commas, quotes, escape characters, or blank space) as their input. The LLM also made me think of what the user would want with erroneous/extraneous whitespace, as this can vary per user and by intention. The LLM suggested everything that I originally wrote down, as well as some more advanced extensibility-facing enhancements that didn't seem too relevant for our user's purposes.

### Design Choices

### 1340 Supplement
n/a :)
- #### 1. Correctness
I think a CSV parser is "correct" when it satisfies the intended use for someone using a CSV, which is to store a set amount of data that follows a set structure in a safe (meaning: unambiguous) way. Thus, the tests should check whether the Values Separated by the Commas in the CSV are a one-to-one correspondance with the values in the array that the parser outputs. The only exception to this correspondance is escape characters: that would either be specified by the user or by the parser (if the convention for escape characters is known by all users), so tests should make sure the parser follows whatever rule is set.
- #### 2. Random, On-Demand Generation
If I had a function that could randomly produce CSV data, this could help with testing as more edge cases or exceptions that I may have not considered could be discovered (because of statistics). If this function were standard (as in, followed a formula), there may not be too much variation (unless it's programmed with errors like varying row/column sizes, empty entries, corrupted values, etc.), so after a certain amount of data tested, I think there wouldn't be anything else found.
- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
I was a bit unsure about how the output of the parse function and the input of the schema align, so I had some issues with that (where I actually validated the same data twice), and GitHub Copilot helped to explain to me where these issues were, while I referred to the "Thinking Like an Engineer: Types" document to figure out how to align these. I also ran into the issue of what I should do with parsing a value that (intentionally) has a comma in it, and Copilot guided me to make a basic function that I wrote (with some autocomplete... don't know if that was from copilot but I went back and edited it to make it fit my intentions). [EDIT from the future: I just saw Tim's response in #63 that we shouldn't have implemented a fix for this, but I'll just keep it to see if there's any feed back I can get with improving it!] I did have another small, stupid bug, which was a scope issue with a variable, that copilot helped me find and that I quickly resolved.
#### Tests:
Writing the tests were quick, but fixing errors in them (related to the structure of the schema) took me the most amount of time in this sprint. I referred to lecture notes a lot to figure out how to set up the schema and deal with them in the tests. In order to ensure the value of results knew it could be indexed into as a list (as in, that it wasn't an error), I put an if/else block before (with a "test" that would automatically fail)—I'm not sure if this is convention, but this made the most sense for me to do (as Tim said to not raise errors/exceptions). I also had some issues with my tests in that they wouldn't pass on the first row of the CSV (as part of the schema expected numbers, which the first row of the CSV of course didn't have), but I just put NaN values where applicable. Also, the tests in the basic-parser.test.ts file of course don't run as the functions don't match the I/O spec for the new parseCSV file, but I followed one of the Ed comments (forgot which) and left them broken.
#### How To…
...not exactly sure what this section is, but I'll use it as the general reflection. This project helped me understand zod a lot: getting started was quite difficult as my brain didn't fully understand the flow from input through zod's schemas and casting to an object, but now I understand it a lot better. The bugs were annoying to figure out towards the beginning (as they were a reflection of my lack of understanding) but once I read through the class notes again (and eventually realized I could use copilot to help guide me towards errors), I was able to understand everything a lot better.
#### Team members and contributions (include cs logins):
I brainstormed tests with eyzou and did some mutual bug helping with awu164.
#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
ChatGPT for task B, GitHub Copilot for bug squashing from Task C.
#### Total estimated time it took to complete project:
6 hours
#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-JackSharks05