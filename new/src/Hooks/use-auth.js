import React from 'react';
import {useSelector} from "react-redux";

function UseAuth() {
    const {email, token, id} = useSelector(state => state.user);

    return {
        isAuth: !!email, email, token, id,
    }
}

export default UseAuth;