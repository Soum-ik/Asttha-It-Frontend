async function useCreate(body) {
    const url = `http://localhost:3000/api/v1/create-account`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return { data };
}

export default useCreate;
