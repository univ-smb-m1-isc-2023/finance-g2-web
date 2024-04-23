import { SERVER_URL } from './Constant';

export async function get(action: string, params: { [key: string]: any } = {}) {
    let paramStr = '';

    let i = 0;
    for (const key of Object.keys(params)) {
        if (i === 0) {
            paramStr += '?';
        } else {
            paramStr += '&';
        }
        paramStr += key + '=' + params[key];
        i++;
    }

    let res = null;
    try {
        const response = await fetch(SERVER_URL + action + paramStr, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
        });
        if (!response.ok) {
            res = {
                status: 'failed',
                error: 'went_wrong',
            };
        } else {
            res = await response.json();
        }
    } catch (error) {
        res = {
            status: 'failed',
            error: 'went_wrong',
        };
    }
    return res;
}

export async function post(action: string, params: { [key: string]: any } = {}) {
    let res = null;
    try {
        const response = await fetch(SERVER_URL + action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(params),
        });
        if (!response.ok) {
            res = {
                status: 'failed',
                error: 'went_wrong',
            };
        } else {
            res = await response.json();
        }
    } catch (error) {
        res = {
            status: 'failed',
            error: 'went_wrong',
        };
    }
    return res;
}

export async function uploadFile(file: File, accountId: number) {
    let params = {
        file: file,
        id: accountId,
    };
    let res = null;
    try {
        const response = await fetch(SERVER_URL + '/transaction/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            console.log(response);
            res = {
                status: 'failed',
                message: 'Upload failed: ' + response.statusText,
            };
        } else {
            res = {
                status: 'success',
                message: await response.text(),
            };
        }
    } catch (error) {
        res = {
            status: 'failed',
            message: 'Exception during upload: ' + error.message,
        };
    }

    return res;
}

export async function postFile(
    action: string,
    file: File | string | null | File[],
    params: { [key: string]: any } = {},
) {
    let res = null;
    const formData = new FormData();
    // Add all params to formData
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            formData.append(key, params[key]);
        }
    }
    if (file != null && !(file instanceof Array)) {
        formData.append('file', file);
    }
    if (file instanceof Array) {
        formData.append('nbFiles', file.length + '');
        file.forEach((f, index) => {
            formData.append('file' + index, f);
        });
    }

    try {
        const response = await fetch(SERVER_URL + action, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: formData,
        });
        if (!response.ok) {
            res = {
                status: 'failed',
                error: 'went_wrong',
            };
        } else {
            res = await response.json();
        }
    } catch (error) {
        res = {
            status: 'failed',
            error: 'went_wrong',
        };
    }
    return res;
}

export async function postRefresh() {
    return fetch(SERVER_URL + '/user/refresh', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('refreshToken'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            throw err;
        });
}

export async function getBlob(action: string, params: { [key: string]: any } = {}) {
    let paramStr = '';

    let i = 0;
    for (const key in params) {
        if (i == 0) {
            paramStr += '?';
        } else {
            paramStr += '&';
        }
        paramStr += key + '=' + params[key];
        i++;
    }

    let res = null;
    try {
        const response = await fetch(SERVER_URL + action + paramStr, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            res = {
                status: 'failed',
                error: 'went_wrong',
            };
        } else {
            res = await response.blob();
        }
    } catch (error) {
        res = {
            status: 'failed',
            error: 'went_wrong',
        };
    }
    return res;
}
