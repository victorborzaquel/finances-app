import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default {
	fonts: {
		family: {
			title: 'Inter_600SemiBold',
			subtitle: 'Inter_500Medium',
			text: 'Inter_400Regular',

			button: 'Inter_600SemiBold',
			button_secondary: 'Inter_500Medium',
		},
		size: {
			extra_largue: RFValue(30),
			largue: RFValue(24),
			medium: RFValue(18),
			small: RFValue(14),
			extra_small: RFValue(12),
		},
	},
	display: {
		padding_app: 20,
		border_radius: 8,
		active_opacity: 0.7,
		window_width: Dimensions.get('window').width,
		window_height: Dimensions.get('window').height,
		button_height: RFValue(65),
	},
};
