import { useRoute } from '@react-navigation/native';

export default function useNavigationParam(name) {
    const route = useRoute();
    return route.params && route.params[name];
}
