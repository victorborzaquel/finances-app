import 'styled-components';
import light from './light';
import shared from './shared';
import dark from './dark';

declare module 'styled-components' {
	type Theme = typeof shared & typeof light & typeof dark;

	export interface DefaultTheme extends Theme {}
}
