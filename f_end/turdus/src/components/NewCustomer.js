import { useEffect } from "react";
import '../css/visits.css';
import { addUpdateCustomer } from "./ApiFetch";
import { FormArray, FormGenerator, handleClean } from "./FormsController";

function NewCustomer() {
    useEffect(() => {
        document.getElementById('auto-form').addEventListener('submit', handleData);
    }, []);
    
    
    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;
        addUpdateCustomer(fData, 'add');
        handleClean(fData);
    }

    return (
        <>
            <FormGenerator arrForm={FormArray('customer', {})} />
        </>
    )
}
export default NewCustomer;