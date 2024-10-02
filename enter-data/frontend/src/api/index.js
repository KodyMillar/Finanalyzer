const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

export const addUserData = async (investment) => {
    const response = await fetch(`http://${API_ENDPOINT}/`, {
        method: "POST",
        body: JSON.stringify({
            investment: investment,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // const newData = await response.json();

    return response.status;
}