import produce from 'immer';
interface ICommonState {
    loading: boolean
}
export const defaultState: ICommonState = {
    loading: false
};

const CommonReducer = (state = defaultState, action: any) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'SET_FULL_LOADING': {
                draft.loading = action.payload;
                break
            }
            default:
                break;
        }
    });
}
export default CommonReducer;
export const setLoadingAction = (value: boolean) => ({
    type: 'SET_FULL_LOADING',
    payload: value,
});