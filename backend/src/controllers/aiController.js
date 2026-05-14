const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const questionBank = {
  python: [
    { question_text: "What is the correct syntax to output 'Hello World' in Python?", options: ["print('Hello World')", "echo 'Hello World'", "p('Hello World')", "printf('Hello World')"], correct_answer: "print('Hello World')" },
    { question_text: "How do you create a variable with the numeric value 5?", options: ["x = 5", "x = int(5)", "x := 5", "Both A and B"], correct_answer: "Both A and B" },
    { question_text: "Which method can be used to remove any whitespace from both the beginning and the end of a string?", options: ["strip()", "trim()", "len()", "cut()"], correct_answer: "strip()" },
    { question_text: "Which collection is ordered, changeable, and allows duplicate members?", options: ["List", "Set", "Tuple", "Dictionary"], correct_answer: "List" },
    { question_text: "How do you start writing a while loop in Python?", options: ["while x > y:", "while x > y {", "while (x > y)", "x > y while:"], correct_answer: "while x > y:" },
    { question_text: "Which of the following is used to define a block of code in Python?", options: ["Indentation", "Brackets", "Parentheses", "Quotes"], correct_answer: "Indentation" }
  ],
  javascript: [
    { question_text: "Inside which HTML element do we put the JavaScript?", options: ["<script>", "<js>", "<javascript>", "<scripting>"], correct_answer: "<script>" },
    { question_text: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');"], correct_answer: "alert('Hello World');" },
    { question_text: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], correct_answer: "function myFunction()" },
    { question_text: "How to write an IF statement in JavaScript?", options: ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if i = 5"], correct_answer: "if (i == 5)" },
    { question_text: "Which event occurs when the user clicks on an HTML element?", options: ["onclick", "onchange", "onmouseclick", "onmouseover"], correct_answer: "onclick" },
    { question_text: "Which operator is used to assign a value to a variable?", options: ["=", "*", "-", "x"], correct_answer: "=" }
  ],
  c_language: [
    { question_text: "Which of the following is the correct way to declare a variable in C?", options: ["int x;", "x = int;", "declare x as int;", "float x = int;"], correct_answer: "int x;" },
    { question_text: "Which function is used to print text in C?", options: ["printf()", "cout", "print()", "println()"], correct_answer: "printf()" },
    { question_text: "What is the size of 'int' data type in C (typically)?", options: ["2 or 4 bytes", "1 byte", "8 bytes", "Depends on RAM"], correct_answer: "2 or 4 bytes" },
    { question_text: "Which operator is used to get the address of a variable?", options: ["&", "*", "@", "#"], correct_answer: "&" },
    { question_text: "How do you start a multi-line comment in C?", options: ["/*", "//", "<!--", "##"], correct_answer: "/*" },
    { question_text: "Which keyword is used to return a value from a function?", options: ["return", "back", "send", "exit"], correct_answer: "return" }
  ],
  cloud_computing: [
    { question_text: "What does SaaS stand for?", options: ["Software as a Service", "Storage as a Service", "System as a Service", "Security as a Service"], correct_answer: "Software as a Service" },
    { question_text: "Which of these is a popular Cloud Service Provider?", options: ["AWS", "Windows 95", "Hard Drive", "Local Server"], correct_answer: "AWS" },
    { question_text: "What is the main benefit of Cloud Computing?", options: ["Scalability", "Fixed Cost", "Physical Security", "Manual Updates"], correct_answer: "Scalability" },
    { question_text: "What does 'Elasticity' mean in the cloud?", options: ["Ability to scale resources up/down", "Physical stretch", "Longer cables", "Flexible pricing only"], correct_answer: "Ability to scale resources up/down" },
    { question_text: "Which cloud model is used by a single organization?", options: ["Private Cloud", "Public Cloud", "Hybrid Cloud", "Community Cloud"], correct_answer: "Private Cloud" },
    { question_text: "What is Google Drive an example of?", options: ["Cloud Storage", "Cloud OS", "Cloud Hardware", "None"], correct_answer: "Cloud Storage" }
  ],
  java: [
    { question_text: "Which keyword is used to create a class in Java?", options: ["class", "Class", "new", "struct"], correct_answer: "class" },
    { question_text: "What is the entry point of a Java program?", options: ["main method", "start method", "init method", "run method"], correct_answer: "main method" },
    { question_text: "Which company originally developed Java?", options: ["Sun Microsystems", "Microsoft", "Apple", "Google"], correct_answer: "Sun Microsystems" },
    { question_text: "What is JVM?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Visual Mode", "Java Version Manager"], correct_answer: "Java Virtual Machine" },
    { question_text: "Which of these is NOT a Java access modifier?", options: ["external", "public", "private", "protected"], correct_answer: "external" },
    { question_text: "Which tool is used to compile Java code?", options: ["javac", "java", "javadoc", "jar"], correct_answer: "javac" }
  ],
  react: [
    { question_text: "What is React?", options: ["A JavaScript library for building UI", "A CSS framework", "A Database", "A backend language"], correct_answer: "A JavaScript library for building UI" },
    { question_text: "What are 'props' in React?", options: ["Short for properties", "External CSS", "A type of hook", "A database connection"], correct_answer: "Short for properties" },
    { question_text: "Which hook is used for state management in functional components?", options: ["useState", "useEffect", "useContext", "useReducer"], correct_answer: "useState" },
    { question_text: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Standard", "JavaScript Scripting"], correct_answer: "JavaScript XML" },
    { question_text: "How do you handle side effects in React?", options: ["useEffect", "useState", "useMemo", "useCallback"], correct_answer: "useEffect" },
    { question_text: "What is the virtual DOM?", options: ["A lightweight copy of the real DOM", "A physical hardware part", "A 3D rendering tool", "None of the above"], correct_answer: "A lightweight copy of the real DOM" }
  ],
  web: [
    { question_text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], correct_answer: "Hyper Text Markup Language" },
    { question_text: "Who is making the Web standards?", options: ["The World Wide Web Consortium", "Google", "Microsoft", "Mozilla"], correct_answer: "The World Wide Web Consortium" },
    { question_text: "Choose the correct HTML element for the largest heading:", options: ["<h1>", "<h6>", "<heading>", "<head>"], correct_answer: "<h1>" },
    { question_text: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], correct_answer: "<br>" },
    { question_text: "Which character is used to indicate an end tag?", options: ["/", "<", "*", "^"], correct_answer: "/" },
    { question_text: "What is the correct HTML for adding a background color?", options: ["<body style='background-color:yellow;'>", "<body bg='yellow'>", "<background>yellow</background>", "None of the above"], correct_answer: "<body style='background-color:yellow;'>" }
  ]
};

