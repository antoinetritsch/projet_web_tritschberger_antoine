import { RegisterUser, RegisterJWT } from '../actions/user.action';
import { UserStateModel } from './user_state_model';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<UserStateModel>({
    name: 'user',
    defaults: {
        jwtToken: '',
        login: '',
    }
})
export class UserState {
    @Selector()
    static getJWTToken(state: UserStateModel): string {
        return state.jwtToken;
    }

    @Selector()
    static getLogin(state: UserStateModel): string {
        return state.login;
    }

    @Action(RegisterJWT)
    addJWT(
        { patchState }: StateContext<UserStateModel>,
        { payload }: RegisterJWT
    ): void {
        patchState({
            jwtToken: payload
        });
    }

    @Action(RegisterUser)
    addUser(
        { patchState }: StateContext<UserStateModel>,
        { payload }: RegisterUser
    ): void {
        patchState({
            login: payload
        });
    }
}
