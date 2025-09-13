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

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
ChatGPT for task B, GitHub Copilot for bug squashing from Task C.
#### Total estimated time it took to complete project:
7 hours
#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-JackSharks05