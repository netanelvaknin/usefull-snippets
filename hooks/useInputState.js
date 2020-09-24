import {useState} from 'react';

const useInputState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const resetInput = () => {
        setValue('');
    }

    return [value, handleChange, resetInput];
}

export default useInputState;