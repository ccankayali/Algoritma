import axios from "axios";

const API_URL = "http://localhost:3001/words/";

export const WordService = {
    async getWords() {
        const response = await axios.get(API_URL + "all-words");
        return response.data;
    },

    async createWord(word: any) {
        const response = await axios.post(API_URL + "create-word", word);
        return response.data;
    },


    async setQuestionCount(questionCount: any) {
        await axios.post(API_URL + "set-question-count", { questionCount });
    },

    async checkAndIncreaseCorrectAnswers(id: any, userAnswer: any) {
        const response = await axios.post(API_URL + "word/test/check", { id, userAnswer });
        // Veritabanında güncelleme işlemi
        await WordService.increaseCorrectAnswers(id, userAnswer);
        return response.data;
      },
      

    async test(count: number) {
        const response = await axios.get(API_URL + `word/test?count=${count}`);
        return response.data;
    },

    async increaseCorrectAnswers(id: any, userAnswer: any) {
        const response = await axios.put(API_URL + "word/test/check", { id, userAnswer });
        return response.data;
    },

    async getAnalysis() {
        try {
            const response = await axios.get(API_URL + "word/analysis");
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching analysis data:', error);
            throw error; // Hatanın yukarıya fırlatılması, çağıran koda iletilmesi
        }
    }
    
};
