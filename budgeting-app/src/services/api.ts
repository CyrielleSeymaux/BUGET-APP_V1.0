import axios from 'axios';

const API_URL = 'https://api.example.com/budget'; // Replace with your actual API URL

export const fetchBudgetData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching budget data:', error);
        throw error;
    }
};

export const saveBudgetData = async (budgetData) => {
    try {
        const response = await axios.post(`${API_URL}/data`, budgetData);
        return response.data;
    } catch (error) {
        console.error('Error saving budget data:', error);
        throw error;
    }
};