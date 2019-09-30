import { NavigationActions } from 'react-navigation';

export default class NavigationService {
    static instance = null;

    static setInstance(navigator) {
        NavigationService.instance = navigator;
    }

    static navigate(params) {
        return NavigationService.instance.dispatch(
            NavigationActions.navigate(params)
        );
    }

    static currentRoute() {
        // Get route state from instance.
        let route = NavigationService.instance.state.nav;

        // Loop through routes until at final index.
        while (route.routes) {
            route = route.routes[route.index];
        }

        // Return the found route.
        return route;
    }
}
