const ApiUrl = "http://localhost:5432/api/todo";

interface ITodoData {
    id: number;
    user: string;
    content: string;
    timestamp: number;
    order: number;
    completed: boolean;
    deleted: boolean;
}

const fetchData = async (url: string, retries = 3, timeout = 10000): Promise<ITodoData> => {
    const signal = AbortSignal.timeout(timeout);
    return fetch(url, { signal })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .catch((err) => {
            if (retries > 0) {
                fetchData(url, retries - 1, timeout);
            }
            return err;
        });
};

const getTodo = async () => {

}

const setComplete = () => {

}


const Todoapi = {
    getTodo,
    setComplete,
}

export default Todoapi;