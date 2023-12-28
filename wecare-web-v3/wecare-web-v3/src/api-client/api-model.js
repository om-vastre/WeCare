
import axios from "axios";

const url = 'http://127.0.0.1:8080';

export async function verifyUser(email, password,type) {
    try {
        console.log(email,password,type);
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);
        formData.append("type", type);
        const response = await axios.post(`${url}/api/login`, formData, { headers: { 'Content-Type': 'multipart/form-data'} });
        console.log(response);
        sessionStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
export async function logoutUser() {
    try {
        const formData = new FormData();
        formData.append("token", sessionStorage.getItem('token'));
        const response = await axios.post(`${url}/api/logout`, formData, { headers: { 'Content-Type': 'multipart/form-data',Token:sessionStorage.getItem('token')} });
        sessionStorage.setItem('token', '');
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

//get all the list of user data
export async function getDoctorList() {
    try {
        const response = await axios.get(`${url}/api/doctor/list`, {headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getNurseList() {
    try {
        const response = await axios.get(`${url}/api/nurse/list`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getPatientList() {
    try {
        const response = await axios.get(`${url}/api/patient/list`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// fetch data by id
export async function getPatientById(id) {
    try {
        const response = await axios.get(`${url}/api/patient/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getAppointmentListByDId(id) {
    try {
        const response = await axios.get(`${url}/api/appointment/list/did/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getAppointmentListByPId(id) {
    try {
        const response = await axios.get(`${url}/api/appointment/list/pid/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}



export async function getAppointmentById(id) {
    try {
        const response = await axios.get(`${url}/api/appointment/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getNurseById(id) {
    try {
        const response = await axios.get(`${url}/api/nurse/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
export async function getDoctorById(id) {
    try {
        const response = await axios.get(`${url}/api/doctor/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getRecordHistorybyId(id) {
    try {
        const response = await axios.get(`${url}/api/patient/list/prescription/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// creating and update the users

export async function createDoctor(doctor) {
    try {
        await axios.post(`${url}/api/doctor/create`, doctor,{headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}
export async function createAppointment(appointment) {
    try {
        await axios.post(`${url}/api/appointment/create`, appointment,{headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function createPatient(patient) {
    try {
        await axios.post(`${url}/api/patient/create`, patient,{headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function createNurse(nurse) {
    try {
        await axios.post(`${url}/api/nurse/create`, nurse, {headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function addPrescription(data) {
    try {
        const response= await axios.post(`${url}/api/prescription/create`, data, { headers: {'Content-Type': 'multipart/form-data',Token:sessionStorage.getItem('token')}, });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

//for deleteing

export async function deleteDoctor(id) {
    try {
        await axios.delete(`${url}/api/doctor/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function deletePatient(id) {
    try {
        await axios.delete(`${url}/api/patient/${id}`,{headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function deleteNurse(id) {
    try {
        await axios.delete(`${url}/api/nurse/${id}`, {headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}
export async function deleteRecord(id) {
    try {
        await axios.delete(`${url}/api/prescription/${id}`, {headers:{Token:sessionStorage.getItem('token')}});
    } catch (error) {
        console.error("Error:", error);
    }
}








