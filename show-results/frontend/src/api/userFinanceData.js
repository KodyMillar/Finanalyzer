import { API_ENDPOINT } from '.';

export async function getUserFinanceData() {
    const response = await fetch(API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const financeData = await response.json();

    return { status: response.status, data: financeData }
}