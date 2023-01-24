import axios from 'axios';

class ChatGPT {
    constructor(apikey) {
        this.apikey = apikey;
    }

    async generateText(prompt) {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://api.openai.com/v1/engines/davinci/completions',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apikey}`
                },
                data: {
                    prompt: prompt,
                    max_tokens: 100,
                    temperature: 0.5
                }
            });
            return response.data.choices[0].text;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ChatGPT;