exports.generateQuiz = async (req, res) => {
  const { topic, difficulty_level, question_count } = req.body;
  console.log('AI Quiz Generation Request:', { topic, difficulty_level });
  
  const normalizedTopic = topic.toLowerCase();
  
  try {
    const prompt = `Generate a quiz on the topic "${topic}" with difficulty level "${difficulty_level}". 
    Create ${question_count || 6} multiple-choice questions. 
    Format the response as a JSON array of objects, where each object has:
    - "question_text": The question string.
    - "options": An array of 4 response options.
    - "correct_answer": The exact string from the options that is correct.
    Ensure the JSON is valid and only return the JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    console.log('OpenAI Response received');
    const quizData = JSON.parse(content.trim());
    res.status(200).json(quizData);
  } catch (error) {
    console.warn('AI Generation unavailable, searching Local Library for:', topic);
    
    // Check if we have local questions for this topic
    let localQuestions = null;
    if (normalizedTopic.includes('python')) localQuestions = questionBank.python;
    else if (normalizedTopic.includes('javascript') || normalizedTopic.includes('js')) localQuestions = questionBank.javascript;
    else if (normalizedTopic.includes('c language') || normalizedTopic.includes(' c ')) localQuestions = questionBank.c_language;
    else if (normalizedTopic.includes('cloud')) localQuestions = questionBank.cloud_computing;
    else if (normalizedTopic.includes('java') && !normalizedTopic.includes('javascript')) localQuestions = questionBank.java;
    else if (normalizedTopic.includes('react')) localQuestions = questionBank.react;
    else if (normalizedTopic.includes('web') || normalizedTopic.includes('html') || normalizedTopic.includes('css')) localQuestions = questionBank.web;
    
    if (localQuestions) {
      console.log('Serving high-quality local questions');
      return res.status(200).json(localQuestions);
    }

    // Generic Fallback if topic is unknown - Now with 6 questions
    const genericMock = [
      {
        question_text: `Which of these is a fundamental part of ${topic}?`,
        options: ["Core Principle A", "Core Principle B", "Core Principle C", "All of the above"],
        correct_answer: "All of the above"
      },
      {
        question_text: `In ${topic}, what is the primary purpose of a variable?`,
        options: ["Store data", "Loop code", "Define styles", "Create files"],
        correct_answer: "Store data"
      },
      {
        question_text: `Which of the following is commonly used in ${topic}?`,
        options: ["Data structures", "Design patterns", "Testing frameworks", "All of the above"],
        correct_answer: "All of the above"
      },
      {
        question_text: `What is the first step in implementing ${topic}?`,
        options: ["Planning", "Coding", "Testing", "Deployment"],
        correct_answer: "Planning"
      },
      {
        question_text: `Why is ${topic} important in modern development?`,
        options: ["Scalability", "Security", "Performance", "Efficiency"],
        correct_answer: "Efficiency"
      },
      {
        question_text: `Which tool is most commonly associated with ${topic}?`,
        options: ["IDE", "Debugger", "Version Control", "Documentation"],
        correct_answer: "IDE"
      }
    ];
    
    res.status(200).json(genericMock);
  }
};
