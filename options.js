document.addEventListener('DOMContentLoaded', () => {
    // Get the form
    const form = document.querySelector('form');

   // Get the prompt and apikey inputs
const promptInput = document.getElementById('prompt');
const apikeyInput = document.getElementById('apikey');

// Get the submit button
const submitBtn = form.querySelector('button');

// Add a click event listener to the submit button
submitBtn.addEventListener('click', (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the values from the inputs
    const prompt = promptInput.value;
    const apikey = apikeyInput.value;

    // Validate the form inputs
    if(!prompt || !apikey) {
        alert('Please fill in all the fields');
        return;
    }

    // Store the values in chrome storage
    chrome.storage.local.set({ prompt, apikey }, () => {
        // Show a success message
        alert('Options saved!');
    });
});

// Get the stored options from chrome storage
chrome.storage.local.get(['prompt', 'apikey'], (items) => {
    if (items.prompt) {
        promptInput.value = items.prompt;
    }
    if (items.apikey) {
        apikeyInput.value = items.apikey;
    }
});

// Get the generate button
const generateBtn = document.getElementById('generate');

// Add a click event listener to the generate button
generateBtn.addEventListener('click', async (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the stored apikey and prompt from chrome storage
    chrome.storage.local.get(['prompt', 'apikey'], (items) => {
        if (!items.apikey) {
            alert("Please enter a valid API key in the options page");
            return;
        }
        if (!items.prompt) {
            alert("Please enter a prompt in the options page");
            return;
        }
        // Check if the API key is valid
        // code to check API key here
        
        // Create an instance of the ChatGPT class
        const chatgpt = new ChatGPT(items.apikey);

        // Generate text using the prompt
        chatgpt.generateText(items.prompt)
            .then((text) => {
                // Show the generated text in an alert
                alert(text);
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
