/**
 * Service API pour les opérations budgétaires
 * Gère la communication avec le serveur backend pour récupérer et sauvegarder les données
 */
import axios from 'axios';

// URL de base de l'API - À remplacer par votre URL réelle
const API_URL = 'https://api.example.com/budget'; // Replace with your actual API URL

/**
 * Récupère les données budgétaires du serveur
 * @returns {Promise} - Les données budgétaires depuis le serveur
 * @throws {Error} - Si la requête échoue
 */
export const fetchBudgetData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching budget data:', error);
        throw error;
    }
};

/**
 * Sauvegarde les données budgétaires sur le serveur
 * @param {Object} budgetData - Les données budgétaires à sauvegarder
 * @returns {Promise} - La réponse du serveur
 * @throws {Error} - Si la requête échoue
 */
export const saveBudgetData = async (budgetData) => {
    try {
        const response = await axios.post(`${API_URL}/data`, budgetData);
        return response.data;
    } catch (error) {
        console.error('Error saving budget data:', error);
        throw error;
    }
};