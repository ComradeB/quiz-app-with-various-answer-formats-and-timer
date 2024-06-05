type Question = 
    | { questionType: 'single'; question: string; choices: string[]; answer: string }
    | { questionType: 'multi'; question: string; choices: string[]; answer: string[] }
    | { questionType: 'short'; question: string }
    | { questionType: 'long'; question: string }

const questions: Question[] = [
    {   
        questionType: 'single',
        question: 'What is the capital of France?',
        choices: ['Paris', 'London', 'New York'],
        answer: 'Paris',
    },
    {
        questionType: 'multi',
        question: 'Select the two largest planets below.',
        choices: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        answer: ['Jupiter', 'Saturn'],
    },
    {
        questionType: 'short',
        question: 'Write a sentence using past perfect.',
    },
    {
        questionType: 'long',
        question: 'What factors led to the outbreak of World War One?',
    },
];

export default questions