import { unsecurefetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { requests } from '../constants/requests';
import { updateStep , setError, unsetError, setLoading } from './ui';

export const getUserInfo = (identity, username, token) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2008;
        req.request.header.step = 2;
        
        req.request.data.id = identity;
        req.request.data.user = username;
        req.request.data.otp = token;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('VerifyCustomer', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(2));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const getAgreement = ( token, account ) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2002;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.account = account;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ACHEnrollment', req, 'POST');
            const body = await resp.json();
            const { response: { status } } = body;

            if (status.code === '0000') {
                const { detail } = status;
                dispatch(getAgree(detail));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const getEnroll = ( token, account ) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2002;
        req.request.header.step = 4;
        req.request.header.token = token;
        
        req.request.data.account = account;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ACHEnrollment', req, 'POST');
            const body = await resp.json();
            const { response: { status } } = body;

            if (status.code === '0000') {
                dispatch(getEnrollment());
                dispatch(updateStep(4));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setStatusCard = (identity, token, card) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2008;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.state = card.status === "00" ? "28" : "00";
        req.request.data.reason = 'AA';
        req.request.data.user = 'ATH03278';

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaEstadoTarjeta', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setLimitCard = (identity, token, card, amount) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2009;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.reason = '?';
        req.request.data.locationProcedure = 'AA';
        req.request.data.locationRetirement = 'AA';
        req.request.data.user = 'TES03262';
        req.request.data.amount = amount;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaLimiteTarjetaCredito', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setUserInfo = (identity, token, userInfo) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2011;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.addressHouse = userInfo.address;
        req.request.data.phoneHouse = userInfo.telephone;
        req.request.data.phoneWork = userInfo.telephone;
        req.request.data.phoneMobile = userInfo.mobile;
        req.request.data.maritalStatus = userInfo.workAddress;
        req.request.data.addressWork = userInfo.workAddress;
        req.request.data.state = '?';
        req.request.data.city = '?';
        req.request.data.addressEC = '?';
        req.request.data.emailEC = userInfo.address;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ActualizaDatosClienteSysCard', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            // if (status.code === '0000') {
            if (status.code === '9998') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setPin = (identity, token, card, pin) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2010;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.reason = 'AA';
        req.request.data.user = 'ATH03278';
        req.request.data.pin = pin;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaPINTarjeta', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setAchAccount = account => ({
    type: types.setAccount,
    payload: account
});

const getInfo = ( info ) => ({
    type: types.getUserInfo,
    payload: info
});

const getAgree = detail => ({
    type: types.getAgreement,
    payload: detail
});

const getEnrollment = () => ({
    type: types.getEnrolment,
    payload: true
});